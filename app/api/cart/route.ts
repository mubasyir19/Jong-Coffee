import { NextResponse } from "next/server";
import { auth } from "@/app/auth";

export type CartItem = {
  id: string;
  name: string;
  imageUrl?: string;
  variant: string;
  price: number;
  quantity: number;
};

// In-memory cart storage keyed by user email (suitable for demo/dev only)
const carts = new Map<string, CartItem[]>();

export async function GET() {
  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    return new Response(null, { status: 401 });
  }
  const email = session.user.email as string;
  const items = carts.get(email) || [];
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    return new Response(null, { status: 401 });
  }

  const email = session.user.email as string;
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ message: "Bad request" }, { status: 400 });
  }

  const { id, name, imageUrl, variant, price, quantity } =
    body as Partial<CartItem>;

  if (
    !id ||
    !name ||
    !variant ||
    typeof price !== "number" ||
    typeof quantity !== "number"
  ) {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  const userCart = carts.get(email) || [];
  const existing = userCart.find((i) => i.id === id && i.variant === variant);
  if (existing) {
    existing.quantity += quantity;
  } else {
    userCart.push({ id, name, imageUrl, variant, price, quantity });
  }
  carts.set(email, userCart);

  return NextResponse.json({ items: userCart });
}
