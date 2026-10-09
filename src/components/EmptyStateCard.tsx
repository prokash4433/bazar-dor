"use client";

import Link from "next/link";

export default function EmptyState() {
          return (<section className="flex min-h-[55vh] w-full items-center justify-center px-4 py-12"> <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm sm:px-10 sm:py-14">
                    {/* Empty State Illustration */} <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-orange-50"> <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              className="h-12 w-12 text-orange-500"
                              aria-hidden="true"
                    > <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 9.5 4.5 4h15L21 9.5M3 9.5A3 3 0 0 0 9 9.5a3 3 0 0 0 6 0 3 3 0 0 0 6 0M5 12v8h14v-8M9 20v-5h6v5"
                              /> </svg> </div>

                    ```
                    {/* Error Code */}
                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-orange-500">
                              404 · Not Found
                    </p>

                    {/* Heading */}
                    <h1 className="mb-3 text-2xl font-extrabold leading-tight text-gray-900 sm:text-3xl">
                              দুঃখিত! পণ্য খুঁজে পাওয়া যায়নি
                    </h1>

                    {/* Description */}
                    <p className="mx-auto mb-8 max-w-sm text-sm leading-7 text-gray-500 sm:text-base">
                              এই ক্যাটাগরিতে এখনো কোনো পণ্য নেই, অথবা আপনি যে পেজটি খুঁজছেন সেটি
                              পাওয়া যাচ্ছে না। হোম পেজে ফিরে গিয়ে নিত্যপ্রয়োজনীয় পণ্যের দাম দেখুন।
                    </p>

                    {/* Home Button */}
                    <Link
                              href="/"
                              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 sm:w-auto"
                    >
                              <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className="h-5 w-5"
                                        aria-hidden="true"
                              >
                                        <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  d="m3 10 9-7 9 7M5 9v11h14V9M9 20v-6h6v6"
                                        />
                              </svg>
                              হোম পেজে ফিরে যান
                    </Link>

                    <p className="mt-6 text-xs text-gray-400">
                              BazarDor · সঠিক দামে বাজার করুন
                    </p>
          </div>
          </section>
 

);
}
