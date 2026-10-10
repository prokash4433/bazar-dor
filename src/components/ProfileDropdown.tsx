 
"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

interface ProfileDropdownProps {
  name?: string;
  email?: string;
  image?: string | null;
  onSignOut?: () => void;
}

export default function ProfileDropdown({
  name = "User",
  email = "",
  image,
  onSignOut,
}: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const firstLetter = name.trim().charAt(0).toUpperCase() || "U";

//SignOut 
  const handleSignOut = async() =>{
    await authClient.signOut();
  }


  return (
    <div className="relative inline-block max-w-full font-sans">
      {/* Profile Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex max-w-full items-center gap-1.5 rounded-2xl border border-transparent bg-gray-100 px-2 py-1.5 text-sm text-gray-700 transition  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-100 sm:gap-2 sm:px-3 sm:py-2 cursor-pointer"
      >
        {/* Profile Avatar */}
        {/* <span className="flex h-6 w-10 shrink-0 items-center justify-center rounded-md   p-0.5">
          <span className="flex h-full w-full items-center justify-center rounded-xl bg-green-700 text-sm font-bold text-white">
            {firstLetter}
          </span>
        </span> */}

        <div className="avatar">
          <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-green-600 ring-offset-2">
            {image ? (
              <Image
                src={image}
                alt={`${name}'s profile`}
                fill
                sizes="40px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-green-700 text-lg font-bold text-white">
                {firstLetter}
              </div>
            )}
          </div>
        </div>


        {/* Full Name */}
        <span className="whitespace-nowrap font-medium">
          {name}
        </span>

        {/* Dropdown Arrow */}
        <svg
          className={`h - 3 w - 3 shrink - 0 text - gray - 500 transition - transform ${
          isOpen ? "rotate-180" : ""
} `}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.22 7.22a.75.75 0 011.06 0L10 10.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 8.28a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Outside Click Overlay */}
          <button
            type="button"
            aria-label="Close profile menu"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setIsOpen(false)}
          />

          <div
            role="menu"
            className="absolute right-0 top-full z-50 mt-2 w-64 max-w-[calc(100vw-1rem)] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg shadow-gray-200/70"
          >
            {/* User Information */}
            <div className="px-4 pb-3 pt-4">
              <p className="break-words text-sm font-semibold text-gray-700">
                {name}
              </p>

              {email && (
                <p className="mt-1 break-all text-xs text-gray-400">
                  {email}
                </p>
              )}
            </div>

            <div className="border-t border-gray-100" />

            {/* Profile Route */}
            <Link
              href="/profile"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-sm text-gray-800 transition hover:bg-gray-50"
            >
              <svg
                className="h-4 w-4 shrink-0 text-indigo-900"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.42 0-8 2.24-8 5v2h16v-2c0-2.76-3.58-5-8-5z" />
              </svg>

              আমার প্রোফাইল
            </Link>
 

            {/* Sign Out */}
            <button
              type="button"
              role="menuitem"
              onClick={handleSignOut}
              className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-red-500 transition hover:bg-red-50"
            >
              <svg
                className="h-4 w-4 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 17l5-5-5-5m5 5H3m9-9h6a2 2 0 012 2v14a2 2 0 01-2 2h-6"
                />
              </svg>

              সাইন আউট
            </button>

          </div>
        </>
      )}
    </div>
  );
}
 