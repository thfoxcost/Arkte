"use client";
import { useState, useEffect, useCallback } from "react";
import { getPacks } from "@/data/get-packs";

export type SearchResult = {
  id: string;
  title: string;
  description?: string;
  url: string;
  group: "Packs" | "Pages";
  icon?: string;
};

const STATIC_PAGES: SearchResult[] = [
  { id: "docs",     title: "Documents & Files", url: "/dashboard/docs",     group: "Pages", icon: "Files"    },
  { id: "tags",     title: "Tags & Links",      url: "/dashboard/tags",     group: "Pages", icon: "Tags"     },
  { id: "members",  title: "Members",           url: "/dashboard/members",  group: "Pages", icon: "Users"    },
  { id: "settings", title: "Settings",          url: "/dashboard/settings", group: "Pages", icon: "Settings" },
];

export function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [allPacks, setAllPacks] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);

  // Fetch packs once on mount
  useEffect(() => {
    getPacks().then((res) => {
      if (res.success && res.data) {
        setAllPacks(
          res.data.map((pack) => ({
            id: pack.id,
            title: pack.name,
            description: pack.description,
            url: `/dashboard/packs/${pack.id}`,
            group: "Packs" as const,
          }))
        );
      }
    });
  }, []);

  // Filter whenever query changes
  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setResults([]);
      setOpen(false);
      return;
    }

    const all: SearchResult[] = [...allPacks, ...STATIC_PAGES];
    const filtered = all.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q)
    );

    setResults(filtered);
    setOpen(true);
  }, [query, allPacks]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  return { query, setQuery, results, open, close };
}