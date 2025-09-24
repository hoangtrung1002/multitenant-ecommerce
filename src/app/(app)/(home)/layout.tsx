import { Category } from "@/payload-types";
import SearchFilter from "@/components/search-filter";
import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import React from "react";
import { CustomCategory } from "./types";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    depth: 1, // populated subcategories, subcategories[0] will be a type of "Category"
    collection: "categories",
    where: { parent: { exists: false } },
    sort: "name",
  });

  const formattedData: CustomCategory[] = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      // Because of "depth: 1" we are confident "doc" will be a type of "Category"
      ...(doc as Category),
      subcategories: undefined,
    })),
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilter data={formattedData} />
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
