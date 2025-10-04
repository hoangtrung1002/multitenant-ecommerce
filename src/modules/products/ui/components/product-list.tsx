"use client";
import useProductFilters from "@/app/hooks/use-product-filter";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

interface Props {
  category?: string;
}

const ProductList = ({ category }: Props) => {
  const [filters] = useProductFilters();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({ category, ...filters })
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {data?.docs.map((product) => (
        <div key={product.id} className="p-4 bg-white border rounded-md">
          <h2 className="text-xl font-medium">{product.name}</h2>
          <p className="">${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

export const ProductListSkeleton = () => {
  return <div>Loading ...</div>;
};
