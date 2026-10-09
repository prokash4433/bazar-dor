
import Link from "next/link";
import type { Product } from "@/app/page";

interface RiseProductProps {
   products: Product[];
}

const RiseProduct = ({ products }: RiseProductProps) => {
   const risingProducts = products
      .filter(
         (product) =>
            product.change.dir === "up" && product.change.pct > 0
      )
      .sort((a, b) => b.change.pct - a.change.pct)
      .slice(0, 6);

   return (
      <section className="w-full rounded-xl py-4">
         <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-base font-bold text-gray-900 sm:text-lg">
               <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-50 text-red-600">
                  ▲
               </span>
               আজ দাম বেড়েছে
            </h2>

            <span className="shrink-0 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
               {risingProducts.length.toLocaleString("bn-BD")} পণ্য
            </span>
         </div>

         {risingProducts.length > 0 ? (
            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
               {risingProducts.map((product) => (
                  <Link
                     key={product.id}
                     href={`/product/${product.id}`}
                     aria-label={`${product.nameBn} এর বিস্তারিত দেখুন`}
                     className="block min-w-0 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
                  >
                     <article className="h-full min-w-0 cursor-pointer rounded-2xl border border-gray-200 bg-[#f8faf8] p-3 transition duration-200 hover:border-rose-300 hover:bg-rose-50/40 hover:shadow-sm">
                        <div className="flex items-start gap-3">
                           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F0F5F0] text-xl shadow-sm">
                              {product.image || product.categoryIcon}
                           </div>

                           <div className="min-w-0 flex-1">
                              <h3 className="truncate text-md font-semibold text-gray-800">
                                 {product.nameBn}
                              </h3>

                              <p className="mt-1 text-xs text-gray-500">
                                 {product.categoryNameBn}
                              </p>
                           </div>
                        </div>

                        <div className="mt-3 flex items-end justify-between gap-2">
                           <div className="min-w-0">
                              <p className="text-xs font-semibold text-gray-500">
                                 আজকের দাম
                              </p>

                              <p className="mt-0.5 text-xl font-bold text-gray-900">
                                 ৳{product.today.toLocaleString("bn-BD")}
                                 <span className="ml-1 text-xs font-normal text-gray-500">
                                    /
                                    {product.unit === "kg"
                                       ? "কেজি"
                                       : product.unit === "litre"
                                          ? "লিটার"
                                          : product.unit}
                                 </span>
                              </p>
                           </div>

                           <span className="shrink-0 rounded-xl bg-[#F0F5F0] px-2 py-1 text-xs font-bold text-rose-700">
                              ▲ {product.change.pct.toLocaleString("bn-BD")}%
                           </span>
                        </div>
                     </article>
                  </Link>
               ))}
            </div>
         ) : (
            <p className="rounded-xl border border-gray-200 bg-[#f8faf8] py-8 text-center text-sm text-gray-500">
               এই মুহূর্তে দাম বাড়ার কোনো তথ্য পাওয়া যায়নি।
            </p>
         )}
      </section>
   );
};

export default RiseProduct;
