import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const SettingsPage = async () => {
  const sesssion = await auth();
  return (
    <>
      <div>{JSON.stringify(sesssion)}</div>

      <form
        action={async () => {
          "use server";
          await signOut({
            redirectTo: "/auth/login",
          });
        }}
      >
        {" "}
       <button type="submit">Sign out</button>
      </form>
    </>
  );
};

export default SettingsPage;
