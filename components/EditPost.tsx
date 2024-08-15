'use client';
import { z } from 'zod';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { postEditSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { deletePost, editPost } from '@/actions/posts';
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
import { EllipsisVertical } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { Separator } from './ui/separator';
import { useToast } from './ui/use-toast';

export default function EditPost({
    oldText,
    postId,
}: {
    oldText: string;
    postId: string;
}) {
    const [isPending, startTransition] = useTransition();
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
            startTransition(async () => {
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
            });
        } catch (error) {
            console.log(error);
            toast({
                title: `Error while updating post`,
                variant: 'destructive',
            });
            return;
        }
    }

    async function deletePostById() {
        try {
            const resp = await deletePost(postId, pathname);
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
        <Dialog>
            <DialogTrigger>
                {' '}
                <EllipsisVertical />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="py-3">Edit Post</DialogTitle>
                    <DialogDescription>
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
                                                    disabled={isPending}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex gap-2">
                                    <Button type="submit" disabled={isPending}>
                                        Submit
                                    </Button>
                                </div>
                            </form>
                            <Separator className="my-3" />
                            <Button
                                className="w-full"
                                variant={'destructive'}
                                disabled={isPending}
                                onClick={deletePostById}
                            >
                                Delete
                            </Button>
                        </Form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
