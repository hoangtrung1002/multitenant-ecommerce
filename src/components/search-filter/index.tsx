"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Categories from "./categories";
import SearchInput from "./search-input";

const SearchFilter = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
  return (
    <div
      className="flex flex-col w-full gap-4 px-4 py-8 border-b lg:px-12"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <SearchInput />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
    </div>
  );
};

export default SearchFilter;

export const SearchFilterSkeleton = () => {
  return (
    <div
      className="flex flex-col w-full gap-4 px-4 py-8 border-b lg:px-12"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      <SearchInput disabled />
      <div className="hidden lg:block">
        <div className="h-11" />
      </div>
    </div>
  );
};
