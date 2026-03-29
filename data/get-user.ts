"use server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { user as userTable } from "@/db/schema/auth-schema";
import { eq } from "drizzle-orm";

export async function getCurrentUser() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) return null;

    // ✅ Fetch role from DB since better-auth session may not include it
    const dbUser = await db
      .select({ role: userTable.role })
      .from(userTable)
      .where(eq(userTable.id, session.user.id))
      .then((rows) => rows[0] ?? null);

    const avatarUrl =
      process.env.NEXT_PUBLIC_CUSTOM_AVATAR_URL ||
      "https://ui-avatars.com/api/?name=User&background=random&color=fff";

    return {
      id: session.user.id,
      avatar: avatarUrl,
      email: session.user.email,
      name: session.user.name,
      role: dbUser?.role ?? null,        
      isAdmin: dbUser?.role === "admin",
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}