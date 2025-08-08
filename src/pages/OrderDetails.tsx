import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending": return "bg-yellow-100 text-yellow-800";
    case "processing": return "bg-blue-100 text-blue-800";
    case "delivered": return "bg-green-100 text-green-800";
    case "cancelled": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation() as any;
  const order = location.state || null;

  const [status, setStatus] = useState<string>(order?.status ?? "pending");
  const [deliveryTime, setDeliveryTime] = useState<string>("");

  if (!order) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Order Details</h1>
        <p className="text-muted-foreground">No order data available for {id}. Open from Orders list.</p>
        <Button onClick={() => navigate("/orders")}>Back to Orders</Button>
      </div>
    );
  }

  const onUpdate = () => {
    toast.success(`Order ${order.id} updated: ${status}${deliveryTime ? `, ETA ${deliveryTime}` : ""}`);
    navigate("/orders");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{order.id}</h1>
        <Badge className={getStatusColor(status)}>{status}</Badge>
      </div>

      <Card>
        <CardHeader><CardTitle>Customer</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium">{order.customer}</p>
            <p className="text-sm text-muted-foreground">{order.phone}</p>
            <p className="text-sm text-muted-foreground">{order.address}</p>
          </div>
          <div className="text-sm">
            <p><span className="text-muted-foreground">Payment:</span> {order.paymentMethod}</p>
            <p><span className="text-muted-foreground">Time:</span> {order.time}</p>
            <p><span className="text-muted-foreground">Items:</span> {order.items.join(", ")}</p>
            <p className="font-bold mt-1">Total: {order.total}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Update</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm">Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm">Delivery Time</label>
            <Input placeholder="e.g. Today 6:30 PM" value={deliveryTime} onChange={(e)=>setDeliveryTime(e.target.value)} />
          </div>
          <div className="flex items-end">
            <Button onClick={onUpdate} className="w-full">Save</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
