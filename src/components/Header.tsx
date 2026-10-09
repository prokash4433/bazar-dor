import { Suspense } from "react";
import Image from "next/image";
import { connection } from "next/server";
import NavLinks from "./NavLinks";

const CurrentDate = async () => {
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });

  return (
    <p className="mt-1 min-h-6 font-bold text-black">
      {date}
    </p>
  );
};

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo + Website Name */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#05893E]">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold leading-tight text-gray-900">
              বাজার দর
            </h1>

            <Suspense fallback={<p className="mt-1 min-h-6" />}>
              <CurrentDate />
            </Suspense>
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <button className="rounded-lg border-2 border-gray-200 px-5 py-2 text-sm font-semibold text-black transition duration-200 hover:border-[#05893E] hover:text-[#05893E]">
            সাইন ইন
          </button>

          <button className="rounded-lg bg-[#05893E] px-5 py-2 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-[#047a36] hover:shadow-md">
            সাইন আপ
          </button>
        </div>
      </div>

      {/* Category Navigation */}
      {/* <NavLinks /> */}
      <Suspense fallback={<div className="h-10" />}>
        <NavLinks />
      </Suspense>
    </header>
  );
};

export default Header;