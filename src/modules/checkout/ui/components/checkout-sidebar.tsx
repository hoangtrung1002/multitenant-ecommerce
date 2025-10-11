import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { CircleXIcon } from "lucide-react";

interface Props {
  total: number;
  onCheckout: () => void;
  isCanceled?: boolean;
  isPending?: boolean;
}
const CheckoutSidebar = ({
  onCheckout,
  total,
  isCanceled,
  isPending,
}: Props) => {
  return (
    <div className="flex flex-col overflow-hidden bg-white border rounded-md">
      <div className="flex items-center justify-between p-4 border-b">
        <h4 className="text-lg font-medium">Total</h4>
        <p className="text-lg font-medium">{formatCurrency(total)}</p>
      </div>
      <div className="flex items-center justify-center p-4">
        <Button
          variant="elevated"
          disabled={isPending}
          onClick={onCheckout}
          size="lg"
          className="w-full text-base text-white bg-primary hover:bg-pink-400 hover:text-primary"
        >
          Checkout
        </Button>
      </div>
      {isCanceled && (
        <div className="flex items-center justify-center p-4 border-t">
          <div className="flex items-center w-full px-4 py-3 font-medium bg-red-100 border-red-400 rounded">
            <div className="flex items-center">
              <CircleXIcon className="mr-2 text-red-100 size-6 fill-red-500" />
              <span>Checkout failed. Please try again.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutSidebar;
