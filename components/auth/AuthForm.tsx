'use client';
import { useState, useTransition } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '../ui/use-toast';

import { useForm } from 'react-hook-form';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';

import { login } from '@/actions/login';
import { loginSchema, signupSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

export interface IAuthFormProps {
    label: string;
    labelText: string;
    backButtonText: string;
    backButtonHref: string;
    backButtonLabel: string;
    submitButton: string;
    schema: 'login' | 'register';
}

export default function AuthForm({
    label,
    labelText,
    backButtonText,
    backButtonHref,
    backButtonLabel,
    submitButton,
    schema,
}: IAuthFormProps) {
    const [isPending, startTransisiton] = useTransition();
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');

    const { toast } = useToast();
    const formSchema = schema === 'register' ? signupSchema : loginSchema;
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        setSuccess('');
        setError('');

        startTransisiton(() => {
            console.log(values);
            login(values).then((data) => {
                setError(data.error);
                setSuccess(data.success);
            });
            toast({
                title: 'Values Submitted',
                description: 'Values are in terminal',
            });
        });
    }
    // git fuck up

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
                                            disabled={isPending}
                                            type="email"
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
                                            placeholder="******"
                                            {...field}
                                            disabled={isPending}
                                            type="password"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is your mask key.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormError message={error} />
                        <FormSuccess message={success} />

                        <Button type="submit" disabled={isPending}>
                            {submitButton}
                        </Button>
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
