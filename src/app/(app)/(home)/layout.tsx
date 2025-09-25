import SearchFilter, { SearchFilterSkeleton } from "@/components/search-filter";
import Footer from "@/components/shared/footer";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Navbar from "@/components/shared/navbar";
import { getQueryClient, trpc } from "@/trpc/server";
import React, { Suspense } from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFilterSkeleton />}>
          <SearchFilter />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
