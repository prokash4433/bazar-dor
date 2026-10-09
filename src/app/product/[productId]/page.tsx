 
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

  const cleanCategoryId = categoryId.trim();

  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products?category=${encodeURIComponent(
cleanCategoryId
    )}`,
    {
      next: { revalidate: 100 },
    }
  );

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
  }

  const result = await res.json();

  const products: Product[] = Array.isArray(result)
    ? result
    : Array.isArray(result?.products)
      ? result.products
      : Array.isArray(result?.data)
        ? result.data
        : [];

  const categoryName = products[0]?.categoryNameBn ?? "পণ্য";
  const categoryIcon = products[0]?.categoryIcon ?? "🛒";

  return (
    <main className="min-h-screen bg-[#f0f5f1] px-3 py-5 sm:px-6 sm:py-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-5 sm:space-y-6">
        {/* Category Header */}
        <section className="flex items-center gap-3 rounded-2xl border border-[#dce5dd] bg-white p-4 sm:gap-4 sm:p-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f0f5f1] text-2xl sm:h-14 sm:w-14 sm:text-3xl">
            {categoryIcon}
          </div>

          <div className="min-w-0">
            <h1 className="text-xl font-bold text-[#202b23] sm:text-2xl">
              {categoryName}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {products.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </section>

        {/* Products */}
        <ProductGrid products={products} />
      </div>
    </main>
  );
}
 
