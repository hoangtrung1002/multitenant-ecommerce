"use client";
import useProductFilters from "@/app/hooks/use-product-filter";
import { DEFAULT_BG_COLOR } from "@/modules/home/constants";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import BreadcrumbNavigation from "./breadcrumb-navigation";
import Categories from "./categories";
import SearchInput from "./search-input";

const SearchFilter = () => {
  const trpc = useTRPC();
  const params = useParams();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
  const categoryParam = params.category as string | undefined;
  const [filters, setFilters] = useProductFilters();

  const activeCategory = categoryParam || "all";

  const activeCategoryData = data.find(
    (category) => category.slug === activeCategory
  );
  const activeCategoryColor = activeCategoryData?.color || DEFAULT_BG_COLOR;
  const activeCategoryName = activeCategoryData?.name || null;
  const activeSubcategory = params.subcategory as string | undefined;
  const activeSubcategoryName =
    activeCategoryData?.subcategories.find(
      (subcategory) => subcategory.slug === activeSubcategory
    )?.name || null;

  return (
    <div
      className="flex flex-col w-full gap-4 px-4 py-8 border-b lg:px-12"
      style={{ backgroundColor: activeCategoryColor }}
    >
      <SearchInput
        defaultValue={filters.search}
        onChange={(value) => setFilters({ search: value })}
      />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
      <BreadcrumbNavigation
        activeCategoryName={activeCategoryName}
        activeCategory={activeCategory}
        activeSubcategoryName={activeSubcategoryName}
      />
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
