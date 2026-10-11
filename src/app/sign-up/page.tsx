 
"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const onSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    const confirmPassword = String(
      formData.get("confirmPassword") || ""
    );

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড একই নয়!", {
        duration: 3000,
        position: "top-center",
      });
      return;
    }

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        if (
          error.message?.includes("User already exists") ||
          error.message?.includes("already registered")
        ) {
          toast.error(
            "এই ইমেইল দিয়ে ইতোমধ্যে একটি অ্যাকাউন্ট রয়েছে। অনুগ্রহ করে আবার সাইন ইন করুন।",
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

        return;
      }

      if (data) {
        toast.success("আপনার সাইন আপ সফল হয়েছে!", {
          duration: 3000,
          position: "top-center",
        });
      }
    } catch {
      toast.error(
        "সাইন আপ করতে সমস্যা হয়েছে! অনুগ্রহ করে আবার চেষ্টা করুন।",
        {
          duration: 4000,
          position: "top-center",
        }
      );
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
      });

      if (error) {
        toast.error(error.message || "Google দিয়ে সাইন ইন করা যায়নি।");
      }
    } catch {
      toast.error("Google দিয়ে সাইন ইন করতে সমস্যা হয়েছে।");
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const { error } = await authClient.signIn.social({
        provider: "github",
      });

      if (error) {
        toast.error(error.message || "GitHub দিয়ে সাইন ইন করা যায়নি।");
      }
    } catch {
      toast.error("GitHub দিয়ে সাইন ইন করতে সমস্যা হয়েছে।");
    }
  };

  return (
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
          <label
            htmlFor="name"
            className="mb-2 block text-md text-[#202820]"
          >
            নাম
          </label>

          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="যেমন: রহিম উদ্দিন"
            className="input h-10 w-full rounded-lg border-[#dce5dc] bg-transparent text-sm"
          />

          <label
            htmlFor="email"
            className="mb-2 mt-4 block text-md text-[#202820]"
          >
            ইমেইল
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className="input h-10 w-full rounded-lg border-[#dce5dc] bg-transparent text-sm"
          />

          <label
            htmlFor="password"
            className="mb-2 mt-4 block text-md text-[#202820]"
          >
            পাসওয়ার্ড
          </label>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="input h-10 w-full rounded-lg border-[#dce5dc] bg-transparent text-sm"
          />

          <label
            htmlFor="confirmPassword"
            className="mb-2 mt-4 block text-md text-[#202820]"
          >
            পাসওয়ার্ড নিশ্চিত করুন
          </label>

          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
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

            <span className="text-xs text-[#737b73]">অথবা</span>

            <div className="h-px flex-1 bg-[#dce5dc]" />
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {/* Google Sign In */}
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="btn min-h-10 rounded-xl border border-[#dce5dc] bg-transparent px-2 text-sm text-[#202820] hover:bg-[#f0f5f0]"
            >
              <Image
                src="https://www.google.com/favicon.ico"
                alt="Google"
                width={20}
                height={20}
                className="h-5 w-5"
                unoptimized
              />
              <span>Google দিয়ে চালিয়ে যান</span>
            </button>

            {/* GitHub Sign In */}
            <button
              onClick={handleGithubSignIn}
              type="button"
              className="btn min-h-10 rounded-xl border border-[#dce5dc] bg-transparent px-2 text-sm text-[#202820] hover:bg-[#f0f5f0]"
            >
              <Image
                src="https://github.githubassets.com/favicons/favicon.png"
                alt="GitHub"
                width={20}
                height={20}
                className="h-5 w-5"
                unoptimized
              />
              <span>GitHub দিয়ে চালিয়ে যান</span>
            </button>
          </div>

          <p className="mt-5 text-center text-sm text-[#202820]">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="text-[#05893e] hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </form>

        <Link
          href="/"
          className="mt-6 text-sm text-[#737b73] hover:text-[#05893e]"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
 