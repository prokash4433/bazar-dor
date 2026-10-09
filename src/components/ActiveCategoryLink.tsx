 
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface ActiveCategoryLinkProps {
  href: string;
  icon: string;
  name: string;
}

const normalizePath = (path: string) => {
  const cleanPath = path.trim().replace(/\/+/g, "/");
  const withoutTrailingSlash = cleanPath.replace(/\/+$/, "");

  return withoutTrailingSlash || "/";
};

const ActiveCategoryLink = ({
  href,
  icon,
  name,
}: ActiveCategoryLinkProps) => {
  const pathname = usePathname();

  const cleanHref = normalizePath(href);
  const cleanPathname = normalizePath(pathname);

  const isActive = cleanPathname === cleanHref;

  return (
    <Link
      href={cleanHref}
      aria-current={isActive ? "page" : undefined}
      className={`inline - flex shrink - 0 items - center gap - 1.5
whitespace - nowrap rounded - md px - 2 py - 2 text - sm font - medium
transition - colors duration - 200
        ${
          isActive
                    ? "bg-green-100 text-green-800"
                    : "text-gray-800 hover:bg-green-50 hover:text-green-700"
} `}
    >
      <span className="text-base" aria-hidden="true">
        {icon}
      </span>

      <span>{name}</span>
    </Link>
  );
};

export default ActiveCategoryLink;
 
