"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { SignInSchema } from "@workspace/common/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import { useState } from "react";
import { Loader2 } from "lucide-react";

type SignupFormData = z.infer<typeof SignInSchema>;

export function SignInForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignInSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: SignupFormData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${BACKEND_URL}/auth/signin`, data);
      if (response.status === 201) {
        console.log("Signup successful:", response.data);
        router.push("/dashboard");
      }
      setLoading(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data || err.message);
        setError(err.response?.data?.message || err.message);
      } else {
        console.error("Unexpected error:", error);
        setError("Unexpected error");
      }
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="johndoe@example.com"
          required
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          required
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>
      <Button type="submit" className="w-full">
        Sign In {loading && <Loader2 className="animate-spin" />}
      </Button>
      <Link className="text-sm" href={"/signup"}>
        Dont have an account? Signup
      </Link>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
