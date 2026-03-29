"use client";
import { useRouter } from "next/navigation";
import { Files, Tags, Users, Settings, PackageSearch } from "lucide-react";
import type { SearchResult } from "@/hooks/use-search";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  Files:    <Files    className="size-3.5" />,
  Tags:     <Tags     className="size-3.5" />,
  Users:    <Users    className="size-3.5" />,
  Settings: <Settings className="size-3.5" />,
};

function ResultIcon({ result }: { result: SearchResult }) {
  if (result.group === "Packs") return <PackageSearch className="size-3.5" />;
  return iconMap[result.icon ?? ""] ?? <Files className="size-3.5" />;
}

interface SearchResultsProps {
  results: SearchResult[];
  open: boolean;
  onClose: () => void;
}

export function SearchResults({ results, open, onClose }: SearchResultsProps) {
  const router = useRouter();

  if (!open) return null;

  const groups = ["Packs", "Pages"] as const;

  const handleSelect = (url: string) => {
    router.push(url);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Dropdown */}
      <div className="absolute top-full left-0 right-0 mt-2 z-50 rounded-xl border border-border bg-background/95 backdrop-blur-md shadow-xl overflow-hidden">
        {results.length === 0 ? (
          <div className="px-4 py-6 text-center text-sm text-muted-foreground">
            No results found
          </div>
        ) : (
          <div className="max-h-80 overflow-y-auto py-1">
            {groups.map((group) => {
              const items = results.filter((r) => r.group === group);
              if (items.length === 0) return null;
              return (
                <div key={group}>
                  <div className="px-3 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                    {group}
                  </div>
                  {items.map((item) => (
                    <button
                      key={item.id}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 text-left",
                        "hover:bg-muted/60 transition-colors"
                      )}
                      onClick={() => handleSelect(item.url)}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                        <ResultIcon result={item} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{item.title}</p>
                        {item.description && (
                          <p className="text-xs text-muted-foreground truncate">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <span className="text-[10px] text-muted-foreground/50 shrink-0">
                        {item.group}
                      </span>
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}