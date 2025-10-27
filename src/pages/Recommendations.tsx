import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Lightbulb, TrendingUp } from "lucide-react";

const recommendationsData = [
  { id: "1", userName: "Emma Wilson", type: "Exercise", recommendation: "30-min morning walk", frequency: "Daily", status: "Active" },
  { id: "2", userName: "James Brown", type: "Sleep Hygiene", recommendation: "Set consistent bedtime routine", frequency: "Nightly", status: "Active" },
  { id: "3", userName: "Sarah Johnson", type: "Crisis Support", recommendation: "Connect with counselor immediately", frequency: "Urgent", status: "Sent" },
  { id: "4", userName: "Mike Chen", type: "Meditation", recommendation: "10-min breathing exercises", frequency: "Twice Daily", status: "Active" },
  { id: "5", userName: "Lisa Anderson", type: "Social", recommendation: "Join support group", frequency: "Weekly", status: "Pending" },
];

const categoryStats = [
  { category: "Exercise", count: 145, effectiveness: 82 },
  { category: "Meditation", count: 189, effectiveness: 88 },
  { category: "Sleep Hygiene", count: 167, effectiveness: 79 },
  { category: "Social Activity", count: 98, effectiveness: 75 },
  { category: "Therapy", count: 134, effectiveness: 91 },
  { category: "Crisis Support", count: 23, effectiveness: 95 },
];

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary-accent))",
  "hsl(var(--success))",
  "hsl(var(--warning))",
  "hsl(var(--accent))",
  "hsl(var(--destructive))",
];

const effectivenessData = [
  { week: "Week 1", improvement: 12 },
  { week: "Week 2", improvement: 18 },
  { week: "Week 3", improvement: 25 },
  { week: "Week 4", improvement: 31 },
  { week: "Week 5", improvement: 38 },
  { week: "Week 6", improvement: 44 },
];

const getStatusBadge = (status: string) => {
  if (status === "Sent") return <Badge variant="destructive">Sent</Badge>;
  if (status === "Active") return <Badge className="bg-success">Active</Badge>;
  return <Badge variant="secondary">Pending</Badge>;
};

const Recommendations = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Lightbulb className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Personalized Recommendations</h1>
          <p className="text-muted-foreground">AI-generated wellness suggestions and activities</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recommendation Categories</CardTitle>
            <CardDescription>Distribution and effectiveness by type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryStats} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis dataKey="category" type="category" stroke="hsl(var(--muted-foreground))" fontSize={11} width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Bar dataKey="count" radius={[0, 8, 8, 0]} name="Total Sent">
                  {categoryStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Improvement Trends</CardTitle>
            <CardDescription>Average wellness improvement after following recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={effectivenessData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Bar dataKey="improvement" fill="hsl(var(--success))" radius={[8, 8, 0, 0]} name="Improvement %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Active Recommendations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active User Recommendations</CardTitle>
          <CardDescription>Current wellness suggestions for users</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Recommendation</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recommendationsData.map((rec) => (
                <TableRow key={rec.id}>
                  <TableCell className="font-medium">{rec.userName}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{rec.type}</Badge>
                  </TableCell>
                  <TableCell className="text-foreground">{rec.recommendation}</TableCell>
                  <TableCell className="text-muted-foreground">{rec.frequency}</TableCell>
                  <TableCell>{getStatusBadge(rec.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Recommendations;
