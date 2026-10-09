
import Link from "next/link";
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
                    : Array.isArray(result.categories)
                              ? result.categories
                              : Array.isArray(result.data)
                                        ? result.data
                                        : [];

          return (
                    <div className="border-y border-gray-200 bg-white">
                              <div className="mx-auto max-w-7xl px-4">
                                        <div className="flex items-center gap-7 py-3">
                                                  {data.map((category) => (
                                                            <ActiveCategoryLink
                                                                      key={category.id}
                                                                      href={`/category/${category.slug}`}
                                                                      icon={category.icon}
                                                                      name={category.nameBn}
                                                            />
                                                  ))}
                                        </div>
                              </div>
                    </div>
          );
};

export default NavLinks;
