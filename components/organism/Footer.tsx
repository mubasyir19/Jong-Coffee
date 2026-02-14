import { clickersript } from "@/lib/font";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black">
      <div className="container mx-auto px-6 py-10">
        <div className="flex items-stretch justify-center">
          <div className="text-center">
            <h1 className={`${clickersript.className} text-4xl text-white`}>
              Jong <span className="text-accent">Coffee</span>
            </h1>
            <p className="mx-auto mt-3 w-4/5 text-sm text-white lg:w-1/2">
              Jl. Pd. Labu Raya No.1, RT.6/RW.6, Pd. Labu, Kec. Cilandak, Kota
              Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12450
            </p>
            <div className="mt-3 flex items-center justify-center gap-3">
              <div className="flex items-center gap-1">
                <Image
                  src={`/icons/instagram.png`}
                  width={100}
                  height={100}
                  alt="google"
                  className="size-5"
                />
                <p className="text-xs text-white">@jongcoffeeallday</p>
              </div>
              <div className="flex items-center gap-1">
                <Image
                  src={`/icons/tiktok.png`}
                  width={100}
                  height={100}
                  alt="google"
                  className="size-5"
                />
                <p className="text-xs text-white">@jongcoffeeallday</p>
              </div>
            </div>
            <p className="mt-6 text-sm font-medium text-white">
              Powered by Heyjong Pelita Indonesia
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
