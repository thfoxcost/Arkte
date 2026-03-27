"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

/**
 * Renders a logout interface that signs the current user out and redirects to the login page when activated.
 *
 * @returns A React element containing a destructive "Logout" button that calls sign-out and navigates to "/login" when clicked.
 */
export default function page() {
  
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <Button onClick={handleLogout} variant="destructive">
      Logout <LogOut className="size-4" />
    </Button>
  );
}

