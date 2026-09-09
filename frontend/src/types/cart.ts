export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string | null;
  reservationDate: string | null;
  subtotal: number;
}

export interface Cart {
  cartItems: CartItem[];
  total: number;
}
