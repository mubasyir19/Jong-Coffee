import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: string;
  name: string;
  imageUrl?: string;
  variant: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const incoming = action.payload;
      const existing = state.items.find(
        (i) => i.id === incoming.id && i.variant === incoming.variant,
      );
      if (existing) {
        existing.quantity += incoming.quantity;
      } else {
        state.items.push({ ...incoming });
      }
    },
    removeItem: (
      state,
      action: PayloadAction<{ id: string; variant: string }>,
    ) => {
      state.items = state.items.filter(
        (i) =>
          !(i.id === action.payload.id && i.variant === action.payload.variant),
      );
    },
    increaseQty: (
      state,
      action: PayloadAction<{ id: string; variant: string }>,
    ) => {
      const it = state.items.find(
        (i) =>
          i.id === action.payload.id && i.variant === action.payload.variant,
      );
      if (it) it.quantity += 1;
    },
    decreaseQty: (
      state,
      action: PayloadAction<{ id: string; variant: string }>,
    ) => {
      const it = state.items.find(
        (i) =>
          i.id === action.payload.id && i.variant === action.payload.variant,
      );
      if (it) it.quantity = Math.max(1, it.quantity - 1);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, increaseQty, decreaseQty, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((s, i) => s + i.quantity, 0);
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((s, i) => s + i.price * i.quantity, 0);
