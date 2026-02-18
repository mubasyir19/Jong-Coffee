import { userTable } from "@/db/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

// const client = drizzle(process.env.DATABASE_URL!);
const db = drizzle(process.env.DATABASE_URL!);

export async function POST(request: Request) {
  try {
    const { fullname, email, password } = await request.json();

    if (!fullname || !email || !password) {
      return NextResponse.json(
        {
          status: "BAD_REQUEST",
          code: 400,
          message: "Silakan isi dengan lengkap",
        },
        { status: 400 },
      );
    }

    // Cek email sudah terdaftar
    const existingUser = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));

    if (existingUser.length > 0) {
      return NextResponse.json(
        {
          status: "CONFLICT",
          code: 409,
          message: "Email sudah terdaftar",
        },
        { status: 409 },
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user baru
    const newUser = await db
      .insert(userTable)
      .values({
        fullname,
        email,
        password: hashedPassword,
      })
      .returning();

    return NextResponse.json(
      {
        status: "SUCCESS",
        code: 201,
        message: "Registrasi berhasil",
        data: {
          id: newUser[0].id,
          fullname: newUser[0].fullname,
          email: newUser[0].email,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      {
        status: "INTERNAL_SERVER_ERROR",
        code: 500,
        message: "Terjadi kesalahan saat registrasi",
      },
      { status: 500 },
    );
  }
}
