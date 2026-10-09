
"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/app/category/[categoryId]/page";

interface ProductGridProps {
          products: Product[];
}

type SortOption = "default" | "low-to-high" | "high-to-low";

const formatPrice = (price: number) =>
          price.toLocaleString("bn-BD");

const formatPercent = (pct: number) =>
          pct.toLocaleString("bn-BD", {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
          });

const ProductGrid = ({ products }: ProductGridProps) => {
          const [sortBy, setSortBy] = useState<SortOption>("default");

          const sortedProducts = useMemo(() => {
                    const result = [...products];

                    if (sortBy === "low-to-high") {
                              result.sort((a, b) => a.today - b.today);
                    }

                    if (sortBy === "high-to-low") {
                              result.sort((a, b) => b.today - a.today);
                    }

                    return result;
          }, [products, sortBy]);

          return (
                    <section className="space-y-4">
                    {/* Sort Control */}
                    <div className="flex flex-col gap-3 rounded-2xl border border-[#dce5dd] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-gray-500">পণ্যের দাম সাজিয়ে দেখুন</p>

                    <div className="flex items-center justify-between gap-3 sm:justify-end">
                    <label
                    htmlFor="product-sort"
                    className="shrink-0 text-sm text-gray-600">সাজান</label>

                    <select
                    id="product-sort"
                    value={sortBy}
                    onChange={(event) =>
                    setSortBy(event.target.value as SortOption)}
                    className="max-w-full cursor-pointer rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-[#26332a] outline-none transition focus:border-[#05893e] focus:ring-2 focus:ring-[#05893e]/15">
                                                            
                                                            
                    <option value="default">ডিফল্ট</option>

                    <option value="low-to-high">দাম: কম থেকে বেশি</option>

                    <option value="high-to-low">দাম: বেশি থেকে কম</option>
                    </select>
                              </div>
                    </div>

                              {/* Product Count */}
                    <p className="text-sm text-gray-500">
                    মোট{" "}<span className="font-semibold text-[#202b23]">
                    {sortedProducts.length.toLocaleString("bn-BD")}</span>{" "}
                    টি পণ্য দেখানো হচ্ছে</p>

                              
                              
                              
                    {/* Responsive Product Cards */}
          {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => {
          const isUp = product.change.dir === "up";
          const isDown = product.change.dir === "down";

          return (
                    <article
                    key={product.id}
                    className="group rounded-2xl border border-[#dce5dd] bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:border-[#b8d8c0] hover:shadow-md sm:p-5">
                                        {/* Product Name and Image */}
                    <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f1] text-2xl transition group-hover:bg-[#e5f2e8]">
                     {product.image || product.categoryIcon || "🛒"}
                    </div>

                    <div className="min-w-0">
                    <h2 className="truncate text-base font-bold text-[#202b23]">
                                                                                                                               {product.nameBn}
                    </h2>

                    <p className="mt-0.5 text-sm text-gray-500">
                                                                                                                                প্রতি{" "}
                                                                                                                               {product.unit === "kg"
                                                                                                                                ? "কেজি"
                                                                                                                                : product.unit}
                  </p>
                    </div>
                    </div>

                                                                                
                                                                                
                              {/* Today's Price */}
                    <div className="mt-4">
                     <p className="text-xs text-gray-500">আজকের দাম</p>

                    <div className="mt-1 flex items-center justify-between gap-2">
                    <p className="text-xl font-bold text-[#202b23]">
                                                                                                                              {formatPrice(product.today)}{" "}
                                                                                                                               <span className="text-sm font-medium">টাকা</span>
                    </p>

                              {/* Price Change Badge */}
                   <span
                                                                                                                                className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs   
                                                                                                                                font-semibold ${isUp
                                                                                                                                  ? "bg-red-50 text-red-600" 
                                                                                                                                  : isDown
                                                                                                                                            ? "bg-green-50 text-green-600"
                                                                                                                                            : "bg-gray-100 text-gray-600"
                                                                                                                                            }`}
                                                                                                    >
                                                                                                                                          {isUp ? (
                                                                                                                                          <>
                                                                                                                                  <span>▲</span>
                                                                                                                                  {formatPercent(product.change.pct)}%
                                                                                                                                        </>
                                                                                                                                 ) : isDown ? (
                                                                                                                                        <>
                                                                                                                                  <span>▼</span>
                                                                                                                                  {formatPercent(product.change.pct)}%
                                                                                                                                    </>
                                                                                                                                  ) : (
                                                                                                                                <>— ০.০%</>
                                                                                                                                    )}
                                                  </span>
                                        </div>
                              </div>
                    </article>
                    );
          })}
                     </div>
                    ) : (
          
                   <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-12 text-center">
                   <p className="text-3xl">🛒</p>

                    <h2 className="mt-3 font-semibold text-gray-800">
                    কোনো পণ্য পাওয়া যায়নি
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                    এই ক্যাটাগরিতে বর্তমানে কোনো পণ্যের তথ্য নেই।
                                        </p>
                              </div>
                    )}
          </section>
          );
};

export default ProductGrid;
