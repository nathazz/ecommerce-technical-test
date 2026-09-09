import { useCart } from "../service/queries/cart";

export function useCartCount(): number {
  const { data: cart } = useCart();

  return cart?.cartItems.reduce((total, item) => total + item.quantity, 0) ?? 0;
}
