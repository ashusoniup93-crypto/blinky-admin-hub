import { DashboardStats } from "@/components/DashboardStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, MapPin, UserPlus, CreditCard, FileText, TrendingUp, Package, Settings, Percent } from "lucide-react";
import { useNavigate } from "react-router-dom";

const recentOrders = [
  {
    id: "#ORD001",
    customer: "John Doe",
    items: 3,
    total: "₹485",
    status: "pending",
    time: "2 mins ago",
    location: "Sector 12, Noida",
  },
  {
    id: "#ORD002",
    customer: "Sarah Smith",
    items: 1,
    total: "₹125",
    status: "delivered",
    time: "15 mins ago",
    location: "CP, Delhi",
  },
  {
    id: "#ORD003",
    customer: "Mike Johnson",
    items: 5,
    total: "₹720",
    status: "processing",
    time: "32 mins ago",
    location: "Gurgaon",
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

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button className="bg-gradient-to-r from-primary to-primary/80">
          Generate Report
        </Button>
      </div>

      <DashboardStats />

      {/* Quick Actions Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate("/customers")}>
              <UserPlus className="h-6 w-6" />
              <span className="text-xs">Add Customer</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate("/customers")}>
              <CreditCard className="h-6 w-6" />
              <span className="text-xs">Collect Money</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate("/customers")}>
              <CreditCard className="h-6 w-6 rotate-180" />
              <span className="text-xs">Pay Money</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate("/invoices/new")}>
              <FileText className="h-6 w-6" />
              <span className="text-xs">Create Invoice</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate("/products")}>
              <Package className="h-6 w-6" />
              <span className="text-xs">Add Product</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate("/orders")}>
              <TrendingUp className="h-6 w-6" />
              <span className="text-xs">Reports</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate("/promos")}>
              <Percent className="h-6 w-6" />
              <span className="text-xs">Promo Codes</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate("/settings")}>
              <Settings className="h-6 w-6" />
              <span className="text-xs">Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Button variant="outline" size="sm" onClick={() => navigate("/orders")}>
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{order.id}</span>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {order.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {order.location}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{order.total}</p>
                    <p className="text-sm text-muted-foreground">{order.items} items</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-2 bg-muted/50 rounded">
              <UserPlus className="h-4 w-4 text-green-600" />
              <div className="text-sm">
                <p className="font-medium">New customer added</p>
                <p className="text-muted-foreground">John Doe - 2 mins ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 bg-muted/50 rounded">
              <Package className="h-4 w-4 text-blue-600" />
              <div className="text-sm">
                <p className="font-medium">Product updated</p>
                <p className="text-muted-foreground">Organic Bananas - 5 mins ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 bg-muted/50 rounded">
              <CreditCard className="h-4 w-4 text-purple-600" />
              <div className="text-sm">
                <p className="font-medium">Payment received</p>
                <p className="text-muted-foreground">₹1,250 from Sarah Smith</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alert */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-orange-800">Low Stock Alert</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-orange-700">Organic Bananas (1kg)</span>
              <Badge variant="outline" className="text-orange-800 border-orange-300">
                5 left
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-orange-700">Fresh Milk (1L)</span>
              <Badge variant="outline" className="text-orange-800 border-orange-300">
                8 left
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-orange-700">Bread Loaves</span>
              <Badge variant="outline" className="text-orange-800 border-orange-300">
                3 left
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;