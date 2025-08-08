import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Image } from "lucide-react";
import { toast } from "sonner";

const initialBanners = [
  { id: "1", title: "Mega Sale", imageUrl: "/placeholder.svg", active: true },
  { id: "2", title: "Fresh Arrivals", imageUrl: "/placeholder.svg", active: true },
];

export default function Banners() {
  const [banners, setBanners] = useState(initialBanners);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ title: "", imageUrl: "", active: true });

  const onSubmit = (e: React.FormEvent) => { e.preventDefault(); toast.success(editing ? "Banner updated" : "Banner added"); setOpen(false); setEditing(null); setForm({ title: "", imageUrl: "", active: true }); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Home Banners</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2"/> Add Banner</Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <DialogHeader><DialogTitle>{editing ? "Edit Banner" : "Add Banner"}</DialogTitle></DialogHeader>
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input value={form.title} onChange={(e)=>setForm({...form, title: e.target.value})} required />
              </div>
              <div>
                <Label>Image URL</Label>
                <Input value={form.imageUrl} onChange={(e)=>setForm({...form, imageUrl: e.target.value})} placeholder="https://..." />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={()=>setOpen(false)}>Cancel</Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader><CardTitle>All Banners</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Banner</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {banners.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted rounded flex items-center justify-center"><Image className="h-6 w-6 text-muted-foreground"/></div>
                        <div>
                          <p className="font-medium">{b.title}</p>
                          <p className="text-xs text-muted-foreground">{b.imageUrl}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{b.active ? "Yes" : "No"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={()=>{setEditing(b); setOpen(true);}}><Edit className="h-4 w-4"/></Button>
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
