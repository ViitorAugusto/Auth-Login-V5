"use client";
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"


export const NavBar = () => {
    const pathname = usePathname()
    return (
      <div className="bg-white w-[600px] flex justify-between items-center gap-4 rounded-md p-4">
        <div className="flex gap-x-2">
          <Button
            asChild
            variant={pathname === "/settings" ? "default" : "outline"}
          >
            <Link href="/settings">Settings</Link>
          </Button>

          <Button
            asChild
            variant={pathname === "/server" ? "default" : "outline"}
          >
            <Link href="/server">Server</Link>
          </Button>
        </div>

        <p>User Button</p>
      </div>
    );
}