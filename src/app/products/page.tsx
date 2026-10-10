import Link from "next/link";
import type { Product } from "@/app/page";


const API_URL =
          "https://api.api-store.workers.dev/api/bazardor/products";

interface AllProductsProps {
          products: Product[];
}

const AllProducts = ({ products = [] }: AllProductsProps) => {
          return (
                    <section className="mx-auto w-full max-w-[1200px] rounded-xl px-3 py-4 sm:px-4 lg:px-0">
                              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                                        <div className="min-w-0">
                                                  <h2 className="flex items-center gap-2 text-base font-bold text-gray-900 sm:text-lg">
                                                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                                                                      🛒
                                                            </span>
                                                            সকল পণ্যের বাজার দর
                                                  </h2>

                                                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                                                            নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম এক নজরে
                                                  </p>
                                        </div>

                                        <span className="shrink-0 rounded-full bg-[#F0F5F0] px-3 py-1 text-xs font-semibold text-gray-700">
                                                  মোট {products.length.toLocaleString("bn-BD")} টি পণ্য
                                        </span>
                              </div>

                              {products.length > 0 ? (
                                        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                                  {products.map((product) => {
                                                            const isUp = product.change.dir === "up";
                                                            const isDown = product.change.dir === "down";

                                                            return (
                                                                      <Link
                                                                                key={product.id}
                                                                                href={`/product/${product.id}`}
                                                                                aria-label={`${product.nameBn} এর বিস্তারিত দেখুন`}
                                                                                className="block h-full min-w-0 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                                                                      >
                                                                                <article className="flex h-full min-w-0 flex-col justify-between rounded-2xl border border-gray-200 bg-[#f8faf8] p-3 transition duration-200 hover:border-emerald-200 hover:shadow-sm">
                                                                                          <div className="flex min-w-0 items-start gap-3">
                                                                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F0F5F0] text-xl shadow-sm">
                                                                                                              {product.image || product.categoryIcon}
                                                                                                    </div>

                                                                                                    <div className="min-w-0 flex-1">
                                                                                                              <h3 className="truncate text-base font-semibold text-gray-800">
                                                                                                                        {product.nameBn}
                                                                                                              </h3>

                                                                                                              <p className="mt-1 truncate text-xs text-gray-700">
                                                                                                                        {product.categoryNameBn}
                                                                                                              </p>
                                                                                                    </div>
                                                                                          </div>

                                                                                          <div className="mt-3 flex min-w-0 items-end justify-between gap-2">
                                                                                                    <div className="min-w-0">
                                                                                                              <p className="text-xs font-semibold text-gray-500">
                                                                                                                        আজকের দাম
                                                                                                              </p>

                                                                                                              <p className="mt-0.5 whitespace-nowrap text-lg font-bold text-gray-900 sm:text-xl">
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

                                                                                                    <span
                                                                                                              className={`shrink-0 rounded-xl px-2 py-1 text-xs font-bold ${isUp
                                                                                                                        ? "bg-[#F0F5F0] text-rose-600"
                                                                                                                        : isDown
                                                                                                                                  ? "bg-[#F0F5F0] text-emerald-700"
                                                                                                                                  : "bg-gray-100 text-gray-500"
                                                                                                                        }`}
                                                                                                    >
                                                                                                              {isUp ? "▲ " : isDown ? "▼ " : "— "}
                                                                                                              {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
                                                                                                    </span>
                                                                                          </div>
                                                                                </article>
                                                                      </Link>
                                                            );
                                                  })}
                                        </div>
                              ) : (
                                        <p className="rounded-lg bg-gray-50 py-10 text-center text-sm text-gray-500">
                                                  কোনো পণ্যের তথ্য পাওয়া যায়নি।
                                        </p>
                              )}
                    </section>
          );
};

async function ProductsPage() {
          const res = await fetch(API_URL, {
                    cache: "no-store",
          });

          if (!res.ok) {
                    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
          }

          const result: unknown = await res.json();

          let rawProducts: unknown[] = [];

          if (Array.isArray(result)) {
                    rawProducts = result;
          } else if (result && typeof result === "object") {
                    const data = result as {
                              products?: unknown;
                              data?: unknown;
                    };

                    if (Array.isArray(data.products)) {
                              rawProducts = data.products;
                    } else if (Array.isArray(data.data)) {
                              rawProducts = data.data;
                    } else if (
                              data.data &&
                              typeof data.data === "object" &&
                              "products" in data.data &&
                              Array.isArray(data.data.products)
                    ) {
                              rawProducts = data.data.products;
                    }
          }

          const products = rawProducts as Product[];

          return <AllProducts products={products} />;
}

export default ProductsPage;