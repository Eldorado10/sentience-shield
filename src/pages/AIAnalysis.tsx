import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Brain, Plus, Search, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const aiAnalysisData = [
  { id: "1", userName: "Emma Wilson", sentiment: "Positive", riskScore: 15, emotions: ["Joy", "Contentment"], analyzed: "2025-01-15 09:30" },
  { id: "2", userName: "James Brown", sentiment: "Negative", riskScore: 65, emotions: ["Stress", "Worry"], analyzed: "2025-01-15 10:15" },
  { id: "3", userName: "Sarah Johnson", sentiment: "Very Negative", riskScore: 92, emotions: ["Despair", "Anxiety", "Hopelessness"], analyzed: "2025-01-15 10:45" },
  { id: "4", userName: "Mike Chen", sentiment: "Mixed", riskScore: 58, emotions: ["Anxiety", "Determination"], analyzed: "2025-01-15 11:20" },
  { id: "5", userName: "Lisa Anderson", sentiment: "Neutral", riskScore: 35, emotions: ["Calm", "Fatigue"], analyzed: "2025-01-15 12:00" },
];

const emotionFrequency = [
  { emotion: "Anxiety", count: 142, severity: 7.2 },
  { emotion: "Stress", count: 126, severity: 6.8 },
  { emotion: "Sadness", count: 89, severity: 6.5 },
  { emotion: "Joy", count: 156, severity: 2.1 },
  { emotion: "Anger", count: 67, severity: 7.5 },
  { emotion: "Fear", count: 78, severity: 8.1 },
];

const riskDistribution = [
  { category: "Depression", score: 68 },
  { category: "Anxiety", score: 75 },
  { category: "Stress", score: 82 },
  { category: "Trauma", score: 45 },
  { category: "Burnout", score: 71 },
];

const getRiskBadge = (score: number) => {
  if (score >= 80) return <Badge variant="destructive">Critical</Badge>;
  if (score >= 60) return <Badge className="bg-destructive">High</Badge>;
  if (score >= 40) return <Badge className="bg-warning">Medium</Badge>;
  return <Badge className="bg-success">Low</Badge>;
};

const AIAnalysis = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAnalysis, setEditingAnalysis] = useState<any>(null);
  const [formData, setFormData] = useState({ userName: "", sentiment: "", riskScore: "", emotions: "", analyzed: "" });

  const filteredData = aiAnalysisData.filter(item =>
    item.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setEditingAnalysis(null);
    setFormData({ userName: "", sentiment: "", riskScore: "", emotions: "", analyzed: "" });
    setIsDialogOpen(true);
  };

  const handleEdit = (analysis: any) => {
    setEditingAnalysis(analysis);
    setFormData({ 
      userName: analysis.userName, 
      sentiment: analysis.sentiment, 
      riskScore: analysis.riskScore.toString(), 
      emotions: analysis.emotions.join(", "),
      analyzed: analysis.analyzed 
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    toast({ title: "Analysis deleted", description: "The analysis record has been removed." });
  };

  const handleSave = () => {
    if (editingAnalysis) {
      toast({ title: "Analysis updated", description: "The analysis record has been updated successfully." });
    } else {
      toast({ title: "Analysis added", description: "New analysis record has been added successfully." });
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Brain className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">AI-Based Mood Analysis</h1>
          <p className="text-muted-foreground">Natural language processing and sentiment detection</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Emotion Detection Frequency</CardTitle>
            <CardDescription>Most common emotions detected in journal entries</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={emotionFrequency}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="emotion" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Legend />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} name="Occurrences" />
                <Bar dataKey="severity" fill="hsl(var(--destructive))" radius={[8, 8, 0, 0]} name="Avg Severity" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mental Health Risk Distribution</CardTitle>
            <CardDescription>AI-predicted risk levels by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={riskDistribution}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="category" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <PolarRadiusAxis stroke="hsl(var(--muted-foreground))" fontSize={10} domain={[0, 100]} />
                <Radar
                  name="Risk Score"
                  dataKey="score"
                  stroke="hsl(var(--destructive))"
                  fill="hsl(var(--destructive))"
                  fillOpacity={0.3}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Analysis Results Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent AI Analysis Results</CardTitle>
              <CardDescription>Latest sentiment and risk assessments</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-[200px]"
                />
              </div>
              <Button onClick={handleAdd}>
                <Plus className="h-4 w-4 mr-2" />
                Add Analysis
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Sentiment</TableHead>
                <TableHead>Risk Score</TableHead>
                <TableHead>Detected Emotions</TableHead>
                <TableHead>Analyzed At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((analysis) => (
                <TableRow key={analysis.id}>
                  <TableCell className="font-medium">{analysis.userName}</TableCell>
                  <TableCell>
                    <Badge variant={analysis.sentiment.includes("Negative") ? "destructive" : "secondary"}>
                      {analysis.sentiment}
                    </Badge>
                  </TableCell>
                  <TableCell>{getRiskBadge(analysis.riskScore)}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {analysis.emotions.map((emotion, idx) => (
                        <span key={idx} className="text-xs bg-secondary px-2 py-1 rounded">
                          {emotion}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{analysis.analyzed}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(analysis)}>
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(analysis.id)}>
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
            <DialogTitle>{editingAnalysis ? "Edit Analysis" : "Add Analysis"}</DialogTitle>
            <DialogDescription>
              {editingAnalysis ? "Update the analysis record" : "Add a new analysis record"}
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
              <Label htmlFor="sentiment">Sentiment</Label>
              <Input
                id="sentiment"
                value={formData.sentiment}
                onChange={(e) => setFormData({ ...formData, sentiment: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="riskScore">Risk Score</Label>
              <Input
                id="riskScore"
                type="number"
                value={formData.riskScore}
                onChange={(e) => setFormData({ ...formData, riskScore: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="emotions">Detected Emotions (comma-separated)</Label>
              <Input
                id="emotions"
                value={formData.emotions}
                onChange={(e) => setFormData({ ...formData, emotions: e.target.value })}
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

export default AIAnalysis;
