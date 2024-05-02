import { UseInfoProps } from "@/components/auth/user-info";
import { currentUser } from "@/lib/auth";

const ServePage = async () => {
  const user = await currentUser();

  return (
    <div className="w-[600px]">
       <UseInfoProps label="Server Component" user={user} /> 
      <pre> {JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default ServePage;
