"use server";

import { db } from "@/db";
import { packsTable } from "@/db/schema/schema";
import { eq } from "drizzle-orm";

// Define the type for a pack
export type Pack = {
    id: string;
    objectid: string;
    name: string;
    description: string;
    organizationId: string;
    createdAt: Date; 
};


export const getPacks = async (userId?: string) => {
    try {
        const packs = await db.select().from(packsTable);
        
        console.log(`[${new Date().toISOString()}] - ✅ Successfully fetched packs`);        
        return { 
            success: true, 
            data: packs
        };
    
    } catch (error) {
        const e = error as Error;
        console.error(`[${new Date().toISOString()}] - ❌ Failed to fetch packs:`, e.message);
        
        return {
            success: false,
            message: e.message || "An unknown error occurred.",
            data: null
        };
    }
};


export const getPacksByOrg = async (organizationId: string) => {
    try {
        const packs = await db
            .select()
            .from(packsTable)
            .where(eq(packsTable.organizationId, organizationId));
        
        return { 
            success: true, 
            data: packs as Pack[]
        };
    } catch (error) {
        const e = error as Error;
        return {
            success: false,
            message: e.message || "Failed to fetch packs",
            data: null
        };
    }
};