"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
 

export default function ProfilePage() {
          const { data: session, isPending } = authClient.useSession();

          const [name, setName] = useState("");
          const [isUpdating, setIsUpdating] = useState(false);

          const user = session?.user;
          
          
          

          const currentName = name || user?.name || "";
          const email = user?.email || "";
          const image = user?.image || "";

          const handleUpdate = async (e: React.SubmitEvent<HTMLFormElement>) => {
          e.preventDefault();

          if (!currentName.trim()) {
          toast.error("আপনার নাম লিখুন");
          return;
          }

          setIsUpdating(true);

          try {
                    const { error } = await authClient.updateUser({
                    name: currentName.trim(),
                    });

                    if (error) {
                    toast.error(error.message || "নাম আপডেট করা যায়নি");
                    return;
                    }

                    toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে");
                    } catch {
                              toast.error("কিছু একটা সমস্যা হয়েছে");
                    } finally {
                              setIsUpdating(false);
                    }
          };

          const handleSignOut = async () => {
                    try {
                    await authClient.signOut({
                    fetchOptions: {
                    onSuccess: () => {
                    toast.success("সাইন আউট সফল হয়েছে");
                     },
                    onError: () => {
                    toast.error("সাইন আউট করা যায়নি");
                     },
                     },});
                    } catch {
                     toast.error("সাইন আউট করার সময় সমস্যা হয়েছে");
                    }
          };

          if (isPending) {
           return (
           <div className="flex min-h-screen items-center justify-center bg-[#f0f5f0]">
           <p className="text-sm text-gray-600">প্রোফাইল লোড হচ্ছে...</p>
           </div>
           );
          }

        

          return (
           <main className="min-h-screen bg-[#f0f5f0] px-4 py-10 sm:px-6">
           <div className="mx-auto w-full max-w-[810px]   px-5 py-10 sm:px-8 sm:py-12">
                               {/* Profile Heading */}
           <div className="mb-7">
           <h1 className="text-2xl font-bold tracking-tight text-[#202b23]">
            আমার প্রোফাইল
           </h1>

           <p className="mt-1 text-sm text-[#687269]">
             আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
            </p>
                </div>

                    {/* User Information Card */}
          <section className="flex flex-col gap-5 rounded-2xl border border-[#dce5dc] bg-[#fbfdfb] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex min-w-0 items-center gap-4">
          {image ? (
          
          
          <Image
          src={image}
          alt={currentName || "Profile"}
          width={80}
          height={80}
          unoptimized
          className="h-[70px] w-[80px] shrink-0 rounded-2xl object-cover"
          />
          ) : (
          <div className="flex h-[70px] w-[80px] shrink-0 items-center justify-center rounded-2xl bg-[#e8eee8] text-3xl font-bold text-[#07883e]">
          {currentName.charAt(0).toUpperCase() || "U"}
          </div>
          )}

                                                            
          <div className="min-w-0">
          <h2 className="truncate text-xl font-semibold text-[#202b23]">
           {currentName}
          </h2>

          <p className="mt-1 break-all text-sm text-[#687269] sm:text-base">
          {email}
          </p>
          </div>
          </div>

          <button
          type="button"
          onClick={() => {
          toast.loading("আপনার প্রোফাইল থেকে সাইন আউট করা হচ্ছে...", 
                    {duration: 1500,
                    style: {
                    background: "#16a34a",
                    color: "#ffffff",
                    },
          });
          handleSignOut();
          }}
          className="shrink-0 self-start rounded-lg border border-red-500 px-4 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50 sm:self-center cursor-pointer"
          >
           ↩ সাইন আউট
          </button>
          </section>

                    {/* Update Profile Card */}
          <section className="mt-6 rounded-2xl border border-[#dce5dc] bg-[#fbfdfb] p-5 sm:px-5 sm:py-6">
          <h2 className="text-lg font-semibold text-[#202b23]">
          তথ্য
          </h2>

          <form onSubmit={handleUpdate} className="mt-9 px-1 sm:px-6">
          <label
          htmlFor="profile-name"
          className="mb-2 block text-sm font-medium text-[#303a32]">
          নাম
          </label>

          
          <input
          id="profile-name"
          type="text"
          value={currentName}
          onChange={(e) => setName(e.target.value)}
          placeholder="আপনার নাম লিখুন"
          required
          className="h-10 w-full rounded-lg border border-[#dce5dc] bg-transparent px-3 text-sm text-[#202b23] outline-none transition focus:border-[#07883e] focus:ring-2 focus:ring-[#07883e]/10"/>

          <button
          type="submit"
          disabled={isUpdating}
          className="mt-4 flex h-10 w-full items-center justify-center rounded-lg bg-[#07883e] text-sm font-semibold text-white shadow-md transition hover:bg-[#067333] disabled:cursor-not-allowed disabled:opacity-60">
          {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
          </button>
          </form>
          </section>
                     </div>
          </main>
          );
}