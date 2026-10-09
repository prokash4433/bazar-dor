
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface ActiveCategoryLinkProps {
          href: string;
          icon: string;
          name: string;
}

const ActiveCategoryLink = ({
          href,
          icon,
          name,
}: ActiveCategoryLinkProps) => {
          const pathname = usePathname();
          const isActive = pathname === href;

          return (
                    <Link
                              href={href}
                              aria-current={isActive ? "page" : undefined}
                              className={`flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium transition-colors duration-200 ${isActive
                                                  ? "bg-green-50 text-green-700"
                                                  : "text-gray-800 hover:bg-green-50 hover:text-green-700"
                                        }`}
                    >
                              <span className="text-base">{icon}</span>
                              <span>{name}</span>
                    </Link>
          );
};

export default ActiveCategoryLink;
