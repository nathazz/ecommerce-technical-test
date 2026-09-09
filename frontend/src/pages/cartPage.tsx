import { Link } from "react-router-dom";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ShoppingCart01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { CartItemRow } from "../components/cart/cartItems";

import { ErrorMessage, LoadingState } from "../components/ui/pageState";
import { useCart } from "../service/queries/cart";

export function CartPage() {
  const { data: cart, isPending, isError, refetch } = useCart();

  if (isPending) {
    return <LoadingState message="Loading cart..." />;
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <ErrorMessage
            message="Failed to load cart."
            onRetry={() => {
              void refetch();
            }}
          />
        </div>
      </main>
    );
  }

  if (!cart || cart.cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <HugeiconsIcon
                icon={ShoppingCart01Icon}
                size={28}
                strokeWidth={1.8}
                className="text-gray-500"
              />
            </div>

            <h1 className="mt-5 text-2xl font-bold tracking-tight text-gray-950">
              Seu carrinho está vazio
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Você não adicionou nada no seu carrinho ainda.
            </p>

            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={17} strokeWidth={2} />
              Continue comprando
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const itemCount = cart.cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white">
                <HugeiconsIcon
                  icon={ShoppingCart01Icon}
                  size={19}
                  strokeWidth={2}
                />
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                Shopping Cart
              </h1>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-gray-600 transition hover:text-gray-950"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={16} strokeWidth={2} />
            Continue comprando
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
          <section className="min-w-0 overflow-hidden border border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-4 py-3 sm:px-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Cart items
              </p>
            </div>

            {cart.cartItems.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}
          </section>

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
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={17}
                  strokeWidth={2}
                />
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
