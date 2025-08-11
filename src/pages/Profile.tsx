import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function Profile() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialTab = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const t = params.get("tab");
    return t === "business" ? "business" : "personal";
  }, [location.search]);
  const [tab, setTab] = useState<string>(initialTab);

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  const [form, setForm] = useState({
    name: "",
    address: "",
    mobile: "",
    email: "",
    password: "",
    profileImage: "",
    companyName: "",
    companyAddress: "",
    companyMobile: "",
    gstin: "",
    companyWebsite: "",
    companyEmail: "",
    pan: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile saved (dummy)");
  };

  const onTabChange = (value: string) => {
    setTab(value);
    const params = new URLSearchParams(location.search);
    params.set("tab", value);
    navigate({ search: params.toString() }, { replace: true });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>

      <form onSubmit={onSubmit} className="space-y-6">
        <Tabs value={tab} onValueChange={onTabChange}>
          <TabsList className="mb-4">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card>
              <CardHeader><CardTitle>Personal</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label>Name</Label><Input value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} /></div>
                <div><Label>Mobile</Label><Input value={form.mobile} onChange={(e)=>setForm({...form, mobile: e.target.value})} /></div>
                <div><Label>Email</Label><Input type="email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} /></div>
                <div><Label>Password</Label><Input type="password" value={form.password} onChange={(e)=>setForm({...form, password: e.target.value})} /></div>
                <div className="md:col-span-2"><Label>Address</Label><Input value={form.address} onChange={(e)=>setForm({...form, address: e.target.value})} /></div>
                <div className="md:col-span-2"><Label>Profile Image URL</Label><Input value={form.profileImage} onChange={(e)=>setForm({...form, profileImage: e.target.value})} placeholder="https://..." /></div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="business">
            <Card>
              <CardHeader><CardTitle>Company</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label>Company Name</Label><Input value={form.companyName} onChange={(e)=>setForm({...form, companyName: e.target.value})} /></div>
                <div><Label>Company Mobile</Label><Input value={form.companyMobile} onChange={(e)=>setForm({...form, companyMobile: e.target.value})} /></div>
                <div><Label>Company Email</Label><Input type="email" value={form.companyEmail} onChange={(e)=>setForm({...form, companyEmail: e.target.value})} /></div>
                <div><Label>Company Website</Label><Input value={form.companyWebsite} onChange={(e)=>setForm({...form, companyWebsite: e.target.value})} /></div>
                <div className="md:col-span-2"><Label>Company Address</Label><Input value={form.companyAddress} onChange={(e)=>setForm({...form, companyAddress: e.target.value})} /></div>
                <div><Label>GSTIN</Label><Input value={form.gstin} onChange={(e)=>setForm({...form, gstin: e.target.value})} /></div>
                <div><Label>PAN</Label><Input value={form.pan} onChange={(e)=>setForm({...form, pan: e.target.value})} /></div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end"><Button type="submit">Save</Button></div>
      </form>
    </div>
  );
}

