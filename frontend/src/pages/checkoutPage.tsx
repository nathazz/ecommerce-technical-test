import { Link, useNavigate } from "react-router-dom";

import { Button } from "../components/ui/button";
import {
  EmptyState,
  ErrorMessage,
  LoadingState,
} from "../components/ui/pageState";
import { useCart, useCheckout } from "../service/queries/cart";
import { getApiErrorMessage } from "../helpers/getApiError";
import { formatReservationDate } from "../utils/formatReservationDate";

export function CheckoutPage() {
  const navigate = useNavigate();

  const {
    data: cart,
    isPending: isCartPending,
    isError: isCartError,
  } = useCart();

  const checkoutMutation = useCheckout();

  if (isCartPending) {
    return <LoadingState message="Carregando seu carrinho..." />;
  }

  if (isCartError) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
          <ErrorMessage message="Não foi possível carregar seu carrinho." />
        </div>
      </main>
    );
  }

  if (!cart || cart.cartItems.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
          <EmptyState
            title="Seu carrinho está vazio"
            description="Adicione produtos ao carrinho antes de finalizar a compra."
          />

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Procurar produtos
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

  const onSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    checkoutMutation.mutate(undefined, {
      onSuccess: (order) => {
        navigate("/sucesso", {
          replace: true,
          state: order,
        });
      },
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mt-6 text-center sm:mt-8">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
            Finalização
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
            Finalizar compra
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Revise seu pedido e confirme a compra.
          </p>
        </div>

        <div className="mt-6 border border-gray-200 bg-white sm:mt-8">
          <div className="border-b border-gray-200 px-5 py-4 sm:px-6">
            <h2 className="text-base font-bold text-gray-950">
              Resumo do pedido
            </h2>
          </div>

          <div className="p-5 sm:p-6">
            <div className="space-y-5">
              {cart.cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="h-16 w-16 shrink-0 overflow-hidden bg-gray-100">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[10px] text-gray-400">
                        Sem imagem
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm font-medium text-gray-900">
                      {item.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {item.quantity}{" "}
                      {item.quantity === 1 ? "unidade" : "unidades"}
                    </p>

                    {item.reservationDate && (
                      <p className="mt-1 text-xs font-medium text-gray-700">
                        Reserva: {formatReservationDate(item.reservationDate)}
                      </p>
                    )}
                  </div>

                  <p className="shrink-0 text-sm font-semibold text-gray-900">
                    R$ {item.subtotal.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-gray-200 pt-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Itens</span>
                <span className="font-medium text-gray-900">{itemCount}</span>
              </div>

              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-gray-500">Frete</span>
                <span className="font-medium text-green-600">Grátis</span>
              </div>

              <div className="mt-5 flex items-end justify-between gap-4 border-t border-gray-200 pt-5">
                <span className="font-semibold text-gray-900">Total</span>

                <span className="text-2xl font-bold tracking-tight text-gray-950">
                  R$ {cart.total.toFixed(2)}
                </span>
              </div>
            </div>

            {checkoutMutation.isError && (
              <div className="mt-5 border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm font-medium leading-5 text-red-700">
                  {getApiErrorMessage(
                    checkoutMutation.error,
                    "Não foi possível finalizar a compra. Tente novamente.",
                  )}
                </p>
              </div>
            )}

            <form onSubmit={onSubmit}>
              <Button className="cursor-pointer mt-3.5" type="submit">
                Finalizar compra
              </Button>
            </form>

            <p className="mt-4 text-center text-[11px] leading-5 text-gray-400">
              Ao finalizar, seu pedido será processado imediatamente.
            </p>
          </div>
        </div>

        <Link
          to="/carrinho"
          className="mt-4 block text-center text-sm font-medium text-gray-500 transition hover:text-gray-950"
        >
          ← Voltar para o carrinho
        </Link>
      </div>
    </main>
  );
}
