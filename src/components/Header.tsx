 
import Image from "next/image";
import NavLinks from "./NavLinks";
 

export const dynamic = "force-dynamic";

const Header = () => {
          const date = new Date().toLocaleDateString("bn-BD", {
                    dateStyle: "full",
          });


  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

        {/* Left Side - Logo + Website Name */}
        <div className="flex items-center gap-3">

          {/* Logo Box */}
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#05893E]">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>

          {/* Website Info */}
          <div>
            <h1 className="text-2xl font-bold leading-tight text-gray-900">
              বাজার দর
            </h1>

          <p className="mt-1 text-bold text-black">{date}</p>
          </div>

        </div>

        {/* Right Side - Auth Buttons */}
        <div className="flex items-center gap-3">

          {/* Sign In */}
          <button
            className="rounded-lg border-2 border-gray-200 px-5 py-2 text-sm font-semibold text-black transition duration-200 hover:border-[#05893E] hover:text-[#05893E]"
          >
            সাইন ইন
          </button>

          {/* Sign Up */}
          <button
            className="rounded-lg bg-[#05893E] px-5 py-2 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-[#047a36] hover:shadow-md"
          >
            সাইন আপ
          </button>

        </div>
      </div>

      <NavLinks />
    </header>
  );
};

export default Header;
 