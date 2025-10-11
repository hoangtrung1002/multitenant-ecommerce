import { Button } from "@/components/ui/button";
import { cn, generateTenantURL } from "@/lib/utils";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import useCart from "../../hooks/use-cart";

interface Props {
  className?: string;
  hideIfEmpty?: boolean;
  tenantSlug: string;
}

const CheckoutButton = ({ tenantSlug, className, hideIfEmpty }: Props) => {
  const { totalItems } = useCart(tenantSlug);

  if (hideIfEmpty && totalItems === 0) return null;

  return (
    <Button variant="elevated" asChild className={cn("bg-white", className)}>
      <Link href={`${generateTenantURL(tenantSlug)}/checkout`}>
        <ShoppingCartIcon /> {totalItems > 0 ? totalItems : ""}
      </Link>
    </Button>
  );
};

export default CheckoutButton;
