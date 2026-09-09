import { useState } from "react";
import type { ChangeEvent } from "react";
import {
  useRemoveCartItem,
  useUpdateCartItem,
} from "../../service/queries/cart";
import type { CartItem } from "../../types/cart";
import { Button } from "../ui/button";
import { getApiErrorMessage } from "../../helpers/getApiError";

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const [quantity, setQuantity] = useState(item.quantity);

  const updateMutation = useUpdateCartItem();
  const removeMutation = useRemoveCartItem();

  const hasQuantityChanged = quantity !== item.quantity;

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value === "") {
      return;
    }

    const parsedValue = Number(value);

    if (!Number.isInteger(parsedValue) || parsedValue < 1) {
      return;
    }

    setQuantity(parsedValue);
  };

  const handleUpdate = () => {
    if (!hasQuantityChanged) {
      return;
    }

    updateMutation.mutate({
      itemId: item.id,
      quantity,
    });
  };

  return (
    <article className="flex gap-3 border-b border-gray-200 p-4 last:border-b-0 sm:gap-5 sm:p-5">
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-md bg-gray-100 sm:h-28 sm:w-28">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-gray-400">
            Sem imagem
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 sm:text-base">
              {item.name}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              R$ {item.price.toFixed(2)} cada
            </p>

            {item.reservationDate && (
              <p className="mt-1 text-xs text-gray-500">
                Reservado: {new Date(item.reservationDate).toLocaleDateString()}
              </p>
            )}
          </div>

          <p className="shrink-0 text-sm font-bold text-gray-900 sm:text-base">
            R$ {item.subtotal.toFixed(2)}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div className="flex h-9 items-center border border-gray-300">
            <input
              aria-label={`Quantity for ${item.name}`}
              type="number"
              min={1}
              value={quantity}
              onChange={handleQuantityChange}
              className="h-full w-14 border-0 bg-transparent px-2 text-center text-sm outline-none"
            />
          </div>

          <Button
            type="button"
            className="cursor-pointer"
            onClick={handleUpdate}
            loading={updateMutation.isPending}
            disabled={!hasQuantityChanged || updateMutation.isPending}
          >
            Atualizar
          </Button>

          <button
            type="button"
            onClick={() => removeMutation.mutate(item.id)}
            disabled={removeMutation.isPending}
            className="cursor-pointer px-2 py-2 text-xs font-medium text-gray-500 transition hover:text-red-600 disabled:opacity-50"
          >
            {removeMutation.isPending ? "Removendo..." : "Remover"}
          </button>
        </div>

        {updateMutation.isError && (
          <p className="mt-2 text-xs text-red-600">
            {getApiErrorMessage(
              updateMutation.error,
              "Falha ao tentar atualizar o item.",
            )}
          </p>
        )}

        {removeMutation.isError && (
          <p className="mt-2 text-xs text-red-600">
            Falha ao tentar remover o item.
          </p>
        )}
      </div>
    </article>
  );
}
