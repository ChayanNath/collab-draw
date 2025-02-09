"use client";

import { useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { CreateUserSchema } from "@workspace/common/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { BACKEND_URL } from "@/config";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@workspace/ui/hooks/use-toast";

type SignupFormData = z.infer<typeof CreateUserSchema>;

export function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(CreateUserSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      setLoading(true);
      await axios.post(`${BACKEND_URL}/auth/signup`, data);
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
      router.push("/signin");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast({
          title: "Error",
          description:
            err.response?.data?.message || "Failed to create account",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    } finally {
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
    </form>
  );
}
