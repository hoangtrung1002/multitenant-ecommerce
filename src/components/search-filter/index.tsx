import React from "react";
import SearchInput from "./search-input";
import Categories from "./categories";
import { CustomCategory } from "@/app/(app)/(home)/types";

interface Props {
  data: CustomCategory[];
}

const SearchFilter = ({ data }: Props) => {
  return (
    <div className="flex flex-col w-full gap-4 px-4 py-8 border-b lg:px-12">
      <SearchInput data={data} />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
    </div>
  );
};

export default SearchFilter;
