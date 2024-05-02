"use client";
import { UseInfoProps } from "@/components/auth/user-info";
import { useCurrentUser } from "@/hook/use-current-user";

const ClientPage = () => {
  const user = useCurrentUser();

  return (
    <div className="w-[600px]">
      <UseInfoProps label="Client Component" user={user} />
      <pre> {JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default ClientPage;
