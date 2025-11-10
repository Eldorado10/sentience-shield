import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { AreaChart, Area } from "recharts";
import { Calendar, Plus, Search, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<any>(null);
  const [formData, setFormData] = useState({ userName: "", counselor: "", date: "", time: "", status: "" });

  const filteredData = sessionsData.filter(item =>
    item.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.counselor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setEditingSession(null);
    setFormData({ userName: "", counselor: "", date: "", time: "", status: "" });
    setIsDialogOpen(true);
  };

  const handleEdit = (session: any) => {
    setEditingSession(session);
    setFormData({ userName: session.userName, counselor: session.counselor, date: session.date, time: session.time, status: session.status });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    toast({ title: "Session deleted", description: "The session has been removed." });
  };

  const handleSave = () => {
    if (editingSession) {
      toast({ title: "Session updated", description: "The session has been updated successfully." });
    } else {
      toast({ title: "Session scheduled", description: "New session has been scheduled successfully." });
    }
    setIsDialogOpen(false);
  };

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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Upcoming & Recent Sessions</CardTitle>
              <CardDescription>Scheduled and completed therapy appointments</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search sessions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-[200px]"
                />
              </div>
              <Button onClick={handleAdd}>
                <Plus className="h-4 w-4 mr-2" />
                Schedule Session
              </Button>
            </div>
          </div>
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((session) => (
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
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(session)}>
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(session.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingSession ? "Edit Session" : "Schedule Session"}</DialogTitle>
            <DialogDescription>
              {editingSession ? "Update the session details" : "Schedule a new counseling session"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="userName">User Name</Label>
              <Input
                id="userName"
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="counselor">Counselor</Label>
              <Input
                id="counselor"
                value={formData.counselor}
                onChange={(e) => setFormData({ ...formData, counselor: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Input
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                placeholder="Scheduled, Completed, or Cancelled"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sessions;
