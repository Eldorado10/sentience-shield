import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { Activity, Plus, Search, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

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

type MoodLog = {
  id: string;
  userName: string;
  date: string;
  mood: number;
  stress: number;
  sleep: number;
  notes: string;
};

const MoodLogging = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLog, setEditingLog] = useState<MoodLog | null>(null);
  const [formData, setFormData] = useState({
    userName: "",
    date: "",
    mood: 5,
    stress: 5,
    sleep: 7,
    notes: ""
  });

  const filteredLogs = dailyLogsData.filter(log => 
    log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.notes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setEditingLog(null);
    setFormData({
      userName: "",
      date: new Date().toISOString().split('T')[0],
      mood: 5,
      stress: 5,
      sleep: 7,
      notes: ""
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (log: MoodLog) => {
    setEditingLog(log);
    setFormData({
      userName: log.userName,
      date: log.date,
      mood: log.mood,
      stress: log.stress,
      sleep: log.sleep,
      notes: log.notes
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (log: MoodLog) => {
    if (confirm(`Delete mood log for ${log.userName}?`)) {
      toast.success("Mood log deleted successfully");
      // In real app: call API to delete
    }
  };

  const handleSave = () => {
    if (editingLog) {
      toast.success("Mood log updated successfully");
    } else {
      toast.success("Mood log added successfully");
    }
    setIsDialogOpen(false);
    // In real app: call API to save
  };

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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Today's Mood Logs</CardTitle>
              <CardDescription>Recent user submissions for January 15, 2025</CardDescription>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-full sm:w-[200px]"
                />
              </div>
              <Button onClick={handleAdd}>
                <Plus className="h-4 w-4 mr-2" />
                Add Log
              </Button>
            </div>
          </div>
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
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                    No mood logs found
                  </TableCell>
                </TableRow>
              ) : (
                filteredLogs.map((log) => (
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
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(log)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(log)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingLog ? "Edit Mood Log" : "Add Mood Log"}</DialogTitle>
            <DialogDescription>
              {editingLog ? "Update the mood log details below" : "Enter mood log details for the user"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="userName">User Name</Label>
              <Input
                id="userName"
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                placeholder="Enter user name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="mood">Mood (1-10)</Label>
                <Input
                  id="mood"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.mood}
                  onChange={(e) => setFormData({ ...formData, mood: Number(e.target.value) })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stress">Stress (1-10)</Label>
                <Input
                  id="stress"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.stress}
                  onChange={(e) => setFormData({ ...formData, stress: Number(e.target.value) })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sleep">Sleep (hrs)</Label>
                <Input
                  id="sleep"
                  type="number"
                  min="0"
                  max="24"
                  step="0.5"
                  value={formData.sleep}
                  onChange={(e) => setFormData({ ...formData, sleep: Number(e.target.value) })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="How are you feeling today?"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingLog ? "Update" : "Add"} Log
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MoodLogging;
