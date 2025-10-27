import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { AreaChart, Area } from "recharts";
import { Calendar } from "lucide-react";

const sessionsData = [
  { id: "1", userName: "Emma Wilson", counselor: "Dr. Emily Roberts", date: "2025-01-20", time: "10:00 AM", status: "Scheduled", progress: 8 },
  { id: "2", userName: "James Brown", counselor: "Dr. Michael Lee", date: "2025-01-18", time: "2:30 PM", status: "Completed", progress: 6 },
  { id: "3", userName: "Sarah Johnson", counselor: "Dr. Emily Roberts", date: "2025-01-19", time: "11:00 AM", status: "Completed", progress: 4 },
  { id: "4", userName: "Mike Chen", counselor: "Dr. Sarah Martinez", date: "2025-01-21", time: "9:00 AM", status: "Scheduled", progress: 7 },
  { id: "5", userName: "Lisa Anderson", counselor: "Dr. Rachel Kim", date: "2025-01-17", time: "3:00 PM", status: "Completed", progress: 9 },
];

const monthlySessionTrends = [
  { month: "Jul", scheduled: 145, completed: 138, cancelled: 7 },
  { month: "Aug", scheduled: 167, completed: 159, cancelled: 8 },
  { month: "Sep", scheduled: 189, completed: 180, cancelled: 9 },
  { month: "Oct", scheduled: 203, completed: 195, cancelled: 8 },
  { month: "Nov", scheduled: 221, completed: 213, cancelled: 8 },
  { month: "Dec", scheduled: 234, completed: 225, cancelled: 9 },
];

const progressTrends = [
  { session: "Session 1", avgProgress: 3.5 },
  { session: "Session 2", avgProgress: 4.2 },
  { session: "Session 3", avgProgress: 5.1 },
  { session: "Session 4", avgProgress: 6.3 },
  { session: "Session 5", avgProgress: 7.0 },
  { session: "Session 6", avgProgress: 7.8 },
  { session: "Session 7", avgProgress: 8.2 },
  { session: "Session 8", avgProgress: 8.7 },
];

const getStatusBadge = (status: string) => {
  if (status === "Completed") return <Badge className="bg-success">Completed</Badge>;
  if (status === "Scheduled") return <Badge className="bg-primary">Scheduled</Badge>;
  return <Badge variant="destructive">Cancelled</Badge>;
};

const Sessions = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Calendar className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Session Tracking & Progress</h1>
          <p className="text-muted-foreground">Monitor counseling appointments and treatment outcomes</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Session Overview</CardTitle>
            <CardDescription>Scheduled vs completed sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlySessionTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="scheduled" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.3)" name="Scheduled" />
                <Area type="monotone" dataKey="completed" stackId="2" stroke="hsl(var(--success))" fill="hsl(var(--success) / 0.3)" name="Completed" />
                <Area type="monotone" dataKey="cancelled" stackId="3" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive) / 0.3)" name="Cancelled" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Patient Progress Over Time</CardTitle>
            <CardDescription>Average improvement across session numbers</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="session" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 10]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="avgProgress"
                  stroke="hsl(var(--success))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--success))", r: 5 }}
                  name="Progress Score"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Sessions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming & Recent Sessions</CardTitle>
          <CardDescription>Scheduled and completed therapy appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Counselor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessionsData.map((session) => (
                <TableRow key={session.id}>
                  <TableCell className="font-medium">{session.userName}</TableCell>
                  <TableCell>{session.counselor}</TableCell>
                  <TableCell>{session.date}</TableCell>
                  <TableCell className="text-muted-foreground">{session.time}</TableCell>
                  <TableCell>{getStatusBadge(session.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{session.progress}/10</span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-wellness rounded-full"
                          style={{ width: `${session.progress * 10}%` }}
                        />
                      </div>
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

export default Sessions;
