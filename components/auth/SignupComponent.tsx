"use client";
import { useState } from "react";

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
import { CardWrapper } from "./CardWrapper";

const formSchema = z.object({
    username: z.string().min(2).max(50),
});

export default function SignupComponent() {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    return (
        <>
            <CardWrapper
                backButtonHref="/signup"
                headerLabel="Login"
                backButtonLabel="Dont have an account ?"
                showSocial={true}
                key={1}
            >
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="shadcn"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </CardWrapper>
        </>
    );
}

// <Card className="w-full max-w-sm">
//     <CardHeader>
//         <CardTitle className="text-2xl">Signup</CardTitle>
//         <CardDescription>
//             Enter your details below to create your account.
//         </CardDescription>
//     </CardHeader>
//     <CardContent className="grid gap-4">
//         <Form {...form}>
//             <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="space-y-8"
//             >
//                 <FormField
//                     control={form.control}
//                     name="username"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Username</FormLabel>
//                             <FormControl>
//                                 <Input
//                                     placeholder="shadcn"
//                                     {...field}
//                                 />
//                             </FormControl>
//                             <FormDescription>
//                                 This is your public display name.
//                             </FormDescription>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <Button type="submit">Submit</Button>
//             </form>
//         </Form>
//     </CardContent>
//     <CardFooter>
//         <Button className="w-full">Sign in</Button>
//     </CardFooter>
// </Card>
