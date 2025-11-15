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
} from "@/components/ui/sidebar";
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

const patientMenuItems = [
  {
    title: "User Management",
    url: "/",
    icon: Users,
  },
];

const itExpertMenuItems = [
  {
    title: "Session Tracking",
    url: "/sessions",
    icon: Calendar,
  },
];

const mentalHealthResearcherMenuItems = [
  {
    title: "AI Mood Analysis",
    url: "/ai-analysis",
    icon: Brain,
  },
];

const psychologistMenuItems = [
  {
    title: "Counselor Management",
    url: "/counselors",
    icon: UserCog,
  },
];

const emergencyResponseMenuItems = [
  {
    title: "Crisis Detection",
    url: "/crisis",
    icon: AlertTriangle,
  },
];

export function AppSidebar() {
  const { userRole } = useAuth();

  const getMenuItems = () => {
    switch (userRole) {
      case "admin":
        return { label: "Admin Panel", items: adminMenuItems };
      case "data_scientist":
        return { label: "Data Scientist", items: dataScientistMenuItems };
      case "patient":
        return { label: "Patient Panel", items: patientMenuItems };
      case "it_expert":
        return { label: "IT Expert Panel", items: itExpertMenuItems };
      case "mental_health_researcher":
        return { label: "Researcher Panel", items: mentalHealthResearcherMenuItems };
      case "psychologist":
        return { label: "Psychologist Panel", items: psychologistMenuItems };
      case "emergency_response_team":
        return { label: "Emergency Response", items: emergencyResponseMenuItems };
      default:
        return { label: "Menu", items: [] };
    }
  };

  const { label, items } = getMenuItems();
  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-lg">MindCare</h2>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{label}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
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
      </SidebarContent>
    </Sidebar>
  );
}
