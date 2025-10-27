import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const mockData = [
  { date: "Mon", mood: 7, stress: 4, sleep: 7 },
  { date: "Tue", mood: 6, stress: 6, sleep: 6 },
  { date: "Wed", mood: 8, stress: 3, sleep: 8 },
  { date: "Thu", mood: 5, stress: 7, sleep: 5 },
  { date: "Fri", mood: 7, stress: 5, sleep: 7 },
  { date: "Sat", mood: 9, stress: 2, sleep: 9 },
  { date: "Sun", mood: 8, stress: 3, sleep: 8 },
];

export function MoodTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Mood & Stress Trends</CardTitle>
        <CardDescription>Average patterns across all users</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              domain={[0, 10]}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)"
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="mood" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))" }}
              name="Mood"
            />
            <Line 
              type="monotone" 
              dataKey="stress" 
              stroke="hsl(var(--destructive))" 
              strokeWidth={2}
              dot={{ fill: "hsl(var(--destructive))" }}
              name="Stress"
            />
            <Line 
              type="monotone" 
              dataKey="sleep" 
              stroke="hsl(var(--success))" 
              strokeWidth={2}
              dot={{ fill: "hsl(var(--success))" }}
              name="Sleep (hrs)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
