import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

export const UseInfoProps = ({ user, label }: UserInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <p>{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row p-2  items-start justify-between rounded-md shadow-md border">
          <p className="text-sm font-medium">ID</p>
          <p className="max-w-[180px] font-mono p-1 bg-slate-100 rounded-md truncate text-sm">
            {user?.id}
          </p>
        </div>

        <div className="flex flex-row p-2  items-start justify-between rounded-md shadow-md border">
          <p className="text-sm font-medium">Name</p>
          <p className="max-w-[180px] font-mono p-1 bg-slate-100 rounded-md truncate text-sm">
            {user?.name}
          </p>
        </div>

        <div className="flex flex-row p-2  items-start justify-between rounded-md shadow-md border">
          <p className="text-sm font-medium">Email</p>
          <p className="max-w-[180px] font-mono p-1 bg-slate-100 rounded-md truncate text-sm">
            {user?.email}
          </p>
        </div>

        <div className="flex flex-row p-2  items-start justify-between rounded-md shadow-md border">
          <p className="text-sm font-medium">Role</p>
          <p className="max-w-[180px] font-mono p-1 bg-slate-100 rounded-md truncate text-sm">
            {user?.role}
          </p>
        </div>

        <div className="flex flex-row p-2  items-start justify-between rounded-md shadow-md border">
          <p className="text-sm font-medium">ID</p>

          <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
            {user?.isTwoFactorEnabled ? "Enabled - ON " : "Disabled - OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
