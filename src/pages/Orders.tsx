import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Eye, Download, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

const orders = [
  {
    id: "#ORD001",
    customer: "John Doe",
    phone: "+91 9876543210",
    items: ["Organic Bananas", "Fresh Milk", "Bread"],
    total: "₹485",
    status: "pending",
    time: "2023-12-10 10:30 AM",
    address: "123 Main St, Sector 12, Noida",
    paymentMethod: "UPI",
  },
  {
    id: "#ORD002",
    customer: "Sarah Smith",
    phone: "+91 9876543211",
    items: ["Apple Juice"],
    total: "₹125",
    status: "delivered",
    time: "2023-12-10 09:15 AM",
    address: "456 Park Ave, CP, Delhi",
    paymentMethod: "Card",
  },
  {
    id: "#ORD003",
    customer: "Mike Johnson",
    phone: "+91 9876543212",
    items: ["Vegetables", "Rice", "Dal", "Oil", "Spices"],
    total: "₹720",
    status: "processing",
    time: "2023-12-10 08:45 AM",
    address: "789 Garden St, Gurgaon",
    paymentMethod: "Cash",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending": return "bg-yellow-100 text-yellow-800";
    case "processing": return "bg-blue-100 text-blue-800";
    case "delivered": return "bg-green-100 text-green-800";
    case "cancelled": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Orders Management</h1>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Orders
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search orders or customers..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {order.id.replace("#ORD", "")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{order.id}</h3>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </div>

              <div className="space-y-2 text-sm mb-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3 text-muted-foreground" />
                  <span>{order.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="truncate">{order.address}</span>
                </div>
                <div className="bg-muted/50 p-2 rounded">
                  <p className="text-xs text-muted-foreground mb-1">{order.items.length} items:</p>
                  <p className="text-sm truncate">{order.items.join(", ")}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold">{order.total}</span>
                <span className="text-xs text-muted-foreground">{order.time}</span>
              </div>

              <div className="flex gap-2">
                <Select
                  value={order.status}
                  onValueChange={(value) => handleStatusUpdate(order.id, value)}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Orders;