import { cn, formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  isLast?: boolean;
  imageUrl?: string | null;
  name: string;
  productUrl: string;
  tenantUrl: string;
  tenantName: string;
  price: number;
  onRemove: () => void;
}

const CheckoutItem = ({
  name,
  onRemove,
  price,
  productUrl,
  tenantName,
  tenantUrl,
  imageUrl,
  isLast,
}: Props) => {
  return (
    <div
      className={cn(
        "grid grid-cols-[8.5rem_1fr_auto] gap-4 pr-4 border-b",
        isLast && "border-b-0"
      )}
    >
      <div className="overflow-hidden border-r">
        <div className="relative h-full aspect-square">
          <Image
            src={imageUrl || "/placeholder.png"}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex-col justify-between py-4">
        <div>
          <Link href={productUrl}>
            <h4 className="font-bold underline">{name}</h4>
          </Link>
          <Link href={tenantUrl}>
            <p className="font-medium underline">{tenantName}</p>
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-between py-4">
        <p className="font-medium">{formatCurrency(price)}</p>
        <button
          className="font-medium underline cursor-pointer"
          type="button"
          onClick={onRemove}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CheckoutItem;
