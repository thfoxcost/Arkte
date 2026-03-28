import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const packsTable = pgTable("packsTable", {
    id: text("id").primaryKey(), 
    objectid: text("objectid").unique().notNull(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    organizationId: text("organization_id").notNull(), // Added organization ID
    createdAt: timestamp("created_at").defaultNow().notNull(),
});