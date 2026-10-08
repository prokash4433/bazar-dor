import Link from "next/link";

interface Category {
          id: string;
          slug: string;
          nameBn: string;
          icon: string;
}

const NavLinks = async () => {
          const res = await fetch(
                    "https://api.api-store.workers.dev/api/bazardor/categories",{next:{revalidate:100}}
          );

          const data: Category[] = await res.json();

          return (
                    <div className="border-y border-gray-200 bg-white">
                    <div className="mx-auto max-w-7xl px-4">
                              <div className="flex items-center gap-7 py-3">
                    
                    
          {data.map((category) => (
          <Link
          key={category.id}
          href={`/category/${category.slug}`}
                              className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-gray-800 transition-colors duration-200 hover:bg-green-50 hover:text-green-700" >
                                                                     
          <span className="text-base">
          {category.icon}</span>

           <span>
          {category.nameBn}</span>
                              </Link>
                    ))}
                               </div>
                    </div>
          </div>
          );
};

export default NavLinks;