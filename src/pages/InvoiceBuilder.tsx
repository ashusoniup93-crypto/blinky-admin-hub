import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Printer, Save, Plus, Trash2 } from "lucide-react";

const productCatalog = [
  { id: "p1", name: "Organic Bananas", rate: 60, gst: 5 },
  { id: "p2", name: "Fresh Milk", rate: 55, gst: 5 },
  { id: "p3", name: "Whole Wheat Bread", rate: 35, gst: 5 },
  { id: "p4", name: "Apple Juice", rate: 120, gst: 18 },
];

const customersList = [
  { id: "1", name: "John Doe", phone: "+91 9876543210", company: "Doe Enterprises", gstin: "29AABCU9603R1ZX", address: "123 Main St, Sector 12, Noida" },
  { id: "2", name: "Sarah Smith", phone: "+91 9876543211", company: "ABC Corp", gstin: "07AABCU9603R1ZY", address: "456 Park Ave, CP, Delhi" },
  { id: "3", name: "Mike Johnson", phone: "+91 9876543212", company: "Tech Solutions", gstin: "27AABCU9603R1ZZ", address: "789 Garden St, Gurgaon" },
];

export default function InvoiceBuilder() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const prefillCustomerId = searchParams.get("customer");

  const [invoiceNo, setInvoiceNo] = useState("");
  const [date, setDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [customerId, setCustomerId] = useState<string>(prefillCustomerId ?? "");
  const [discountType, setDiscountType] = useState<"flat" | "percent">("percent");
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [lines, setLines] = useState<Array<{ id: string; name: string; qty: number; rate: number; gst: number }>>([
    { id: "p1", name: "Organic Bananas", qty: 1, rate: 60, gst: 5 },
  ]);

  useEffect(() => {
    const year = new Date().getFullYear();
    setInvoiceNo(`INV${year}001`);
  }, []);

  const currency = "₹"; // INR

  const totals = useMemo(() => {
    const sub = lines.reduce((s, l) => s + l.qty * l.rate, 0);
    const gst = lines.reduce((s, l) => s + (l.qty * l.rate * l.gst) / 100, 0);
    const pre = sub + gst;
    const disc = discountType === "flat" ? discountValue : (pre * (discountValue || 0)) / 100;
    const grand = Math.max(0, pre - (isNaN(disc) ? 0 : disc));
    return { sub, gst, pre, disc, grand };
  }, [lines, discountType, discountValue]);

  const addLine = () => setLines((ls) => [...ls, { id: "", name: "", qty: 1, rate: 0, gst: 0 }]);
  const removeLine = (idx: number) => setLines((ls) => ls.filter((_, i) => i !== idx));

  const setLineProduct = (idx: number, productId: string) => {
    const p = productCatalog.find((x) => x.id === productId);
    setLines((ls) =>
      ls.map((l, i) => (i === idx && p ? { ...l, id: p.id, name: p.name, rate: p.rate, gst: p.gst } : l))
    );
  };

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB"); // dd/MM/yyyy

  const onSave = () => {
    toast.success(`Invoice ${invoiceNo} saved (dummy)`);
    navigate("/invoices");
  };

  const onPrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Create Invoice</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onPrint}>
            <Printer className="h-4 w-4 mr-2" /> Print
          </Button>
          <Button onClick={onSave}>
            <Save className="h-4 w-4 mr-2" /> Save
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Invoice No</Label>
              <Input value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
            </div>
            <div>
              <Label>Date</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              <p className="text-xs text-muted-foreground mt-1">Format: {formatDate(date)}</p>
            </div>
            <div>
              <Label>Customer</Label>
              <Select value={customerId} onValueChange={setCustomerId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {customersList.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name} - {c.company}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[260px]">Item</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Rate (INR)</TableHead>
                  <TableHead>GST %</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lines.map((line, idx) => {
                  const amount = line.qty * line.rate;
                  const gstAmt = (amount * line.gst) / 100;
                  return (
                    <TableRow key={idx}>
                      <TableCell>
                        <Select value={line.id} onValueChange={(v) => setLineProduct(idx, v)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select product" />
                          </SelectTrigger>
                          <SelectContent>
                            {productCatalog.map((p) => (
                              <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input type="number" min={1} value={line.qty}
                          onChange={(e) => setLines((ls) => ls.map((l, i) => i === idx ? { ...l, qty: Number(e.target.value) } : l))}
                        />
                      </TableCell>
                      <TableCell>
                        <Input type="number" value={line.rate}
                          onChange={(e) => setLines((ls) => ls.map((l, i) => i === idx ? { ...l, rate: Number(e.target.value) } : l))}
                        />
                      </TableCell>
                      <TableCell>
                        <Input type="number" value={line.gst}
                          onChange={(e) => setLines((ls) => ls.map((l, i) => i === idx ? { ...l, gst: Number(e.target.value) } : l))}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        {currency}{(amount + gstAmt).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => removeLine(idx)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell colSpan={6}>
                    <Button variant="outline" onClick={addLine}>
                      <Plus className="h-4 w-4 mr-2" /> Add Item
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Discount Type</Label>
              <Select value={discountType} onValueChange={(v) => setDiscountType(v as any)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flat">Flat (₹)</SelectItem>
                  <SelectItem value="percent">Percent (%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Discount Value</Label>
              <Input type="number" value={discountValue}
                onChange={(e) => setDiscountValue(Number(e.target.value))}
                placeholder={discountType === "flat" ? "500" : "10"}
              />
            </div>
          </div>

          <div className="ml-auto max-w-sm space-y-1">
            <div className="flex justify-between text-sm"><span>Subtotal</span><span>{currency}{totals.sub.toFixed(2)}</span></div>
            <div className="flex justify-between text-sm"><span>GST</span><span>{currency}{totals.gst.toFixed(2)}</span></div>
            <div className="flex justify-between text-sm"><span>Discount</span><span>-{currency}{totals.disc.toFixed(2)}</span></div>
            <div className="flex justify-between font-bold text-lg"><span>Grand Total</span><span>{currency}{totals.grand.toFixed(2)}</span></div>
          </div>
        </CardContent>
      </Card>

      {/* Print Template (A4) */}
      <div className="hidden print:block">
        <div className="mx-auto w-[794px] min-h-[1123px] p-6 bg-white text-black">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold">Tax Invoice</h2>
              <p className="text-sm">Invoice: {invoiceNo}</p>
              <p className="text-sm">Date: {formatDate(date)}</p>
            </div>
            <div className="text-right text-sm">
              <p>Currency: INR</p>
              <p>Format: A4</p>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Rate</TableHead>
                <TableHead className="text-right">GST%</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lines.map((l, i) => {
                const amount = l.qty * l.rate;
                const gstAmt = (amount * l.gst) / 100;
                return (
                  <TableRow key={i}>
                    <TableCell>{l.name}</TableCell>
                    <TableCell className="text-right">{l.qty}</TableCell>
                    <TableCell className="text-right">{currency}{l.rate.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{l.gst}%</TableCell>
                    <TableCell className="text-right">{currency}{(amount + gstAmt).toFixed(2)}</TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="ml-auto max-w-xs space-y-1">
                    <div className="flex justify-between text-sm"><span>Subtotal</span><span>{currency}{totals.sub.toFixed(2)}</span></div>
                    <div className="flex justify-between text-sm"><span>GST</span><span>{currency}{totals.gst.toFixed(2)}</span></div>
                    <div className="flex justify-between text-sm"><span>Discount</span><span>-{currency}{totals.disc.toFixed(2)}</span></div>
                    <div className="flex justify-between font-bold text-lg"><span>Grand Total</span><span>{currency}{totals.grand.toFixed(2)}</span></div>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
