import { EntityAvatar } from "@/components/shared/entity-avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { OWNERS } from "@/data/companies";

const ROLES = ["Account Executive", "Sales Manager", "SDR Lead", "Marketing Ops", "RevOps Analyst", "CMO", "VP Sales", "Demand Gen Manager"];

const TEAM = OWNERS.map((owner, i) => ({
  ...owner,
  role: ROLES[i % ROLES.length],
  email: `${owner.name.toLowerCase().replace(" ", ".")}@meridianabm.com`,
  status: i === 0 ? "Admin" : "Member",
}));

export function TeamSection() {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Access</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {TEAM.map((member) => (
            <TableRow key={member.name}>
              <TableCell>
                <div className="flex items-center gap-2.5">
                  <EntityAvatar name={member.name} size="sm" />
                  <span className="font-medium">{member.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{member.role}</TableCell>
              <TableCell className="text-muted-foreground">{member.email}</TableCell>
              <TableCell>
                <Badge variant={member.status === "Admin" ? "info" : "outline"}>{member.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
