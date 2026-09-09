import { useProducts } from "../../service/queries/product";
import { ErrorMessage, EmptyState, LoadingState } from "../ui/pageState";
import { ProductsCard } from "./productCard";

export function ProductList() {
  const { data: products = [], isPending, isError, refetch } = useProducts();

  if (isPending) {
    return <LoadingState message="Loading products..." />;
  }

  if (isError) {
    return (
      <ErrorMessage
        message="Failed to load products."
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        title="No products available"
        description="There are no products to display right now."
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
      {products.map((product) => (
        <ProductsCard key={product.id} product={product} />
      ))}
    </div>
  );
}
