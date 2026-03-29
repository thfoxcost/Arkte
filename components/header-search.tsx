"use client";
import { Search } from "lucide-react";
import { InputGroup, InputGroupInput, InputGroupAddon } from "@/components/ui/input-group";
import { useSearch } from "@/hooks/use-search";
import { SearchResults } from "@/components/search-results";
export function HeaderSearch() {
  const { query, setQuery, results, open, close } = useSearch();

  return (
    <div className="relative flex flex-1 justify-center max-w-md mx-auto">
      <InputGroup className="w-full shadow-none [--radius:9999px]">
        <InputGroupAddon>
          <Search className="size-4 text-muted-foreground" />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Search packs, pages..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && true} // re-open if there's a query
          className="bg-muted/50 border-transparent focus:bg-background focus:border-border transition-all"
        />
      </InputGroup>

      <SearchResults results={results} open={open} onClose={close} />
    </div>
  );
}