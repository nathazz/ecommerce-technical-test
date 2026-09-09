import api from "../../lib/axios";
import type {
  AddCartItemPayload,
  CheckoutResponse,
  UpdateCartItemPayload,
} from "../../types/api";
import type { Cart } from "../../types/cart";

export async function getCart(): Promise<Cart> {
  const { data } = await api.get<Cart>("/carrinho");
  return data;
}

export async function addCartItem(payload: AddCartItemPayload): Promise<Cart> {
  const { data } = await api.post<Cart>("/carrinho/itens", payload);
  return data;
}

export async function updateCartItem(
  payload: UpdateCartItemPayload,
): Promise<Cart> {
  const { data } = await api.patch<Cart>(`/carrinho/itens/${payload.itemId}`, {
    quantity: payload.quantity,
  });

  return data;
}

export async function removeCartItem(itemId: string): Promise<Cart> {
  const { data } = await api.delete<Cart>(`/carrinho/itens/${itemId}`);
  return data;
}

export async function checkout(): Promise<CheckoutResponse> {
  const { data } = await api.post<CheckoutResponse>("/finalizar-compra");

  return data;
}
