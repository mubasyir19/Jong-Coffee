import { signIn } from "@/app/auth";
import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { clickersript } from "@/lib/font";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="h-screen bg-[url('/images/login.jpg')] bg-cover bg-center">
      <div className="flex h-full w-full flex-col items-center justify-center bg-black/50 p-6">
        <div className="mx-auto h-fit w-full rounded-lg border border-gray-700 bg-black/20 px-4 py-6 backdrop-blur-lg md:w-1/2 lg:w-2/6">
          <div className="text-center">
            <h1
              className={`text-4xl font-semibold text-white ${clickersript.className}`}
            >
              Selamat Datang
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Silakan login terlebih dahulu{" "}
            </p>
          </div>
          <form className="mt-5 space-y-4">
            <div className="space-y-2">
              <FieldLabel htmlFor="email" className="text-white">
                Email Address
              </FieldLabel>
              <Input
                type="email"
                name="email"
                placeholder="jhondoe@mail.com"
                className="placeholder:text-sm"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password" className="text-white">
                  Password
                </FieldLabel>
                <Link href={`#`}>
                  <p className="text-accent text-xs md:text-sm">
                    Forgot Password?
                  </p>
                </Link>
              </div>
              <Input
                type="password"
                name="password"
                placeholder="******"
                className="placeholder:text-sm"
              />
            </div>
            <div className="">
              <Button variant={"thrid"} size={"lg"} className="w-full">
                Sign In to Your Account
              </Button>
            </div>
          </form>
          <div className="my-5 text-center">
            <p className="grow text-sm text-gray-400">Atau login dengan</p>
          </div>
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/" });
            }}
          >
            <button
              type="submit"
              className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-gray-700 bg-white/10 px-6 backdrop-blur-3xl transition-all hover:bg-white/20"
            >
              <Image
                src={`/icons/google.svg`}
                width={20}
                height={20}
                alt="google"
                className="size-5"
              />
              <p className="text-white">Google</p>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
