 
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white">
      <div className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-5 sm:py-5">
        <div className="flex w-full flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-5">
          {/* Left Side */}
          <p className="max-w-full    px-2 py-1 text-xs leading-relaxed text-gray-700 sm:text-sm">
            বাজার দর — প্রতিদিনের পণ্যের দামের এক ঠিকানা।
          </p>

          {/* Right Side */}
          <p className="max-w-full   px-2 py-1 text-xs leading-relaxed text-gray-700 sm:text-right sm:text-sm">
            সকল দাম সংগ্রহ, বাজার অবস্থা এবং তথ্য নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
 
