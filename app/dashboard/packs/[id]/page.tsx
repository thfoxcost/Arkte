// app/dashboard/packs/[id]/page.tsx

import { db } from "@/db";
import { packsTable } from "@/db/schema/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getPack(id: string) {
  const pack = await db
    .select()
    .from(packsTable)
    .where(eq(packsTable.id, id))
    .then(rows => rows[0]);
  return pack;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const pack = await getPack(id);

  if (!pack) {
    notFound();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{pack.name}</h1>
      <p className="text-gray-600 mb-4">{pack.description}</p>
      
      <div className="border rounded-lg p-4 bg-gray-50">
        <p className="text-sm text-gray-500">Object ID: {pack.objectid}</p>
        <p className="text-sm text-gray-500">
          Created: {new Date(pack.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Files</h2>
        <div className="border rounded-lg p-8 text-center text-gray-500">
          No files yet. Upload your first file.
        </div>
      </div>
    </div>
  );
}