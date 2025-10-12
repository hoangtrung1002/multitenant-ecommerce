"use client";

import useTRPCSession from "@/app/hooks/use-trpc-session";
import { generateTenantURL } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { InboxIcon, LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import useCart from "../../hooks/use-cart";
import useCheckoutStates from "../../hooks/use-checkout-states";
import CheckoutItem from "../components/checkout-item";
import CheckoutSidebar from "../components/checkout-sidebar";

interface Props {
  tenantSlug: string;
}

const CheckoutView = ({ tenantSlug }: Props) => {
  const router = useRouter();
  const [states, setStates] = useCheckoutStates();
  const { productIds, removeProduct, clearCart } = useCart(tenantSlug);
  const { trpc } = useTRPCSession();
  const { data, error, isLoading } = useQuery(
    trpc.checkout.getProducts.queryOptions({ ids: productIds })
  );
  const purchase = useMutation(
    trpc.checkout.purchase.mutationOptions({
      onMutate: () => {
        setStates({ success: false, cancel: false });
      },
      onSuccess: (data) => {
        window.location.href = data.url;
      },
      onError: (error) => {
        if (error.data?.code === "UNAUTHORIZED") {
          // TODO: Modify when subdomains enabled
          router.push("/sign-in");
        }
        toast.error(error.message);
      },
    })
  );

  useEffect(() => {
    if (states.success) {
      setStates({ success: false, cancel: false });
      clearCart();
      // TODO: invalidate library
      router.push("/products");
    }
  }, [states.success, clearCart, router, setStates]);

  useEffect(() => {
    if (error?.data?.code === "NOT_FOUND") {
      clearCart();
      toast.warning("Invalid products found, cart cleared");
    }
  }, [error, clearCart]);

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
            onPurchase={() => purchase.mutate({ productIds, tenantSlug })}
            isCanceled={states.cancel}
            disabled={purchase.isPending}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;
