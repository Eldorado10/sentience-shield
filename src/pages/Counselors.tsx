import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { UserCog, Plus, Search, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const counselorsData = [
  { id: "1", name: "Dr. Emily Roberts", specialization: "Anxiety & Depression", availability: "available", activeSessions: 8, totalSessions: 145, rating: 4.8, yearsExp: 12 },
  { id: "2", name: "Dr. Michael Lee", specialization: "Trauma & PTSD", availability: "busy", activeSessions: 12, totalSessions: 203, rating: 4.9, yearsExp: 15 },
  { id: "3", name: "Dr. Sarah Martinez", specialization: "Family Therapy", availability: "available", activeSessions: 5, totalSessions: 167, rating: 4.7, yearsExp: 10 },
  { id: "4", name: "Dr. James Taylor", specialization: "Stress Management", availability: "offline", activeSessions: 0, totalSessions: 189, rating: 4.6, yearsExp: 8 },
  { id: "5", name: "Dr. Rachel Kim", specialization: "Adolescent Psychology", availability: "available", activeSessions: 6, totalSessions: 134, rating: 4.9, yearsExp: 11 },
];

const sessionsBySpecialization = [
  { specialization: "Anxiety", sessions: 245, satisfaction: 88 },
  { specialization: "Depression", sessions: 198, satisfaction: 85 },
  { specialization: "Trauma", sessions: 156, satisfaction: 92 },
  { specialization: "Stress", sessions: 189, satisfaction: 81 },
  { specialization: "Family", sessions: 134, satisfaction: 87 },
];

const availabilityData = [
  { name: "Available", value: 8, color: "hsl(var(--success))" },
  { name: "Busy", value: 4, color: "hsl(var(--warning))" },
  { name: "Offline", value: 3, color: "hsl(var(--muted))" },
];

const getAvailabilityBadge = (status: string) => {
  if (status === "available") return <Badge className="bg-success">Available</Badge>;
  if (status === "busy") return <Badge className="bg-warning">Busy</Badge>;
  return <Badge variant="secondary">Offline</Badge>;
};

const Counselors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCounselor, setEditingCounselor] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", specialization: "", yearsExp: "", availability: "" });

  const filteredData = counselorsData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setEditingCounselor(null);
    setFormData({ name: "", specialization: "", yearsExp: "", availability: "" });
    setIsDialogOpen(true);
  };

  const handleEdit = (counselor: any) => {
    setEditingCounselor(counselor);
    setFormData({ name: counselor.name, specialization: counselor.specialization, yearsExp: counselor.yearsExp.toString(), availability: counselor.availability });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    toast({ title: "Counselor removed", description: "The counselor has been removed from the system." });
  };

  const handleSave = () => {
    if (editingCounselor) {
      toast({ title: "Counselor updated", description: "The counselor profile has been updated successfully." });
    } else {
      toast({ title: "Counselor added", description: "New counselor has been added successfully." });
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <UserCog className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Counselor Management</h1>
          <p className="text-muted-foreground">Professional therapist profiles and availability tracking</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sessions by Specialization</CardTitle>
            <CardDescription>Workload and satisfaction rates</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sessionsBySpecialization}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="specialization" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Legend />
                <Bar dataKey="sessions" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} name="Total Sessions" />
                <Bar dataKey="satisfaction" fill="hsl(var(--success))" radius={[8, 8, 0, 0]} name="Satisfaction %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Counselor Availability</CardTitle>
            <CardDescription>Current status distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={availabilityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {availabilityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Counselors Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Counselors</CardTitle>
              <CardDescription>Complete therapist directory</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search counselors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-[200px]"
                />
              </div>
              <Button onClick={handleAdd}>
                <Plus className="h-4 w-4 mr-2" />
                Add Counselor
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Counselor</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Active Sessions</TableHead>
                <TableHead>Total Sessions</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((counselor) => (
                <TableRow key={counselor.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {counselor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{counselor.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{counselor.specialization}</TableCell>
                  <TableCell>{counselor.yearsExp} years</TableCell>
                  <TableCell>{getAvailabilityBadge(counselor.availability)}</TableCell>
                  <TableCell className="text-center font-semibold">{counselor.activeSessions}</TableCell>
                  <TableCell className="text-center">{counselor.totalSessions}</TableCell>
                  <TableCell>⭐ {counselor.rating}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(counselor)}>
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(counselor.id)}>
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
            <DialogTitle>{editingCounselor ? "Edit Counselor" : "Add Counselor"}</DialogTitle>
            <DialogDescription>
              {editingCounselor ? "Update the counselor profile" : "Add a new counselor to the system"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="yearsExp">Years of Experience</Label>
              <Input
                id="yearsExp"
                type="number"
                value={formData.yearsExp}
                onChange={(e) => setFormData({ ...formData, yearsExp: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="availability">Availability</Label>
              <Input
                id="availability"
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                placeholder="available, busy, or offline"
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

export default Counselors;
