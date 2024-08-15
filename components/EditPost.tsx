'use client';
import { z } from 'zod';

import { postEditSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

import { editPost } from '@/actions/posts';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PencilIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useToast } from './ui/use-toast';

export default function EditPost({
    oldText,
    postId,
}: {
    oldText: string;
    postId: string;
}) {
    const pathname = usePathname();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof postEditSchema>>({
        resolver: zodResolver(postEditSchema),
        defaultValues: {
            text: oldText,
        },
    });

    async function onSubmit(values: z.infer<typeof postEditSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        try {
            const resp = await editPost(values.text, postId, pathname);
            if (!resp.success) {
                toast({
                    title: `${resp.msg}`,
                    variant: 'destructive',
                });
                return;
            }
            toast({
                title: `${resp.msg}`,
            });
            return;
        } catch (error) {
            console.log(error);
            toast({
                title: `Error while updating post`,
                variant: 'destructive',
            });
            return;
        }
    }

    return (
        <Sheet>
            <SheetTrigger>
                <PencilIcon />
            </SheetTrigger>
            <SheetContent side={'right'}>
                <SheetHeader>
                    <SheetTitle>Edit Post</SheetTitle>

                    <SheetDescription>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
                                <FormField
                                    control={form.control}
                                    name="text"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Caption</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Write here..."
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}
