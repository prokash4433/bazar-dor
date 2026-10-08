 
"use client";

import Image from "next/image";

const BannerPage = () => {
  // বাংলাদেশের তারিখ অনুযায়ী আজকের দিন দেখাবে
 

  return (
            <section className="rounded-3xl border border-gray-200 bg-[#f8fbf9] px-5 py-6 sm:px-8 sm:py-8 mx-auto max-w-7xl mt-6">
      <div className="flex flex-col-reverse items-center justify-between gap-8 md:flex-row">

        {/* Left Content */}
        <div className="w-full md:max-w-[620px]">

          {/* Dynamic Bangladesh Date */}
          <div className="mb-3 inline-flex rounded-md border border-green-500 p-[3px]">
            {/* <span className="rounded-sm bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
              {today}
            </span> */}
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold leading-tight text-[#202923] sm:text-3xl lg:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-[580px] text-sm leading-6 text-gray-600 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
            দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Button */}
          <button
            type="button"
            className="mt-7 rounded-lg bg-green-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition duration-200 hover:bg-green-800 hover:shadow-lg active:scale-95"
          >
            সব পণ্য দেখুন
          </button>
        </div>

        {/* Right Image */}
        <div className="flex w-full shrink-0 justify-center md:w-auto">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের তাজা সবজি ও পণ্য"
            width={240}
            height={220}
            priority
            className="h-auto w-[180px] object-contain sm:w-[220px] md:w-[240px]"
          />
        </div>

      </div>
    </section>
  );
};

export default BannerPage;
 