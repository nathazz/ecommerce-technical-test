export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string | null;
}

export interface AddCartItemPayload {
  productId: string;
  quantity: number;
  reservationDate?: string;
}

export interface UpdateCartItemPayload {
  itemId: string;
  quantity: number;
}

export interface CheckoutItem {
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
  reservationDate: string | null;
}

export interface CheckoutResponse {
  orderId: string;
  status: string;
  total: number;
  itens: CheckoutItem[];
  message: string;
}
