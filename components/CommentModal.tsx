'use client';
import { Button } from '@/components/ui/button';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { User as NextUser } from '@nextui-org/react';

import { createComment, createReply } from '@/actions/comment';
import { useToast } from '@/components/ui/use-toast';
import { commentCreationSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface CommentModalProps {
    text: string;
    icon: React.JSX.Element;
    commentCount: number | undefined;
    postCreatorUsername: string | null | undefined;
    postId: string;
    signedInUserId: string | undefined;
    userImage: string;
    postCreatorImage: string;
    isPostComment: boolean;
}

export default function CommentModal({
    text,
    icon,
    commentCount,
    postCreatorUsername,
    postId,
    signedInUserId,
    userImage,
    postCreatorImage,
    isPostComment,
}: CommentModalProps) {
    const [isPending, setIsPending] = useState(false);
    const reloadPath = usePathname();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof commentCreationSchema>>({
        resolver: zodResolver(commentCreationSchema),
        defaultValues: {
            comment: '',
        },
    });

    async function onSubmit(values: z.infer<typeof commentCreationSchema>) {
        try {
            setIsPending(true);
            if (isPostComment) {
                const resp = await createComment(
                    {
                        postId: postId,
                        text: values.comment,
                        userId: signedInUserId
                            ? signedInUserId
                            : 'signedin user id not given',
                    },
                    reloadPath
                );
                if (resp.success) {
                    form.reset();
                    setIsPending(false);
                    toast({
                        title: 'Comment added.',
                    });
                }
            } else {
                const resp = await createReply(
                    postId, // Replace with the actual parent comment ID variable
                    signedInUserId
                        ? signedInUserId
                        : 'no id provided in comment modal error.', // Replace with the signed-in user's ID variable
                    values.comment, // The comment text from the form
                    reloadPath
                );
                if (resp.success) {
                    form.reset();
                    setIsPending(false);
                    toast({
                        title: 'Comment added.',
                    });
                }
            }
        } catch (error) {
            setIsPending(false);
            toast({
                title: 'Error while adding comment.',
                variant: 'destructive',
            });
            console.log(error);
        }
    }
    return (
        <>
            <Dialog>
                <DialogTrigger>
                    {' '}
                    <div className="cursor-pointer">
                        <div className="flex gap-x-2 justify-center">
                            {icon}
                            {commentCount}
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent className="">
                    <DialogHeader>
                        <DialogTitle>Comment</DialogTitle>
                        <DialogDescription className="">
                            <div className="w-full">
                                <div className="flex items-center ">
                                    <div>
                                        <NextUser
                                            as="button"
                                            name={null}
                                            description=""
                                            className="transition-transform"
                                            avatarProps={{
                                                src: postCreatorImage,
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-3 dark:text-white">
                                        {text}
                                    </div>
                                </div>
                                <div className="border-l-5 h-10 w-7 ml-4 mt-2"></div>
                                <div className="flex items-center">
                                    <div>
                                        <NextUser
                                            as="button"
                                            name={null}
                                            description=""
                                            className="transition-transform"
                                            avatarProps={{
                                                src: userImage,
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-3 dark:text-white w-full">
                                        <Form {...form}>
                                            <form
                                                onSubmit={form.handleSubmit(
                                                    onSubmit
                                                )}
                                            >
                                                <div className="flex justify-center items-center gap-x-2">
                                                    <div className="w-full basis-2/3">
                                                        <FormField
                                                            control={
                                                                form.control
                                                            }
                                                            name="comment"
                                                            disabled={isPending}
                                                            render={({
                                                                field,
                                                            }) => (
                                                                <FormItem>
                                                                    <FormControl>
                                                                        <Textarea
                                                                            placeholder="Post your reply..."
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                    <div className="basis-1/3">
                                                        <Button
                                                            type="submit"
                                                            disabled={isPending}
                                                            className="h-full w-full"
                                                        >
                                                            Submit
                                                        </Button>
                                                    </div>
                                                </div>
                                            </form>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}
