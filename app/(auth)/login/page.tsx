"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { login } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { useFormStatus } from 'react-dom';
export default function LogInPage() {
  const { toast } = useToast();
   const { pending } = useFormStatus()
//    toast({
//        title: "Error when sign in",
//        description: state?.message,
//    });

    return (
        <div className="container relative h-[100dvh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full w-full flex-col bg-muted dark:border-r lg:flex">
                <Image
                    loading="eager"
                    fill
                    objectFit="cover"
                    src="https://assets.lummi.ai/assets/QmXarCVzUC6q6QGL56JJkWW7NucjkDrP4q6nsVQ72yzJ7q?auto=format&w=400"
                    alt="Girl Rockstar"
                />
            </div>
            <div className="pt-16 lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Sign In
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your username and password
                        </p>
                    </div>
                    <div className="grid gap-6">
                        <form action={login} method="POST">
                            <div className="grid gap-2">
                                <div className="grid gap-1">
                                    <Label className="py-2" htmlFor="username">
                                        Username
                                    </Label>
                                    <Input
                                        id="username"
                                        name="username"
                                        placeholder="username"
                                        autoComplete="username"
                                        required
                                        disabled={pending}
                                    />
                                    <Label className="py-2" htmlFor="password">
                                        Password
                                    </Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="****"
                                        required
                                        disabled={pending}
                                    />
                                </div>
                                <Button
                                    className="mt-2"
                                    type="submit"
                                    disabled={pending}
                                >
                                    Sign In with Email{" "}
                                </Button>
                            </div>
                        </form>
                    </div>
                    <Link href="/signup" className="text-center">
                        Don't have an account? Click to create one!
                    </Link>
                </div>
            </div>
        </div>
    );
}
