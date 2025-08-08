import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

const initialPromos = [
  { id: "1", code: "WELCOME500", type: "flat", value: 500, active: true, validFrom: "2025-01-01", validTo: "2025-12-31" },
  { id: "2", code: "SAVE10", type: "percent", value: 10, active: true, validFrom: "2025-01-01", validTo: "2025-06-30" },
];

export default function Promos() {
  const [promos, setPromos] = useState(initialPromos);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ code: "", type: "flat", value: "", validFrom: "", validTo: "", active: true });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(editing ? "Promo updated" : "Promo added");
    setOpen(false); setEditing(null); setForm({ code: "", type: "flat", value: "", validFrom: "", validTo: "", active: true });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Promo Codes</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2"/> Add Promo</Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <DialogHeader><DialogTitle>{editing ? "Edit Promo" : "Add Promo"}</DialogTitle></DialogHeader>
            <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label>Code</Label>
                <Input value={form.code} onChange={(e)=>setForm({...form, code: e.target.value.toUpperCase()})} required />
              </div>
              <div>
                <Label>Type</Label>
                <Select value={form.type} onValueChange={(v)=>setForm({...form, type: v})}>
                  <SelectTrigger><SelectValue/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flat">Flat (₹)</SelectItem>
                    <SelectItem value="percent">Percent (%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Value</Label>
                <Input type="number" value={form.value} onChange={(e)=>setForm({...form, value: e.target.value})} required />
              </div>
              <div>
                <Label>Valid From</Label>
                <Input type="date" value={form.validFrom} onChange={(e)=>setForm({...form, validFrom: e.target.value})} />
              </div>
              <div>
                <Label>Valid To</Label>
                <Input type="date" value={form.validTo} onChange={(e)=>setForm({...form, validTo: e.target.value})} />
              </div>
              <div className="col-span-2 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={()=>setOpen(false)}>Cancel</Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader><CardTitle>All Promos</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Valid</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {promos.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{p.code}</TableCell>
                    <TableCell>{p.type}</TableCell>
                    <TableCell>{p.type === "flat" ? `₹${p.value}` : `${p.value}%`}</TableCell>
                    <TableCell>{p.validFrom} - {p.validTo}</TableCell>
                    <TableCell>{p.active ? "Active" : "Inactive"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={()=>{ setEditing(p); setOpen(true); }}><Edit className="h-4 w-4"/></Button>
                        <Button size="sm" variant="outline" onClick={()=>toast.success("Deleted (dummy)") }><Trash2 className="h-4 w-4"/></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
