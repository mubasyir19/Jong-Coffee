export type CartItem = {
  id: string;
  name: string;
  imageUrl?: string;
  variant: string;
  price: number;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

export interface InputCheckout {
  name: string;
  email: string;
  phoneNumber: string;
  items: CartItem[];
  totalPrice: number;
}
