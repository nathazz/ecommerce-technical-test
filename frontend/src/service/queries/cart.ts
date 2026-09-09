import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCartItem,
  checkout,
  getCart,
  removeCartItem,
  updateCartItem,
} from "../request/cart";
import type {
  AddCartItemPayload,
  UpdateCartItemPayload,
} from "../../types/api";

export const cartKeys = {
  all: ["cart"] as const,
};

export function useCart() {
  return useQuery({
    queryKey: cartKeys.all,
    queryFn: getCart,
    staleTime: 30_000,
  });
}

export function useAddCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddCartItemPayload) => addCartItem(payload),
    onSuccess: (cart) => {
      queryClient.setQueryData(cartKeys.all, cart);
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateCartItemPayload) => updateCartItem(payload),
    onSuccess: (cart) => {
      queryClient.setQueryData(cartKeys.all, cart);
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) => removeCartItem(itemId),
    onSuccess: (cart) => {
      queryClient.setQueryData(cartKeys.all, cart);
    },
  });
}

export function useCheckout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkout,
    onSuccess: () => {
      queryClient.setQueryData(cartKeys.all, {
        cartItems: [],
        total: 0,
      });
    },
  });
}
