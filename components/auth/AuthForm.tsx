"use client";
import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useToast } from "../ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";

interface IAuthFormProps {
    label: string;
    labelText: string;
    backButtonText: string;
    backButtonHref: string;
    backButtonLabel: string;
    submitButton: string;
}

const formSchema = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(7, "Churan 7 character se jyada daal")
        .max(21, "Churan 21 character se kam daal"),
});

export default function AuthForm({
    label,
    labelText,
    backButtonText,
    backButtonHref,
    backButtonLabel,
    submitButton,
}: IAuthFormProps) {
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
        toast({
            title: "Values Submitted",
        });
    }

    return (
        // <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="w-full lg:grid  lg:grid-cols-2 min-h-[100vh]">
            <div className="flex items-center justify-center py-12">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="mx-auto grid w-[350px] gap-6"
                    >
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">{label}</h1>
                            <p className="text-balance text-muted-foreground">
                                {labelText}
                            </p>
                        </div>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="shadcn"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is should be your college mail-id.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="shadcn"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is your mask key.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">{submitButton}</Button>
                        <div className="mt-4 text-sm flex gap-1 justify-center">
                            {backButtonLabel}
                            <Link
                                href={backButtonHref}
                                className="underline text-blue-500"
                            >
                                {backButtonText}
                            </Link>
                        </div>
                    </form>
                </Form>
            </div>
            <div className="hidden bg-muted lg:block">
                <Image
                    src="/placeholder.svg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
}
