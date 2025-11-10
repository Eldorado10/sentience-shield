import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Lightbulb, Plus, Search, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRec, setEditingRec] = useState<any>(null);
  const [formData, setFormData] = useState({ userName: "", type: "", recommendation: "", frequency: "" });

  const filteredData = recommendationsData.filter(item =>
    item.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setEditingRec(null);
    setFormData({ userName: "", type: "", recommendation: "", frequency: "" });
    setIsDialogOpen(true);
  };

  const handleEdit = (rec: any) => {
    setEditingRec(rec);
    setFormData({ userName: rec.userName, type: rec.type, recommendation: rec.recommendation, frequency: rec.frequency });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    toast({ title: "Recommendation deleted", description: "The recommendation has been removed." });
  };

  const handleSave = () => {
    if (editingRec) {
      toast({ title: "Recommendation updated", description: "The recommendation has been updated successfully." });
    } else {
      toast({ title: "Recommendation added", description: "New recommendation has been added successfully." });
    }
    setIsDialogOpen(false);
  };

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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Active User Recommendations</CardTitle>
              <CardDescription>Current wellness suggestions for users</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-[200px]"
                />
              </div>
              <Button onClick={handleAdd}>
                <Plus className="h-4 w-4 mr-2" />
                Add Recommendation
              </Button>
            </div>
          </div>
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((rec) => (
                <TableRow key={rec.id}>
                  <TableCell className="font-medium">{rec.userName}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{rec.type}</Badge>
                  </TableCell>
                  <TableCell className="text-foreground">{rec.recommendation}</TableCell>
                  <TableCell className="text-muted-foreground">{rec.frequency}</TableCell>
                  <TableCell>{getStatusBadge(rec.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(rec)}>
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(rec.id)}>
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
            <DialogTitle>{editingRec ? "Edit Recommendation" : "Add Recommendation"}</DialogTitle>
            <DialogDescription>
              {editingRec ? "Update the recommendation details" : "Add a new recommendation"}
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
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="recommendation">Recommendation</Label>
              <Textarea
                id="recommendation"
                value={formData.recommendation}
                onChange={(e) => setFormData({ ...formData, recommendation: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="frequency">Frequency</Label>
              <Input
                id="frequency"
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
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

export default Recommendations;
