import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Package } from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "₹1,24,500",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "Total Orders",
    value: "1,245",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingBag,
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    title: "Active Customers",
    value: "892",
    change: "+15.3%",
    trend: "up",
    icon: Users,
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    title: "Products",
    value: "567",
    change: "-2.1%",
    trend: "down",
    icon: Package,
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
  },
];

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center mt-1">
              {stat.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600" />
              )}
              <span
                className={`text-sm ml-1 ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-muted-foreground ml-1">
                from last month
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};