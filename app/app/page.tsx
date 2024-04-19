import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-sky-400 to-blue-800">
      <div className="space-x-6 text-center">
        <h2 className="text-6xl font-semibold text-white drop-shadow-md">
          Auth
        </h2>
        <p>A simple authentication service</p>
        <div>
          <LoginButton>
            <Button>Sign in</Button>
          </LoginButton>
        </div>
      </div>
    </div>
  );
}
