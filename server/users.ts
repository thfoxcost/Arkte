"use server";
import { auth } from "@/lib/auth"

const signIn = async (email: string, password: string) => {
    try {

        await auth.api.signInEmail({
            body: {
                email,
                password,
            }
        })
        console.log(`${email} Signed In Succsefully !`)
        return {
            success: true,
            message: "Signed In succefully !"
        }

    } catch (error) {
        const e = error as Error
        console.log(`${email} Signed In Failed !`)
        return {
            success: false,
            message: e.message || "An unknown error occurred.",
        }
    }
}

const signUp = async (email: string, password: string, username: string) => {
    try {
        await auth.api.signUpEmail({
            body: {
                email,
                password,
                name: username,
            },
        });
        console.log(`${username} Created An Account Succefully`)
        return {
            success: true,
            message: "Signed up successfully.",
        };
    } catch (error) {
        const e = error as Error;
        console.log(`${username} Failed Creating An Account`)

        return {
            success: false,
            message: e.message || "An unknown error occurred.",
        };
    }
};
export {
    signIn,
    signUp,
}