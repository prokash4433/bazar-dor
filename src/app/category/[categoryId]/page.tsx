import EmptyState from "@/components/EmptyStateCard";
import ProductGrid from "@/components/ProductGrid";
 

export interface Product {
          id: number;
          slug: string;
          nameBn: string;
          category: string;
          categoryIcon: string;
          categoryNameBn: string;
          image: string;
          today: number;
          yesterday: number;
          lastWeek: number;
          lastMonth: number;
          unit: string;
          change: {
                    dir: "up" | "down" | "none";
                    pct: number;
          };
}

interface CategoryPageProps {
          params: Promise<{
                    categoryId: string;
          }>;
}

export default async function CategoryProducts({
          params,
}: CategoryPageProps) {
          const { categoryId } = await params;

          const res = await fetch(
                    `https://api.abcz.workers.dev/api/bazardor/products?category=${encodeURIComponent(categoryId)}`,
                    {
                              next: { revalidate: 100 },
                    }
          );

          if (!res.ok) {
                    throw new Error("প্রোডাক্ট লোড করা যায়নি।");
          }

          const result = await res.json();

          const products: Product[] = Array.isArray(result)
                    ? result
                    : Array.isArray(result?.products)
                              ? result.products
                              : Array.isArray(result?.data)
                                        ? result.data
                                        : [];

          // Empty State: কোনো পণ্য না থাকলে
          if (products.length === 0) {
                    return (<main className="min-h-screen bg-[#f0f5f1] px-4 py-6 sm:px-6 lg:px-8"> <div className="mx-auto w-full max-w-6xl"> <EmptyState /> </div> </main>
                    );
          }

          const categoryName = products[0].categoryNameBn;
          const categoryIcon = products[0].categoryIcon;

          return (<main className="min-h-screen bg-[#f0f5f1] px-4 py-6 sm:px-6 lg:px-8"> <div className="mx-auto w-full max-w-6xl space-y-6">
                    {/* Category Header */} <section className="flex items-center gap-4 rounded-2xl border border-[#dce5dd] bg-white p-5 sm:p-6"> <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5f1] text-3xl">
                              {categoryIcon} </div>

                              
                              <div>
                                        <h1 className="text-2xl font-bold text-[#202b23]">
                                                  {categoryName}
                                        </h1>

                                        <p className="mt-1 text-sm text-gray-500">
                                                  {products.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন
                                        </p>
                              </div>
                    </section>

                    {/* Product Grid */}
                    <ProductGrid products={products} />
          </div>
          </main>
 

);
}
