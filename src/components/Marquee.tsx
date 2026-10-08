 
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Product {
  id: number;
  nameBn: string;
  image: string;
  today: number;
  unit: string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const Marquee = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    {
      next: { revalidate: 100 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product prices");
  }

  const data: Product[] = await res.json();

  return (
            <div className="w-full overflow-hidden bg-white  border-gray-100  border-y">
      <MarqueeText direction="right" duration={15}>
        {data.map((product) => (
          <div
            key={product.id}
                            className="inline-flex shrink-0 items-center gap-2 border-r border-gray-100 px-5 py-3 text-sm whitespace-nowrap"
          >
            {/* Product icon */}
            <span className="text-base">{product.image}</span>

            {/* Product name */}
            <span className="font-semibold text-gray-800">
              {product.nameBn}
            </span>

            {/* Price */}
            <span className="text-gray-600">
              {product.today} টাকা/
              {product.unit === "kg" ? "কেজি" : "লিটার"}
            </span>

            {/* Price change */}
            {product.change.dir === "up" && (
              <span className="font-semibold text-red-500">
                ▲ {Math.abs(product.change.pct)}%
              </span>
            )}

            {product.change.dir === "down" && (
              <span className="font-semibold text-green-600">
                ▼ {Math.abs(product.change.pct)}%
              </span>
            )}

            {product.change.dir === "flat" && (
              <span className="font-semibold text-gray-400">
                ━ ০%
              </span>
            )}
          </div>
        ))}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
 