import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const customers = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Sarah Smith" },
  { id: "3", name: "Mike Johnson" },
];

const mockInvoices = Array.from({ length: 12 }).map((_, i) => ({
  id: `INV2025${String(i + 1).padStart(2, "0")}`,
  customerId: String((i % 3) + 1),
  customerName: customers[(i % 3)].name,
  date: new Date(2025, 0, i + 1).toISOString().slice(0, 10),
  items: (i % 5) + 1,
  total: 1000 + i * 150,
}));

export default function Invoices() {
  const navigate = useNavigate();
  const [customerFilter, setCustomerFilter] = useState<string>("all");
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = useMemo(() => {
    return mockInvoices.filter((inv) => {
      const byCustomer = customerFilter === "all" || inv.customerId === customerFilter;
      const byFrom = !from || inv.date >= from;
      const byTo = !to || inv.date <= to;
      return byCustomer && byFrom && byTo;
    });
  }, [customerFilter, from, to]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Invoices</h1>
        <Button onClick={() => navigate("/invoices/new")}>New Invoice</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label>Customer</Label>
            <Select value={customerFilter} onValueChange={setCustomerFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {customers.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>From</Label>
            <Input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          </div>
          <div>
            <Label>To</Label>
            <Input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
          <div className="flex items-end">
            <Button variant="outline" onClick={() => { setCustomerFilter("all"); setFrom(""); setTo(""); setPage(1); }}>Reset</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Invoices ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice No</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-right">Items</TableHead>
                  <TableHead className="text-right">Total (₹)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageItems.map((inv) => (
                  <TableRow key={inv.id} className="cursor-pointer" onClick={() => toast.info(`Open ${inv.id} (dummy)`) }>
                    <TableCell>{inv.id}</TableCell>
                    <TableCell>{new Date(inv.date).toLocaleDateString("en-GB")}</TableCell>
                    <TableCell>{inv.customerName}</TableCell>
                    <TableCell className="text-right">{inv.items}</TableCell>
                    <TableCell className="text-right">{inv.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">Page {page} of {totalPages}</p>
            <div className="flex gap-2">
              <Button variant="outline" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</Button>
              <Button variant="outline" disabled={page === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
