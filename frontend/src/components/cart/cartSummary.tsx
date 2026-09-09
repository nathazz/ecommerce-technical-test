import { Link } from "react-router-dom";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import type { Cart } from "../../types/cart";

interface CartSummaryProps {
  cart: Cart;
}

export function CartSummary({ cart }: CartSummaryProps) {
  const itemCount = cart.cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <aside className="space-y-3 lg:sticky lg:top-6">
      <div className="border border-gray-200 bg-white p-5 sm:p-6">
        <h2 className="text-lg font-bold text-gray-950">Order summary</h2>

        <div className="mt-5 space-y-3 border-b border-gray-200 pb-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Items</span>

            <span className="font-medium text-gray-900">{itemCount}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Shipping</span>

            <span className="font-medium text-green-600">Free</span>
          </div>
        </div>

        <div className="mt-5 flex items-end justify-between gap-4">
          <span className="font-semibold text-gray-900">Total</span>

          <span className="text-2xl font-bold tracking-tight text-gray-950">
            R$ {cart.total.toFixed(2)}
          </span>
        </div>

        <Link
          to="/checkout"
          className="mt-6 flex w-full items-center justify-center gap-2 bg-gray-950 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-gray-800"
        >
          Continue para o checkout
          <HugeiconsIcon icon={ArrowRight01Icon} size={17} strokeWidth={2} />
        </Link>
      </div>
    </aside>
  );
}
