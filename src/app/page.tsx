import AllProducts from "@/components/AllProducts";
import BannerPage from "@/components/Banner";
import DownProducts from "@/components/DownProducts";
import Marquee from "@/components/Marquee";
import RiseProduct from "@/components/RiseProduct";

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek?: number;
  lastMonth?: number;
  unit: string;
  change: {
    dir: "up" | "down" | "flat" | "none";
    pct: number;
  };
}

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(
      "https://api.api-store.workers.dev/api/bazardor/products",
      {
        next: { revalidate: 100 },
      }
    );

    if (!res.ok) {
      throw new Error("Products fetch failed");
    }

    const data: unknown = await res.json();

    if (Array.isArray(data)) {
      return data as Product[];
    }

    if (
      typeof data === "object" &&
      data !== null &&
      "products" in data &&
      Array.isArray(data.products)
    ) {
      return data.products as Product[];
    }

    return [];
  } catch (error) {
    console.error("Products API error:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-[#f5f7f5]">
      <Marquee />
      <BannerPage />

      {/* সব product section একই width-এর মধ্যে থাকবে */}
      <div className="mx-auto w-full max-w-[1300px] space-y-5 px-4 py-6 sm:px-5 lg:px-4">
        <RiseProduct products={products} />

        <DownProducts products={products} />

        <AllProducts products={products} />
      </div>
    </main>
  );
}