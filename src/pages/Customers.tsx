import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Plus, Edit, Trash2, User, Phone, Building, CreditCard, Minus } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const customers = [
  {
    id: "1",
    name: "John Doe",
    phone: "+91 9876543210",
    email: "john@example.com",
    company: "Doe Enterprises",
    gstin: "29AABCU9603R1ZX",
    address: "123 Main St, Sector 12, Noida",
    ledgerBalance: 1250,
    createdAt: "2023-12-01",
  },
  {
    id: "2",
    name: "Sarah Smith",
    phone: "+91 9876543211",
    email: "sarah@abc.com",
    company: "ABC Corp",
    gstin: "07AABCU9603R1ZY",
    address: "456 Park Ave, CP, Delhi",
    ledgerBalance: -500,
    createdAt: "2023-12-05",
  },
  {
    id: "3",
    name: "Mike Johnson",
    phone: "+91 9876543212",
    email: "mike@tech.com",
    company: "Tech Solutions",
    gstin: "27AABCU9603R1ZZ",
    address: "789 Garden St, Gurgaon",
    ledgerBalance: 800,
    createdAt: "2023-12-10",
  },
];

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLedgerDialogOpen, setIsLedgerDialogOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    gstin: "",
    address: "",
  });

  const [ledgerData, setLedgerData] = useState({
    amount: "",
    type: "collect", // collect or pay
    description: "",
  });

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCustomer) {
      toast.success("Customer updated successfully!");
    } else {
      toast.success("Customer added successfully!");
    }
    setIsAddDialogOpen(false);
    setEditingCustomer(null);
    setFormData({
      name: "",
      phone: "",
      email: "",
      company: "",
      gstin: "",
      address: "",
    });
  };

  const handleEdit = (customer: any) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      phone: customer.phone,
      email: customer.email,
      company: customer.company,
      gstin: customer.gstin,
      address: customer.address,
    });
    setIsAddDialogOpen(true);
  };

  const handleLedgerUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const action = ledgerData.type === "collect" ? "collected from" : "paid to";
    toast.success(`₹${ledgerData.amount} ${action} ${selectedCustomer?.name}`);
    setIsLedgerDialogOpen(false);
    setSelectedCustomer(null);
    setLedgerData({
      amount: "",
      type: "collect",
      description: "",
    });
  };

  const openLedger = (customer: any) => {
    setSelectedCustomer(customer);
    setIsLedgerDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Customers</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingCustomer ? "Edit Customer" : "Add New Customer"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Customer Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="gstin">GSTIN</Label>
                <Input
                  id="gstin"
                  value={formData.gstin}
                  onChange={(e) => setFormData({...formData, gstin: e.target.value})}
                />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingCustomer ? "Update Customer" : "Add Customer"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search customers..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{customer.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {customer.phone}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(customer)}>
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Building className="h-3 w-3 text-muted-foreground" />
                  <span>{customer.company}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Ledger Balance:</span>
                  <Badge 
                    variant={customer.ledgerBalance >= 0 ? "default" : "destructive"}
                    className="text-xs"
                  >
                    ₹{Math.abs(customer.ledgerBalance)}
                    {customer.ledgerBalance < 0 ? " (Due)" : ""}
                  </Badge>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => openLedger(customer)}
                >
                  <CreditCard className="h-3 w-3 mr-1" />
                  Ledger
                </Button>
                <Button size="sm" variant="outline" className="flex-1" onClick={() => navigate(`/invoices/new?customer=${customer.id}`)}>
                  Invoice
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Ledger Dialog */}
      <Dialog open={isLedgerDialogOpen} onOpenChange={setIsLedgerDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Manage Ledger - {selectedCustomer?.name}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLedgerUpdate} className="space-y-4">
            <div className="flex gap-2">
              <Button
                type="button"
                variant={ledgerData.type === "collect" ? "default" : "outline"}
                onClick={() => setLedgerData({...ledgerData, type: "collect"})}
                className="flex-1"
              >
                <Plus className="h-4 w-4 mr-2" />
                Collect Money
              </Button>
              <Button
                type="button"
                variant={ledgerData.type === "pay" ? "default" : "outline"}
                onClick={() => setLedgerData({...ledgerData, type: "pay"})}
                className="flex-1"
              >
                <Minus className="h-4 w-4 mr-2" />
                Pay Money
              </Button>
            </div>

            <div>
              <Label htmlFor="amount">Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                value={ledgerData.amount}
                onChange={(e) => setLedgerData({...ledgerData, amount: e.target.value})}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={ledgerData.description}
                onChange={(e) => setLedgerData({...ledgerData, description: e.target.value})}
                placeholder="Enter transaction description"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsLedgerDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {ledgerData.type === "collect" ? "Collect" : "Pay"} ₹{ledgerData.amount || "0"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Customers;