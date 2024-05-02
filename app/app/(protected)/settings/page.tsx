'use client';
import { auth, signOut } from "@/auth";
import { useSession } from "next-auth/react";

const SettingsPage =  () => {
  const session =  useSession();

  return (
    <>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    
    </>
  );
};

export default SettingsPage;
