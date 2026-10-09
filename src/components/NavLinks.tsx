 
import ActiveCategoryLink from "./ActiveCategoryLink";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/categories",
    {
      next: { revalidate: 100 },
    }
  );

  if (!res.ok) {
    throw new Error("ক্যাটাগরি লোড করা যায়নি।");
  }

  const result = await res.json();

  const data: Category[] = Array.isArray(result)
    ? result
    : Array.isArray(result?.categories)
      ? result.categories
      : Array.isArray(result?.data)
        ? result.data
        : [];

  return (
    <nav
      aria-label="পণ্যের ক্যাটাগরি"
      className="border-y border-gray-200 bg-white"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 py-2 sm:gap-x-5 sm:gap-y-2 sm:py-3">
          
          {data.map((category) => {
          const slug = category.slug?.trim();

          if (!slug) return null;

          return (
          <ActiveCategoryLink
          key={category.id}
          href={`/category/${slug}`}
          icon={category.icon}
          name={category.nameBn}
          />
                                                    );
                                          })}
        </div>
      </div>
    </nav>
  );
};

export default NavLinks;
 
