"use client";

import { useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { CreateUserSchema } from "@workspace/common/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import Link from "next/link";
import { BACKEND_URL } from "@/config";
import { useState } from "react";
import { Loader2 } from "lucide-react";

type SignupFormData = z.infer<typeof CreateUserSchema>;

export function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(CreateUserSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: SignupFormData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${BACKEND_URL}/auth/signup`, data);
      if (response.status === 201) {
        console.log("Signup successful:", response.data);
        router.push("/signin");
      }
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
        setError(error.response?.data || error.message);
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
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          {...register("name")}
          placeholder="John Doe"
          required
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
      </div>
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
        Sign Up {loading && <Loader2 className="animate-spin" />}
      </Button>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/signin" className="text-blue-500 hover:underline">
          Sign In
        </Link>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
