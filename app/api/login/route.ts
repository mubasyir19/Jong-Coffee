import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const db = drizzle(process.env.DATABASE_URL!);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          status: "BAD_REQUEST",
          code: 400,
          message: "Silakan isi dengan lengkap",
        },
        { status: 400 },
      );
    }

    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));

    if (!user) {
      return NextResponse.json(
        {
          status: "NOT_FOUND",
          code: 404,
          message: "Akun tidak ditemukan",
        },
        { status: 404 },
      );
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json(
        {
          status: "UNAUTHORIZED",
          code: 401,
          message: "Password salah",
        },
        { status: 401 },
      );
    }

    const payloadUser = {
      id: user.id,
      name: user.fullname,
      email: user.email,
    };

    const ONE_HOUR_IN_SECONDS = 3600;

    const jwtToken = jwt.sign(payloadUser, process.env.JWT_SECRET as string, {
      expiresIn: ONE_HOUR_IN_SECONDS,
    });

    const response = NextResponse.json({
      status: "SUCCESS",
      message: "Login berhasil",
      data: { id: user.id, email: user.email },
    });

    response.cookies.set("auth_token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        status: "INTERNAL_SERVER_ERROR",
        code: 500,
        message: "Terjadi kesalahan saat login",
      },
      { status: 500 },
    );
  }
}
