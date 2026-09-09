import { useQuery } from "@tanstack/react-query";
import { getProduct, getProducts } from "../request/product";

export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  detail: (productId: string) =>
    [...productKeys.all, "detail", productId] as const,
};

export function useProducts() {
  return useQuery({
    queryKey: productKeys.lists(),
    queryFn: getProducts,
    staleTime: 0,
    refetchInterval: 10_000,
  });
}

export function useProduct(productId: string) {
  return useQuery({
    queryKey: productKeys.detail(productId),
    queryFn: () => getProduct(productId),
    enabled: Boolean(productId),
    staleTime: 0,
    refetchInterval: 10_000,
  });
}
