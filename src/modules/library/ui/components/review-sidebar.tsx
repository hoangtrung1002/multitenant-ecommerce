import useTRPCSession from "@/app/hooks/use-trpc-session";
import { useSuspenseQuery } from "@tanstack/react-query";
import ReviewForm from "./review-form";

interface Props {
  productId: string;
}

const ReviewSidebar = ({ productId }: Props) => {
  const { trpc } = useTRPCSession();
  const { data } = useSuspenseQuery(
    trpc.review.getOne.queryOptions({ productId })
  );
  return <ReviewForm productId={productId} initialData={data} />;
};

export default ReviewSidebar;
