import { Link, useLocation } from "react-router-dom";
import type { CheckoutResponse } from "../types/api";
import { formatReservationDate } from "../utils/formatReservationDate";

export function SuccessPage() {
  const location = useLocation();
  const order = location.state as CheckoutResponse | null;

  if (!order) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-2xl px-4 py-16">
          <div className="border border-gray-200 bg-white p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-950">
              Pedido não encontrado
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Não foi possível carregar os detalhes do pedido.
            </p>

            <Link
              to="/"
              className="mt-6 inline-flex bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Voltar para produtos
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">
            ✓
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-950">
            Compra concluída!
          </h1>

          <p className="mt-3 text-sm text-gray-500">{order.message}</p>
        </div>

        <div className="mt-8 border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-5 py-4 sm:px-6">
            <h2 className="text-base font-bold text-gray-950">
              Detalhes do pedido
            </h2>
          </div>

          <div className="space-y-3 p-5 text-sm sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <span className="text-gray-500">Pedido</span>

              <span className="max-w-[70%] break-all text-right font-medium text-gray-900">
                {order.orderId}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500">Status</span>

              <span className="font-medium capitalize text-green-700">
                {order.status}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-5 py-4 sm:px-6">
            <h2 className="text-base font-bold text-gray-950">
              Itens do pedido
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {order.itens.map((item, index) => (
              <div
                key={`${item.productName}-${index}`}
                className="px-5 py-5 sm:px-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900">
                      {item.productName}
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

                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      R$ {item.subtotal.toFixed(2)}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      R$ {item.price.toFixed(2)} / unidade
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 px-5 py-5 sm:px-6">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900">Total</span>

              <span className="text-2xl font-bold tracking-tight text-gray-950">
                R$ {order.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <Link
          to="/"
          className="mt-6 flex w-full items-center justify-center bg-gray-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Continuar comprando
        </Link>
      </div>
    </main>
  );
}
