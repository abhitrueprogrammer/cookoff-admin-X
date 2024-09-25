"use client";
import { login } from "@/api/login";
// import cookoff from "@/assets/images/cookoff.svg";
import { loginFormSchema } from "@/schemas/forms/login";
import { zodResolver } from "@hookform/resolvers/zod";
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
      void router.push("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
    }
    setIsLoading(false);
  }
  return (
    <div className="min-w-screen flex min-h-screen flex-col items-center justify-center bg-[#202020] text-accent">
      <h1 className="pt-5 text-3xl font-bold">CODECHEF PRESENTS</h1>
      <div className="mt-8 flex w-full flex-row">
        <div className="flex w-1/2 flex-col">
          <div className="flex flex-col">
 {/* ``           <Image
              className="pl-14"
              src={cookoff as HTMLImageElement}
              alt="cookoff text"
              width={700}
              height={600}
            /> */}
          </div>
        </div>
        <div className="flex w-1/2">
          <div
            className="bg-viewSubmission mx-auto flex h-[510px] w-[420px] flex-col items-center justify-center text-white"
            style={{
              clipPath:
                "polygon(0 90px, 90px 0, 100% 0, 100% 10px, 100% 85%, 80% 100%, 0 100%, 0 100%)",
            }}
          >
            <div
              className="flex h-[575px] w-[435px] scale-95 flex-col items-center justify-center bg-black text-white"
              style={{
                clipPath:
                  "polygon(0 90px, 90px 0, 100% 0, 100% 10px, 100% 85%, 80% 100%, 0 100%, 0 100%)",
              }}
            >
              <h1 className="accent mb-6 p-5 text-3xl font-bold">
                START COOKING
              </h1>
              <input
                {...register("email")}
                type="text"
                className="bg-viewSubmission mb-6 w-[390px] rounded-sm p-3 placeholder-white"
                placeholder="Enter Username"
                required
              />
              {errors?.email?.message && (
                <p className="text-viewSubmission mb-4">
                  {errors.email.message}
                </p>
              )}
              <input
                {...register("password")}
                type="password"
                className="bg-viewSubmission mb-6 w-[390px] rounded-sm p-3 placeholder-white"
                placeholder="Enter Password"
                required
              />
              {errors?.password?.message && (
                <p className="text-viewSubmission mb-4">
                  {errors.password.message}
                </p>
              )}
              <br />
              <button
                className="w-[100px] rounded-md bg-accent p-3 text-white"
                disabled={isLoading}
                onClick={handleSubmit(onSubmit)}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
      <h1 className="pt-5 text-3xl font-bold text-white">
        NOT A COOKING COMPETITION
      </h1>
    </div>
  );
}
