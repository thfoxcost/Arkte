"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const signIn = async (email: string, password: string) => {
    try {
        const response = await auth.api.signInEmail({
            body: {
                email,
                password,
            },
            headers: await headers(),
        });

        console.log(`${email} Signed In Successfully!`);


        redirect("/dashboard");
        return {
            success: true,
            message: "Signed in successfully!",
        };
    } catch (error) {

        if (error instanceof Error && error.message.includes("NEXT_REDIRECT")) {
            throw error;
        }

        const e = error as Error;
        console.log(`${email} Sign In Failed:`, e.message);

        return {
            success: false,
            message: e.message || "An unknown error occurred.",
        };
    }
};

const signUp = async (email: string, password: string, username: string) => {
    try {
        const response = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name: username,
            },
            headers: await headers(),
        });

        console.log(`${username} Created An Account Successfully`);
        return {
            success: true,
            message: "Signed up successfully.",
        };
    } catch (error) {
        const e = error as Error;
        console.log(`${username} Failed Creating An Account:`, e.message);

        return {
            success: false,
            message: e.message || "An unknown error occurred.",
        };
    }
};




const getSession = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        return session;
    } catch (error) {
        console.error("Error getting session:", error);
        return null;
    }
};


const getCurrentUser = async () => {
    const session = await getSession();
    return session?.user || null;
};


export const signOut = async () => {
    try {
        await auth.api.signOut({
            headers: await headers(),
        });
        console.log("User Signed Out Successfully");
    } catch (error) {
        console.error("Error signing out:", error);
    }
    redirect("/login");
};

export {
    signIn,
    signUp,
    getSession,
    getCurrentUser,
};