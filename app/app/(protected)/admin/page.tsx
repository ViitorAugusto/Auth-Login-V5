'use client'
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = async () => {
  const onApiRouteClick = () => {
    fetch("/api/admin").then((res) => {
      if(res.ok) {
        toast.success("Success");
      } else {
        toast.error("Failed");
      }
    });
  }

  return (
    <Card className="w-[600px]">
      <CardHeader>Admin Page</CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are an admin" />
        </RoleGate>
        <div className="flex flex-row justify-between items-center rounded-md p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only API Route</p>
          <Button onClick={onApiRouteClick}>Clike to teste</Button>
        </div>

        <div className="flex flex-row justify-between items-center rounded-md p-3 shadow-md">
          <p className="text-sm font-medium">Admin-only Serve Action</p>
          <Button>Clike to teste</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
