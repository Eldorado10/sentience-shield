import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone, MessageSquare, Heart } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart, Bar } from "recharts";

const crisisAlertsData = [
  { id: "1", userName: "Sarah Johnson", riskLevel: "critical", timestamp: "2025-01-15 10:45:00", lastNote: "Feeling hopeless and overwhelmed, can't see a way out", actionTaken: "Counselor Contacted", counselor: "Dr. Emily Roberts" },
  { id: "2", userName: "Mike Chen", riskLevel: "high", timestamp: "2025-01-15 09:20:00", lastNote: "Extreme anxiety, heart racing, can't breathe properly", actionTaken: "Emergency Alert Sent", counselor: "Dr. Michael Lee" },
  { id: "3", userName: "David Park", riskLevel: "critical", timestamp: "2025-01-14 23:15:00", lastNote: "Don't want to continue anymore, everything is too much", actionTaken: "Hotline Connected", counselor: "Dr. Sarah Martinez" },
  { id: "4", userName: "Rachel Adams", riskLevel: "high", timestamp: "2025-01-14 18:30:00", lastNote: "Panic attacks getting worse, feeling isolated", actionTaken: "Counselor Contacted", counselor: "Dr. Rachel Kim" },
];

const weeklyAlerts = [
  { day: "Mon", critical: 2, high: 5, medium: 8 },
  { day: "Tue", critical: 1, high: 4, medium: 6 },
  { day: "Wed", critical: 3, high: 6, medium: 7 },
  { day: "Thu", critical: 2, high: 3, medium: 9 },
  { day: "Fri", critical: 1, high: 7, medium: 10 },
  { day: "Sat", critical: 4, high: 8, medium: 5 },
  { day: "Sun", critical: 2, high: 5, medium: 4 },
];

const interventionSuccess = [
  { method: "Counselor Call", success: 94 },
  { method: "Emergency Contact", success: 89 },
  { method: "Hotline Referral", success: 87 },
  { method: "In-App Support", success: 76 },
  { method: "Automated Message", success: 62 },
];

const getRiskBadge = (level: string) => {
  if (level === "critical") return <Badge variant="destructive" className="animate-pulse">Critical</Badge>;
  return <Badge className="bg-destructive">High</Badge>;
};

const Crisis = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <AlertTriangle className="h-8 w-8 text-destructive animate-pulse" />
        <div>
          <h1 className="text-3xl font-bold text-destructive">Crisis Detection & Emergency Support</h1>
          <p className="text-muted-foreground">AI-powered real-time mental health emergency monitoring</p>
        </div>
      </div>

      {/* Alert Banner */}
      <Card className="border-destructive bg-destructive-light">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Heart className="h-10 w-10 text-destructive animate-pulse" />
              <div>
                <h3 className="text-xl font-bold text-destructive">2 Active Crisis Alerts</h3>
                <p className="text-sm text-muted-foreground">Immediate intervention required</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="destructive" size="lg">
                <Phone className="h-5 w-5 mr-2" />
                Emergency Hotline
              </Button>
              <Button variant="outline" size="lg">
                <MessageSquare className="h-5 w-5 mr-2" />
                Notify All Counselors
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Crisis Alert Trends</CardTitle>
            <CardDescription>Alert severity distribution over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyAlerts}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Line type="monotone" dataKey="critical" stroke="hsl(var(--destructive))" strokeWidth={3} name="Critical" />
                <Line type="monotone" dataKey="high" stroke="hsl(var(--warning))" strokeWidth={2} name="High" />
                <Line type="monotone" dataKey="medium" stroke="hsl(var(--primary))" strokeWidth={2} name="Medium" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Intervention Success Rates</CardTitle>
            <CardDescription>Effectiveness of different crisis response methods</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={interventionSuccess} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 100]} />
                <YAxis dataKey="method" type="category" stroke="hsl(var(--muted-foreground))" fontSize={11} width={130} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Bar dataKey="success" fill="hsl(var(--success))" radius={[0, 8, 8, 0]} name="Success Rate %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Crisis Alerts Table */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Active & Recent Crisis Alerts</CardTitle>
          <CardDescription>High-risk users requiring immediate attention</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Last Note</TableHead>
                <TableHead>Assigned Counselor</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {crisisAlertsData.map((alert) => (
                <TableRow key={alert.id} className="bg-destructive-light">
                  <TableCell className="font-medium">{alert.userName}</TableCell>
                  <TableCell>{getRiskBadge(alert.riskLevel)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{alert.timestamp}</TableCell>
                  <TableCell className="max-w-xs">
                    <p className="text-sm italic text-foreground truncate">"{alert.lastNote}"</p>
                  </TableCell>
                  <TableCell className="text-sm">{alert.counselor}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="destructive">
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Chat
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Crisis;
