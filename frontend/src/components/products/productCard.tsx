import { Link } from "react-router-dom";
import type { Product } from "../../types/api";

interface ProductsCardProps {
  product: Product;
}

export function ProductsCard({ product }: ProductsCardProps) {
  const isAvailable = product.stock > 0;

  return (
    <article className="group flex min-w-0 flex-col bg-white">
      <Link
        to={`/produtos/${product.id}`}
        className="relative block overflow-hidden rounded-md bg-gray-100"
      >
        <div className="aspect-square">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-gray-400">
              Sem imagem
            </div>
          )}
        </div>

        {isAvailable && product.stock <= 5 && (
          <span className="absolute left-2 top-2 bg-white px-2 py-1 text-[10px] font-semibold text-orange-600 shadow-sm sm:left-3 sm:top-3 sm:text-[11px]">
            Poucos!
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col pt-3">
        <Link
          to={`/produtos/${product.id}`}
          className="line-clamp-2 min-h-10 text-sm leading-5 text-gray-800 transition hover:text-gray-500"
        >
          {product.name}
        </Link>

        <p className="mt-1 min-h-8 line-clamp-2 text-xs leading-4 text-gray-500">
          {product.description}
        </p>

        <div className="mt-3">
          <p className="text-lg font-bold tracking-tight text-gray-950 sm:text-xl">
            R$ {product.price.toFixed(2)}
          </p>

          {isAvailable ? (
            <p className="mt-1 text-xs font-medium text-green-600">
              No estoque
            </p>
          ) : (
            <p className="mt-1 text-xs font-medium text-red-500">
              Fora do estoque
            </p>
          )}
        </div>

        <Link
          to={`/produtos/${product.id}`}
          className="mt-3 block border border-gray-900 px-2 py-2.5 text-center text-xs font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white sm:px-3 sm:text-sm"
        >
          Ver produto
        </Link>
      </div>
    </article>
  );
}
