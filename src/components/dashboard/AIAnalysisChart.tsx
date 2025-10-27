import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const mockData = [
  { emotion: "Anxious", count: 45, risk: 35 },
  { emotion: "Sad", count: 32, risk: 28 },
  { emotion: "Stressed", count: 58, risk: 42 },
  { emotion: "Happy", count: 67, risk: 5 },
  { emotion: "Calm", count: 41, risk: 8 },
];

export function AIAnalysisChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Emotion Detection Analysis</CardTitle>
        <CardDescription>Journal sentiment analysis results</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="emotion" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)"
              }}
            />
            <Legend />
            <Bar 
              dataKey="count" 
              fill="hsl(var(--secondary-accent))" 
              radius={[8, 8, 0, 0]}
              name="Total Entries"
            />
            <Bar 
              dataKey="risk" 
              fill="hsl(var(--warning))" 
              radius={[8, 8, 0, 0]}
              name="Risk Indicators"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
