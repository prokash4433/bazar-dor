 
'use client'

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const onSubmit = async (
    e: React.SubmitEvent<HTMLElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const user = Object.fromEntries(
      formData.entries()
    ) as {
      name: string;
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signUp.email({
      ...user,
      callbackURL: "/",
    });

    if (data) {
      toast.success("আপনার সাইন আপ সফল হয়েছে!", {
        duration: 3000,
        position: "top-center",
      });

      redirect("/");
    }

    if (error) {
      if (
        error.message?.includes("User already exists") ||
        error.message?.includes("already registered")
      ) {
        toast.error(
          "এই ইমেইল দিয়ে ইতোমধ্যে একটি অ্যাকাউন্ট রয়েছে। অনুগ্রহ করে অন্য ইমেইল ব্যবহার করুন।",
          {
            duration: 4000,
            position: "top-center",
          }
        );
      } else {
        toast.error(
          error.message ||
            "সাইন আপ করতে সমস্যা হয়েছে! অনুগ্রহ করে আবার চেষ্টা করুন।",
          {
            duration: 4000,
            position: "top-center",
          }
        );
      }
    }
  };
  // Google SignIn with authentication
   // Google SignIn with authentication
   const handleGoogleSignIn = async() =>{
     const data = await authClient.signIn.social({
       provider: "google",
     });
     console.log(data)
   }
  return (
    <div>
      <div className="min-h-screen w-full bg-[#f0f5f0] px-4 py-6 sm:py-10">
        <div className="mx-auto flex min-h-[748px] w-full max-w-[696px] flex-col items-center px-4 py-10 sm:px-8">

          <div className="mb-7 text-center">
            <h1 className="text-2xl font-bold text-[#202820] sm:text-[28px]">
              অ্যাকাউন্ট তৈরি করুন
            </h1>

            <p className="mt-2 text-sm text-[#737b73]">
              বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="w-full max-w-[416px] rounded-2xl border border-[#dce5dc] bg-[#fbfdfb] p-5 sm:p-6"
          >
            <label className="mb-2 block text-md text-[#202820]">
              নাম
            </label>

            <input
              name="name"
              type="text"
              placeholder="যেমন: রহিম উদ্দিন"
              className="input h-10 w-full rounded-lg border-[#dce5dc] bg-transparent text-sm"
            />

            <label className="mb-2 mt-4 block text-md text-[#202820]">
              ইমেইল
            </label>

            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="input h-10 w-full rounded-lg border-[#dce5dc] bg-transparent text-sm"
            />

            <label className="mb-2 mt-4 block text-md text-[#202820]">
              পাসওয়ার্ড
            </label>

            <input
              name="password"
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="input h-10 w-full rounded-lg border-[#dce5dc] bg-transparent text-sm"
            />

            <label className="mb-2 mt-4 block text-md text-[#202820]">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>

            <input
              name="password"
              type="password"
              placeholder="আবার লিখুন"
              className="input h-10 w-full rounded-lg border-[#dce5dc] bg-transparent text-sm"
            />

            <button
              type="submit"
              className="btn mt-4 min-h-10 w-full rounded-xl border-none bg-[#05893e] text-sm font-semibold text-white shadow-md hover:bg-[#047532]"
            >
              অ্যাকাউন্ট তৈরি করুন
            </button>

            <div className="my-4 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#dce5dc]" />

              <span className="text-xs text-[#737b73]">
                অথবা
              </span>

              <div className="h-px flex-1 bg-[#dce5dc]" />
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button
                                                                        onClick={handleGoogleSignIn}
                type="button"
                className="btn min-h-10 rounded-xl border border-[#dce5dc] bg-transparent px-2 text-xl text-[#202820] hover:bg-[#f0f5f0] sm:text-sm"
              >
                <span className="font-bold text-[#4285F4]">
                  G
                </span>

                Google দিয়ে চালিয়ে যান
              </button>

              <button
                type="button"
                className="btn min-h-10 rounded-xl border border-[#dce5dc] bg-transparent px-2 text-xs text-[#202820] hover:bg-[#f0f5f0] sm:text-sm"
              >
                <span className="font-bold">●</span>

                GitHub দিয়ে চালিয়ে যান
              </button>
            </div>

            <p className="mt-5 text-center text-sm text-[#202820]">
              অ্যাকাউন্ট আছে?{" "}

              <span className="cursor-pointer text-[#05893e] hover:underline">
                সাইন ইন করুন
              </span>
            </p>
          </form>

          <p className="mt-6 cursor-pointer text-sm text-[#737b73] hover:text-[#05893e]">
            ← হোম পেজে ফিরে যান
          </p>

        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
 