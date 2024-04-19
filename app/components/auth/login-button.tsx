"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  isChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  isChild,
}: LoginButtonProps) => {
  const onClick = () => {
    router.push("/auth/login");
    console.log("Clicked");
  };
  const router = useRouter();

  if (mode === "modal") {
    return <span>Todo: Modal</span>;
  }
  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
};
