import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Counselor {
  id: string;
  name: string;
  specialization: string;
  availability: "available" | "busy" | "offline";
  activeSessions: number;
  rating: number;
}

const mockCounselors: Counselor[] = [
  { id: "1", name: "Dr. Emily Roberts", specialization: "Anxiety & Depression", availability: "available", activeSessions: 3, rating: 4.8 },
  { id: "2", name: "Dr. Michael Lee", specialization: "Trauma & PTSD", availability: "busy", activeSessions: 5, rating: 4.9 },
  { id: "3", name: "Dr. Sarah Martinez", specialization: "Family Therapy", availability: "available", activeSessions: 2, rating: 4.7 },
  { id: "4", name: "Dr. James Taylor", specialization: "Stress Management", availability: "offline", activeSessions: 0, rating: 4.6 },
];

const getAvailabilityBadge = (status: Counselor["availability"]) => {
  const styles = {
    available: "bg-success-light text-success-foreground",
    busy: "bg-warning-light text-warning-foreground",
    offline: "bg-muted text-muted-foreground",
  };
  return styles[status];
};

export function CounselorsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Counselor Management</CardTitle>
        <CardDescription>Active counselors and their status</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Counselor</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Active Sessions</TableHead>
              <TableHead>Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCounselors.map((counselor) => (
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
                <TableCell>{counselor.specialization}</TableCell>
                <TableCell>
                  <Badge className={getAvailabilityBadge(counselor.availability)}>
                    {counselor.availability}
                  </Badge>
                </TableCell>
                <TableCell>{counselor.activeSessions}</TableCell>
                <TableCell>⭐ {counselor.rating}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
