import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Shipping() {
  const [form, setForm] = useState({ baseCharge: 30, perKm: 5, freeThreshold: 499 });

  const onSubmit = (e: React.FormEvent) => { e.preventDefault(); toast.success("Shipping settings saved"); };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Shipping Charges</h1>

      <Card>
        <CardHeader><CardTitle>Configure</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Base Charge (₹)</Label>
              <Input type="number" value={form.baseCharge} onChange={(e)=>setForm({...form, baseCharge: Number(e.target.value)})} />
            </div>
            <div>
              <Label>Per Km (₹)</Label>
              <Input type="number" value={form.perKm} onChange={(e)=>setForm({...form, perKm: Number(e.target.value)})} />
            </div>
            <div>
              <Label>Free Shipping Threshold (₹)</Label>
              <Input type="number" value={form.freeThreshold} onChange={(e)=>setForm({...form, freeThreshold: Number(e.target.value)})} />
            </div>
            <div className="md:col-span-3 flex justify-end">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
