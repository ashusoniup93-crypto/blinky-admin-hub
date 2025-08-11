import { Bell, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

export const AdminHeader = () => {
  const isMobile = useIsMobile();

  return (
    <header className="border-b bg-card px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {!isMobile && <SidebarTrigger />}
        {isMobile && (
          <h1 className="text-xl font-bold text-primary">Admin</h1>
        )}
        
        {!isMobile && (
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search orders, products, customers..."
              className="pl-10"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0 z-50">
            <div className="bg-popover text-popover-foreground">
              <div className="flex items-center justify-between px-4 py-2 border-b">
                <span className="font-medium">Notifications</span>
                <Button variant="ghost" size="sm">Mark all as read</Button>
              </div>
              <ul className="max-h-80 overflow-auto divide-y">
                <li className="px-4 py-3 hover:bg-muted/50">
                  <p className="text-sm font-medium">New customer added</p>
                  <p className="text-xs text-muted-foreground">John Doe • 2 mins ago</p>
                </li>
                <li className="px-4 py-3 hover:bg-muted/50">
                  <p className="text-sm font-medium">Product updated</p>
                  <p className="text-xs text-muted-foreground">Organic Bananas • 5 mins ago</p>
                </li>
                <li className="px-4 py-3 hover:bg-muted/50">
                  <p className="text-sm font-medium">Payment received</p>
                  <p className="text-xs text-muted-foreground">₹1,250 from Sarah Smith</p>
                </li>
              </ul>
              <div className="px-4 py-2 border-t text-right">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/orders">View all</Link>
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link to="/profile?tab=personal">Profile Settings</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link to="/profile?tab=business">Business Settings</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};