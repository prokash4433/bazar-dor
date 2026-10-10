import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { connection } from "next/server";
import NavLinks from "./NavLinks";
import UserInfo from "./UserInfo";

const CurrentDate = async () => {
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });

  return (<p className="mt-1 text-[11px] font-semibold leading-5 text-gray-600 sm:text-xs">
    {date} </p>
  );
};

const Header = () => {
  return (<header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
    {/* Main Header */} <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3 py-2.5 sm:gap-4 sm:px-5 sm:py-3 lg:px-6">

       
      {/* Logo + Website Name */}
      <Link
        href="/"
        aria-label="বাজার দর হোম পেজ"
        className="group -ml-1 flex min-w-0 shrink items-center gap-2 rounded-xl p-1.5 transition-colors duration-200   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#05893E] sm:gap-3 sm:p-2"
      >
        {/* Logo */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#05893E] shadow-sm transition duration-200 group-hover:scale-105 group-hover:shadow-md sm:h-12 sm:w-12">
          <Image
            src="/logo-icon.png"
            alt="বাজার দর logo"
            width={32}
            height={32}
            priority
            className="h-7 w-7 object-contain sm:h-8 sm:w-8"
          />
        </div>

        {/* Website Name + Date */}
        <div className="min-w-0">
          <h1 className="whitespace-nowrap text-base font-extrabold leading-tight text-gray-900 transition-colors duration-200 group-hover:text-[#05893E] sm:text-xl lg:text-2xl">
            বাজার দর
          </h1>

          <Suspense fallback={<p className="mt-1 min-h-5" />}
          >
            <CurrentDate />
          </Suspense>
        </div>
      </Link>

      
      {/* Authentication Buttons */}
      <UserInfo/>
    
    
    
    </div>

    {/* Category Navigation */}
    <div className="w-full">
      <Suspense
        fallback={
          <div className="h-10 w-full animate-pulse bg-gray-50" />
        }
      >
        <NavLinks />
      </Suspense>
    </div>
  </header>
 

);
};

export default Header;
