import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

import { Button } from "../components/ui/button";
import { ErrorMessage, LoadingState } from "../components/ui/pageState";
import { useAddCartItem } from "../service/queries/cart";
import { useProduct } from "../service/queries/product";
import { getApiErrorMessage } from "../helpers/getApiError";
import { AddCartItemForm, addCartItemSchema } from "../types/schemas/product";

export function ProductPage() {
  const { id = "" } = useParams();

  const { data: product, isPending, isError } = useProduct(id);
  const addCartMutation = useAddCartItem();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCartItemForm>({
    resolver: zodResolver(addCartItemSchema),
    defaultValues: {
      quantity: 1,
      reservationDate: "",
    },
  });

  if (isPending) {
    return <LoadingState message="Loading product..." />;
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <ErrorMessage message="Failed to load product." />
        </div>
      </main>
    );
  }

  const isAvailable = product.stock > 0;

  const onSubmit = (values: AddCartItemForm) => {
    addCartMutation.mutate({
      productId: product.id,
      quantity: values.quantity,
      reservationDate: values.reservationDate || undefined,
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-3 py-5 sm:px-6 sm:py-8 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
        >
          <span>←</span>
          Voltar para os produtos
        </Link>

        <div className="mt-5 overflow-hidden border border-gray-200 bg-white sm:mt-8 sm:rounded-2xl">
          <div className="grid lg:grid-cols-2">
            <div className="flex items-center justify-center border-b border-gray-200 bg-white lg:border-b-0 lg:border-r">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-55 w-auto max-w-full object-contain sm:h-75 lg:h-150"
                />
              ) : (
                <div className="flex h-55 w-full items-center justify-center text-sm text-gray-400 sm:h-75 lg:h-150">
                  No image
                </div>
              )}
            </div>

            <div className="flex flex-col p-5 sm:p-8 lg:p-10 xl:p-12">
              <div>
                <span className="inline-flex bg-gray-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-600">
                  Product
                </span>

                <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl lg:text-4xl">
                  {product.name}
                </h1>

                <p className="mt-4 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
                  {product.description}
                </p>
              </div>

              <div className="mt-6 border-y border-gray-100 py-5 sm:mt-8 sm:py-6">
                <p className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                  R$ {product.price.toFixed(2)}
                </p>

                <div className="mt-2.5 flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      isAvailable ? "bg-green-500" : "bg-red-500"
                    }`}
                  />

                  <span
                    className={`text-sm font-medium ${
                      isAvailable ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {isAvailable
                      ? `${product.stock} unidades disponíveis`
                      : "Fora do estoque"}
                  </span>
                </div>
              </div>

              {isAvailable ? (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-6 space-y-5 sm:mt-8 sm:space-y-6"
                >
                  <div>
                    <label
                      htmlFor="quantity"
                      className="mb-2 block text-sm font-semibold text-gray-900"
                    >
                      Quantity
                    </label>

                    <input
                      id="quantity"
                      type="number"
                      min={1}
                      max={product.stock}
                      {...register("quantity", {
                        valueAsNumber: true,
                      })}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 sm:rounded-xl sm:px-4"
                    />

                    {errors.quantity && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.quantity.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="reservationDate"
                      className="mb-2 block text-sm font-semibold text-gray-900"
                    >
                      Reservation date
                      <span className="ml-2 font-normal text-gray-400">
                        Optional
                      </span>
                    </label>

                    <input
                      id="reservationDate"
                      type="date"
                      {...register("reservationDate")}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 sm:rounded-xl sm:px-4"
                    />
                  </div>

                  <Button
                    type="submit"
                    loading={addCartMutation.isPending}
                    className="w-full cursor-pointer rounded-lg py-3 text-sm sm:rounded-xl sm:py-3.5 sm:text-base"
                  >
                    Adicionar no carrinho
                  </Button>

                  {addCartMutation.isSuccess && (
                    <div className="border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                      Produto adicionado ao carrinho com sucesso!
                    </div>
                  )}
                  {addCartMutation.isError && (
                    <div className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                      {getApiErrorMessage(
                        addCartMutation.error,
                        "Falha ao adicionar o produto ao carrinho.",
                      )}
                    </div>
                  )}
                </form>
              ) : (
                <div className="mt-6 bg-gray-100 p-4 text-center text-sm font-medium text-gray-500 sm:mt-8 sm:rounded-xl">
                  Este produto não está disponível
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
