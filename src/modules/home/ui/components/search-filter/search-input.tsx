import useTRPCSession from "@/app/hooks/use-trpc-session";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import CategoriesSidebar from "./categories-sidebar";

interface Props {
  disabled?: boolean;
  defaultValue?: string | undefined;
  onChange?: (value: string) => void;
}

const SearchInput = ({ disabled, onChange, defaultValue }: Props) => {
  const [debouncedValue, setDebouncedValue] = useState(defaultValue || "");
  const { session } = useTRPCSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // debounce
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      onChange?.(debouncedValue);
    }, 500);

    return () => clearTimeout(timeOutId);
  }, [debouncedValue, onChange]);

  return (
    <div className="flex items-center w-full gap-2">
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      <div className="relative w-full">
        <SearchIcon className="absolute -translate-y-1/2 left-3 top-1/2 size-4 text-neutral-500" />
        <Input
          className="pl-8"
          placeholder="Search products"
          disabled={disabled}
          value={debouncedValue}
          onChange={(e) => setDebouncedValue(e.target.value)}
        />
      </div>
      {/* Mobile View */}
      <Button
        variant="elevated"
        className="flex size-12 shrink-0 lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListFilterIcon />
      </Button>
      {session.data?.user && (
        <Button asChild variant="elevated">
          <Link prefetch href="/library">
            <BookmarkCheckIcon />
            Library
          </Link>
        </Button>
      )}
    </div>
  );
};

export default SearchInput;
