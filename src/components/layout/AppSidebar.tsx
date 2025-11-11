import { NavLink } from "react-router-dom";
import {
  Brain,
  Calendar,
  Activity,
  AlertTriangle,
  Users,
  LineChart,
  MessageSquare,
  Heart,
  LayoutDashboard,
  Lightbulb,
  UserCog,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const adminMenuItems = [
  {
    title: "Overview",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Daily Mood Logging",
    url: "/mood-logging",
    icon: Activity,
  },
  {
    title: "AI Mood Analysis",
    url: "/ai-analysis",
    icon: Brain,
  },
  {
    title: "Counselor Management",
    url: "/counselors",
    icon: UserCog,
  },
  {
    title: "Session Tracking",
    url: "/sessions",
    icon: Calendar,
  },
  {
    title: "Crisis Detection",
    url: "/crisis",
    icon: AlertTriangle,
  },
];

const dataScientistMenuItems = [
  {
    title: "Recommendations",
    url: "/recommendations",
    icon: Lightbulb,
  },
];

export function AppSidebar() {
  const { role, signOut } = useAuth();

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-lg">MindCare</h2>
            <p className="text-xs text-muted-foreground">
              {role === "admin" ? "Admin Panel" : "Data Scientist"}
            </p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        {role === "admin" && (
          <SidebarGroup>
            <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminMenuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end
                        className={({ isActive }) =>
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "hover:bg-sidebar-accent/50"
                        }
                      >
                        <item.icon className="h-4 w-4 mr-3" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {role === "data_scientist" && (
          <SidebarGroup>
            <SidebarGroupLabel>Data Scientist</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {dataScientistMenuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end
                        className={({ isActive }) =>
                          isActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "hover:bg-sidebar-accent/50"
                        }
                      >
                        <item.icon className="h-4 w-4 mr-3" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        <Button 
          variant="outline" 
          className="w-full justify-start" 
          onClick={signOut}
        >
          <LogOut className="h-4 w-4 mr-3" />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
