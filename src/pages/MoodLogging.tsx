import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { Activity } from "lucide-react";

const dailyLogsData = [
  { id: "1", userName: "Emma Wilson", date: "2025-01-15", mood: 8, stress: 3, sleep: 7.5, notes: "Feeling great today" },
  { id: "2", userName: "James Brown", date: "2025-01-15", mood: 5, stress: 7, sleep: 5, notes: "Stressed about work deadline" },
  { id: "3", userName: "Sarah Johnson", date: "2025-01-15", mood: 3, stress: 9, sleep: 4, notes: "Very anxious, can't focus" },
  { id: "4", userName: "Mike Chen", date: "2025-01-15", mood: 7, stress: 4, sleep: 8, notes: "Good sleep helped a lot" },
  { id: "5", userName: "Lisa Anderson", date: "2025-01-15", mood: 6, stress: 5, sleep: 6.5, notes: "Average day" },
];

const weeklyTrendData = [
  { day: "Mon", avgMood: 6.5, avgStress: 5.2, avgSleep: 6.8 },
  { day: "Tue", avgMood: 6.8, avgStress: 4.9, avgSleep: 7.1 },
  { day: "Wed", avgMood: 7.2, avgStress: 4.5, avgSleep: 7.3 },
  { day: "Thu", avgMood: 6.3, avgStress: 6.1, avgSleep: 6.5 },
  { day: "Fri", avgMood: 7.8, avgStress: 3.8, avgSleep: 7.8 },
  { day: "Sat", avgMood: 8.2, avgStress: 2.5, avgSleep: 8.5 },
  { day: "Sun", avgMood: 7.9, avgStress: 3.1, avgSleep: 8.2 },
];

const moodDistribution = [
  { name: "Happy (8-10)", value: 35, color: "hsl(var(--success))" },
  { name: "Neutral (5-7)", value: 45, color: "hsl(var(--warning))" },
  { name: "Low (1-4)", value: 20, color: "hsl(var(--destructive))" },
];

const getMoodBadge = (mood: number) => {
  if (mood >= 8) return <Badge className="bg-success">Excellent</Badge>;
  if (mood >= 6) return <Badge className="bg-warning">Good</Badge>;
  if (mood >= 4) return <Badge variant="secondary">Fair</Badge>;
  return <Badge variant="destructive">Poor</Badge>;
};

const MoodLogging = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Activity className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Daily Mood & Stress Logging</h1>
          <p className="text-muted-foreground">Track user emotional states and behavioral patterns</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Mood Trends</CardTitle>
            <CardDescription>Average mood, stress, and sleep patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 10]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="avgMood" stroke="hsl(var(--primary))" strokeWidth={2} name="Avg Mood" />
                <Line type="monotone" dataKey="avgStress" stroke="hsl(var(--destructive))" strokeWidth={2} name="Avg Stress" />
                <Line type="monotone" dataKey="avgSleep" stroke="hsl(var(--success))" strokeWidth={2} name="Avg Sleep" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mood Distribution</CardTitle>
            <CardDescription>Overall emotional state breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={moodDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {moodDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Daily Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Mood Logs</CardTitle>
          <CardDescription>Recent user submissions for January 15, 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Mood</TableHead>
                <TableHead>Stress Level</TableHead>
                <TableHead>Sleep Hours</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dailyLogsData.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.userName}</TableCell>
                  <TableCell>{log.date}</TableCell>
                  <TableCell>{getMoodBadge(log.mood)}</TableCell>
                  <TableCell>
                    <span className={log.stress >= 7 ? "text-destructive font-semibold" : ""}>
                      {log.stress}/10
                    </span>
                  </TableCell>
                  <TableCell>{log.sleep}h</TableCell>
                  <TableCell className="max-w-xs truncate text-muted-foreground italic">
                    "{log.notes}"
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

export default MoodLogging;
