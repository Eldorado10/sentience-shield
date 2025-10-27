import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  lastActive: string;
  riskLevel: "low" | "medium" | "high" | "critical";
  sessionsCount: number;
}

const mockUsers: User[] = [
  { id: "1", name: "Emma Wilson", email: "emma.w@email.com", lastActive: "2 hours ago", riskLevel: "low", sessionsCount: 5 },
  { id: "2", name: "James Brown", email: "james.b@email.com", lastActive: "1 day ago", riskLevel: "medium", sessionsCount: 3 },
  { id: "3", name: "Sarah Johnson", email: "sarah.j@email.com", lastActive: "10 min ago", riskLevel: "critical", sessionsCount: 8 },
  { id: "4", name: "Mike Chen", email: "mike.c@email.com", lastActive: "3 hours ago", riskLevel: "high", sessionsCount: 6 },
  { id: "5", name: "Lisa Anderson", email: "lisa.a@email.com", lastActive: "5 hours ago", riskLevel: "low", sessionsCount: 2 },
];

const getRiskBadgeVariant = (risk: User["riskLevel"]) => {
  const variants = {
    low: "default" as const,
    medium: "secondary" as const,
    high: "destructive" as const,
    critical: "destructive" as const,
  };
  return variants[risk];
};

export function UsersTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>Overview of all registered users</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Risk Level</TableHead>
              <TableHead>Sessions</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-muted-foreground">{user.lastActive}</TableCell>
                <TableCell>
                  <Badge variant={getRiskBadgeVariant(user.riskLevel)}>
                    {user.riskLevel}
                  </Badge>
                </TableCell>
                <TableCell>{user.sessionsCount}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
