import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockData = [
  { month: "Jan", sessions: 120, completed: 112 },
  { month: "Feb", sessions: 145, completed: 138 },
  { month: "Mar", sessions: 167, completed: 159 },
  { month: "Apr", sessions: 189, completed: 178 },
  { month: "May", sessions: 203, completed: 195 },
  { month: "Jun", sessions: 221, completed: 210 },
];

export function SessionsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Counseling Sessions Overview</CardTitle>
        <CardDescription>Monthly session statistics</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
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
            <Area 
              type="monotone" 
              dataKey="sessions" 
              stackId="1"
              stroke="hsl(var(--primary))" 
              fill="hsl(var(--primary) / 0.2)"
              name="Total Sessions"
            />
            <Area 
              type="monotone" 
              dataKey="completed" 
              stackId="2"
              stroke="hsl(var(--success))" 
              fill="hsl(var(--success) / 0.2)"
              name="Completed"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
