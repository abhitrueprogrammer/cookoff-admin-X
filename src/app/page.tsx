"use client";
import { login } from "@/api/login";
import cookoff from "@/assets/images/cookoff.svg";
import { loginFormSchema } from "@/schemas/forms/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { type ApiError } from "next/dist/server/api-utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type * as z from "zod";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  async function onSubmit(data: z.infer<typeof loginFormSchema>) {
    setIsLoading(true);
    try {
      await toast.promise(login(data), {
        loading: "Cooking...",
        success: "Logged in successfully!",
        error: (err: ApiError) => err.message,
      });
      setTimeout(() => router.push("/dashboard"), 1000);
    } catch (err) {
      console.error("Login failed:", err);
    }
    setIsLoading(false);
  }

  return (
    <div className="min-w-screen flex h-screen flex-col items-center justify-center gap-10 bg-[#202020] text-accent">
      <h1 className="s-sling pt-5 text-3xl font-bold text-accent">
        CODECHEF PRESENTS
      </h1>
      <div className="mt-8 flex w-full flex-row">
        <div className="flex w-1/2 flex-col">
          <div className="flex flex-col">
            <Image
              className="ml-20 mr-10 pl-14"
              src={cookoff as HTMLImageElement}
              alt="cookoff text"
              width={580}
              height={400}
            />
            <div className="relative"></div>
          </div>
        </div>
        <div className="flex w-1/2">
          <div
            className="mx-auto flex h-[510px] w-[450px] flex-col items-center justify-center bg-viewSubmission text-white"
            style={{
              clipPath:
                "polygon(0 90px, 90px 0, 100% 0, 100% 10px, 100% 85%, 80% 100%, 0 100%, 0 100%)",
            }}
          >
            <div
              className="flex h-[575px] w-[450px] scale-95 flex-col items-center justify-center bg-black text-white"
              style={{
                clipPath:
                  "polygon(0 90px, 90px 0, 100% 0, 100% 10px, 100% 85%, 80% 100%, 0 100%, 0 100%)",
              }}
            >
              <h1 className="accent s-sling mb-6 p-5 text-3xl font-bold">
                ADMIN LOGIN
              </h1>
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                <input
                  {...register("email")}
                  type="text"
                  className="mb-6 w-[390px] rounded-sm bg-viewSubmission p-3 placeholder-white"
                  placeholder="Enter Username"
                  required
                />
                {errors?.email?.message && (
                  <p className="mb-4 text-viewSubmission">
                    {errors.email.message}
                  </p>
                )}
                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    className="w-[390px] rounded-sm bg-viewSubmission p-3 pr-10 placeholder-white"
                    placeholder="Enter Password"
                    required
                  />
                  <span
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-black"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                </div>
                {errors?.password?.message && (
                  <p className="mb-4 text-viewSubmission">
                    {errors.password.message}
                  </p>
                )}
                <button
                  type="submit"
                  className="s-sling mt-4 w-[100px] rounded-md bg-accent p-3 text-white"
                  disabled={isLoading}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <h1 className="s-sling pt-5 text-3xl font-bold text-white">
        A COOKING COMPETITION
      </h1>
    </div>
  );
}
