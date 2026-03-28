"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getCurrentUser() {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        
        if (!session?.user) {
            return null;
        }
        const userAvatarUrl = process.env.NEXT_PUBLIC_CUSTOM_AVATAR_URL || "https://ui-avatars.com/api/?name=User&background=random&color=fff";
        return {
            id: session.user.id,
            avatar: userAvatarUrl,
            email: session.user.email,
            name: session.user.name,
        };
    } catch (error) {
        console.error("Error getting current user:", error);
        return null;
    }
}