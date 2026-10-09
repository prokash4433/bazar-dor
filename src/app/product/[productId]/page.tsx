 
import type { Product } from "@/app/page";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

type ProductDetails = Product & {
  markets: Market[];
};

interface ProductDetailsPageProps {
  params: Promise<{
    productId: string;
  }>;
}

async function getProduct(
  productId: string
): Promise<ProductDetails | null> {
  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products/${productId}`,
{
          next: { revalidate: 100 },
}
  );

if (res.status === 404) {
          return null;
}

if (!res.ok) {
          throw new Error("প্রোডাক্ট লোড করা যায়নি।");
}

const data: unknown = await res.json();

// API সরাসরি product object ফেরত দিলে
if (
          typeof data === "object" &&
          data !== null &&
          "id" in data
) {
          return data as ProductDetails;
}

// API object-এর ভেতরে product থাকলে
if (
          typeof data === "object" &&
          data !== null &&
          "product" in data &&
          typeof data.product === "object" &&
          data.product !== null
) {
          return data.product as ProductDetails;
}

return null;
}

const formatPrice = (price: number) =>
          `৳ ${price.toLocaleString("bn-BD")}`;

const getUnit = (unit: string) =>
          unit === "kg"
                    ? "কেজি"
                    : unit === "litre"
                              ? "লিটার"
                              : unit;

export default async function ProductDetailsPage({
          params,
}: ProductDetailsPageProps) {
          const { productId } = await params;

          const product = await getProduct(productId);

          if (!product) {
                    notFound();
          }

          const isUp = product.change.dir === "up";
          const isDown = product.change.dir === "down";

          // দামের সংক্ষিপ্তসারের কার্ড
          const comparisonCards = [
                    {
                              label: "গতকালের দাম",
                              price: product.yesterday,
                    },
                    {
                              label: "গত সপ্তাহের দাম",
                              price: product.lastWeek,
                    },
                    {
                              label: "গত মাসের দাম",
                              price: product.lastMonth,
                    },
          ].filter(
                    (item): item is { label: string; price: number } =>
                              typeof item.price === "number"
          );

          // বাজারের তথ্য
          const markets = Array.isArray(product.markets)
                    ? product.markets
                    : [];

          return (
                    <main className="min-h-screen bg-[#f0f5f1] px-3 py-5 text-[#202b23] sm:px-6 sm:py-7 lg:px-8">
                              <div className="mx-auto w-full max-w-6xl">

                              {/* Breadcrumb */}
                    <nav
                    aria-label="Breadcrumb"
                    className="mb-4 flex flex-wrap items-center gap-2 text-[11px] text-gray-500 sm:text-xs">
                    
                    <Link
                              href="/"
                              className="transition-colors hover:text-emerald-700">
                              হোম
                    </Link>

                    <span>›</span>

                    <Link
                              href={`/category/${product.category}`}
                              className="transition-colors hover:text-emerald-700">
                              {product.categoryNameBn}
                    </Link>

                    <span>›</span>

                    <span className="font-medium text-[#26352b] hover:text-emerald-700">
                              {product.nameBn}
                    </span>
                    </nav>

                               {/* Product Header Card */}
                    <section className="flex flex-col gap-4 rounded-xl border border-[#e0e8e1] bg-white p-3.5 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f1] text-2xl sm:h-14 sm:w-14 sm:text-3xl">
                              {product.image || product.categoryIcon}
                    </div>

                    <div className="min-w-0">
                    <h1 className="text-2xl font-bold text-[#202b23]  ">
                    {product.nameBn}
                     </h1>

                    <p className="mt-1 text-[20px] text-gray-900 sm:text-xs">
                    {product.categoryNameBn} · {getUnit(product.unit)}
                    </p>


                    <p className="mt-1 text-[15px] text-gray-800 ">
                    {typeof product.yesterday === "number" ? (
                    <>
                    গতকালের তুলনায় আজ দাম{" "}
                    {product.today > product.yesterday
                              ? "বেড়েছে"
                              : product.today < product.yesterday
                              ? "কমেছে"
                              : "অপরিবর্তিত"}
                    {product.today !== product.yesterday && (
                              <>
                    {" · "}
                    {Math.abs(product.today - product.yesterday).  toLocaleString("bn-BD")} টাকা
                    </>
                    )}
                    </>
                    
          ) : (
                    "নিত্যপ্রয়োজনীয় পণ্যের বর্তমান বাজার দর"
                    )}
          </p>
</div>
                    </div>

                                                  
                              {/* Today's Price */}
                                        
                    <div className="flex items-center justify-between gap-4 rounded-lg bg-[#f0f5f1] px-4 py-3 sm:min-w-[135px] sm:flex-col sm:items-center sm:gap-0 sm:text-center">
          <div>
                    <p className="text-[10px] text-gray-800 sm:text-xs">
                    আজকের দাম
                    </p>

                                                                      
                    <p className="mt-1 text-3xl  font-bold text-[#26352b]  ">
                    {formatPrice(product.today)}
                    </p>

                    <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">
                    / {getUnit(product.unit)}
                    </p>
                    </div>

                                        
                    <span
                    className={`mt-2 inline-block rounded-xl px-2 py-1 text-[10px] font-bold
                    ${isUp
                    ? "bg-rose-50 text-rose-700"
                    : isDown
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-gray-100 text-gray-500"
                    }`}
                    >
                    {isUp ? "▲ " : isDown ? "▼ " : "— "}
                    {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
                              </span>
                               </div>
                              </section>

                                        
                                        
                     
                
                {/* Price Summary */}
                <section className="mt-3 rounded-xl border border-[#e0e8e1] bg-white p-3 sm:p-4">
                  <h2 className="mb-3 text-xl font-bold text-[#26352b]">
                    দামের সারসংক্ষেপ
                  </h2>

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                      {
                        label: "সর্বনিম্ন দাম",
                        price:
                          markets.length > 0
                            ? Math.min(...markets.map((market) => market.min))
                            : null,
                      },
                      {
                        label: "সর্বাধিক দাম",
                        price:
                          markets.length > 0
                            ? Math.max(...markets.map((market) => market.max))
                            : null,
                      },
                      {
                        label: "গড় দাম",
                        price:
                          markets.length > 0
                            ? markets.reduce(
                              (total, market) => total + (market.min + market.max) / 2,
                              0
                            ) / markets.length
                            : null,
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-lg border border-[#e4ebe5] bg-[#f8faf8] p-3"
                      >
                        <p className="text-[15px] text-gray-500">
                          {item.label}
                        </p>

                        <p className="mt-1.5 text-3xl font-bold text-[#26352b]">
                          {item.price !== null
                            ? formatPrice(item.price)
                            : "তথ্য নেই"}
                        </p>

                        {item.price !== null && (
                          <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">
                            / {getUnit(product.unit)}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
                 


                                        
                                        
                    {/* Market Price Details */}
          <section className="mt-3 rounded-xl border border-[#e0e8e1] bg-white p-3 sm:p-4">
          <div className="mb-3">
          <h2 className="text-2xl font-bold text-[#26352b] sm:text-xs ">
         {product.nameBn} — বাজারভিত্তিক দাম
          </h2>

          <p className="mt-1 text-[15px] text-gray-500 sm:text-xs ">
          বিভিন্ন বাজারের সর্বনিম্ন, সর্বাধিক ও গড় দাম
          </p>
          </div>

           <div className="w-full overflow-x-auto rounded-lg">
          <table className="w-full min-w-[540px] border-collapse text-left text-[20px] sm:text-md ">
          <thead>
          <tr className="bg-[#f0f5f1] text-gray-600">
          <th className="px-3 py-2.5 font-semibold  ">
          বাজার
          </th>

          <th className="px-3 py-2.5 font-semibold sm:px-4">
          বিভাগ
          </th>

          <th className="px-3 py-2.5 text-right font-semibold sm:px-4">
          সর্বনিম্ন
          </th>

          <th className="px-3 py-2.5 text-right font-semibold sm:px-4">
          সর্বাধিক
          </th>

          <th className="px-3 py-2.5 text-right font-semibold sm:px-4">
          গড়
          </th>
          </tr>
          </thead>

          <tbody>
          {markets.map((market, index) => {
          const average =
          (market.min + market.max) / 2;

          return (
          <tr
          key={`${market.market}-${index}`}
          className={`border-b border-[#dce5dd] last:border-b-0 ${index % 2 === 0
                                                                                                                                  ? "bg-[#f8faf8]"
                                                                                                                                  : "bg-white"
          }`}
          >
          <td className="px-3 py-2.5 sm:px-4">
          {market.market}
          </td>

          <td className="px-3 py-2.5 sm:px-4">
          {market.division}
          </td>

          <td className="whitespace-nowrap px-3 py-2.5 text-right sm:px-4">
          {formatPrice(market.min)}
          </td>

          <td className="whitespace-nowrap px-3 py-2.5 text-right sm:px-4">
          {formatPrice(market.max)}
          </td>

          <td className="whitespace-nowrap px-3 py-2.5 text-right font-semibold text-[#26352b] sm:px-4">
          {formatPrice(average)}
          </td>
          </tr>
          );
          })}

          {markets.length === 0 && (
          <tr>
          <td
          colSpan={5}
          className="px-3 py-8 text-center text-xs text-gray-500">
          এই পণ্যের বাজারভিত্তিক দামের তথ্য পাওয়া যায়নি।
          </td>
          </tr>
          )}
                                                  </tbody>
                                        </table>
                              </div>
                    </section>

          </div>
</main>
          );
}
 
