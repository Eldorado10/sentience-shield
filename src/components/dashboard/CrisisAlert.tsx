import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Phone, MessageSquare } from "lucide-react";

interface CrisisAlertItem {
  id: string;
  userName: string;
  riskLevel: "high" | "critical";
  timestamp: string;
  lastNote: string;
}

const mockAlerts: CrisisAlertItem[] = [
  {
    id: "1",
    userName: "Sarah Johnson",
    riskLevel: "critical",
    timestamp: "2 min ago",
    lastNote: "Feeling hopeless and overwhelmed..."
  },
  {
    id: "2",
    userName: "Mike Chen",
    riskLevel: "high",
    timestamp: "15 min ago",
    lastNote: "Can't sleep, anxiety through the roof"
  }
];

export function CrisisAlert() {
  return (
    <Card className="border-destructive shadow-glow">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive animate-pulse" />
          <CardTitle className="text-destructive">Crisis Alerts</CardTitle>
        </div>
        <CardDescription>Immediate attention required</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockAlerts.map((alert) => (
          <div key={alert.id} className="p-4 bg-destructive-light rounded-lg space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-foreground">{alert.userName}</h4>
                <p className="text-sm text-muted-foreground">{alert.timestamp}</p>
              </div>
              <Badge variant={alert.riskLevel === "critical" ? "destructive" : "default"}>
                {alert.riskLevel}
              </Badge>
            </div>
            <p className="text-sm text-foreground italic">"{alert.lastNote}"</p>
            <div className="flex gap-2">
              <Button size="sm" variant="default" className="flex-1">
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
