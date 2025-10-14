import { StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  id: string;
  name: string;
  imageUrl?: string | null;
  tenantSlug: string;
  tenantImageUrl?: string | null;
  reviewRating: number;
  reviewCount: number;
}

const ProductCard = ({
  tenantSlug,
  id,
  name,
  reviewCount,
  reviewRating,
  tenantImageUrl,
  imageUrl,
}: Props) => {
  return (
    <Link prefetch href={`/library/${id}`}>
      <div className="flex flex-col h-full overflow-hidden bg-white border rounded-md hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow">
        <div className="relative aspect-square">
          <Image
            alt={name}
            fill
            src={imageUrl || "/placeholder.png"}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col flex-1 gap-3 p-4 border-y">
          <h2 className="text-lg font-medium line-clamp-4">{name}</h2>
          <div className="flex items-center gap-2">
            {tenantImageUrl && (
              <Image
                alt={tenantSlug}
                src={tenantImageUrl}
                width={16}
                height={16}
                className="rounded-full border shrink-0 size-[16px]"
              />
            )}
            <p className="text-sm font-medium underline">{tenantSlug}</p>
          </div>
          {reviewCount > 0 && (
            <div className="flex items-center gap-1">
              <StarIcon className="size-3.5 fill-black" />
              <p className="text-sm font-medium">
                {reviewRating} ({reviewCount})
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

export const ProductSkeleton = () => {
  return (
    <div className="w-full rounded-lg aspect-3/4 bg-neutral-200 animate-pulse" />
  );
};
