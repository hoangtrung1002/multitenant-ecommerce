"use client";

import useTRPCSession from "@/app/hooks/use-trpc-session";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import useCart from "../../hooks/use-cart";
import { generateTenantURL } from "@/lib/utils";
import CheckoutItem from "../components/checkout-item";
import CheckoutSidebar from "../components/checkout-sidebar";
import { InboxIcon, LoaderIcon } from "lucide-react";

interface Props {
  tenantSlug: string;
}

const CheckoutView = ({ tenantSlug }: Props) => {
  const { productIds, clearAllCarts, removeProduct } = useCart(tenantSlug);
  const { trpc } = useTRPCSession();
  const { data, error, isLoading } = useQuery(
    trpc.checkout.getProducts.queryOptions({ ids: productIds })
  );

  useEffect(() => {
    if (error?.data?.code === "NOT_FOUND") {
      clearAllCarts();
      toast.warning("Invalid products found, cart cleared");
    }
  }, [error, clearAllCarts]);

  if (isLoading)
    return (
      <div className="px-4 pt-4 lg:pt-16 lg:px-12">
        <div className="flex flex-col items-center justify-center w-full p-8 bg-white border border-black border-dashed rounded-lg gap-y-4">
          <LoaderIcon className="text-muted-foreground animate-spin" />
        </div>
      </div>
    );

  if (data?.totalDocs === 0)
    return (
      <div className="px-4 pt-4 lg:pt-16 lg:px-12">
        <div className="flex flex-col items-center justify-center w-full p-8 bg-white border border-black border-dashed rounded-lg gap-y-4">
          <InboxIcon />
          <p className="text-base font-medium">No products found</p>
        </div>
      </div>
    );

  return (
    <div className="px-4 pt-4 lg:pt-16 lg:px-12">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="overflow-hidden bg-white border rounded-md">
            {data?.docs.map((product, index) => (
              <CheckoutItem
                key={product.id}
                isLast={index === data.docs.length - 1}
                imageUrl={product.image?.url}
                name={product.name}
                productUrl={`${generateTenantURL(product.tenant.slug)}/products/${product.id}`}
                tenantUrl={generateTenantURL(product.tenant.slug)}
                tenantName={product.tenant.name}
                price={product.price}
                onRemove={() => removeProduct(product.id)}
              />
            ))}
          </div>
        </div>
        <div className="lg:col-span-3">
          <CheckoutSidebar
            total={data?.totalPrice || 0}
            onCheckout={() => {}}
            isCanceled={false}
            isPending={false}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;
