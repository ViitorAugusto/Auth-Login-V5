"use client";

import { useCurrentRole } from "@/hook/use-current-admin";
import { UserRole } from "@prisma/client";
import { FormErros } from "../form-erros";

interface RoleGateProps {
  allowedRole: UserRole;
  children: React.ReactNode;
}

export const RoleGate = ({ allowedRole, children }: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRole)
    return <FormErros message="You are not authorized to access this page" />;

  return <>{children}</>;
};
