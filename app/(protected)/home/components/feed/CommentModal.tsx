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
import { imageLink } from '@/lib/utils';
import { User as NextUser } from '@nextui-org/react';

import { createComment } from '@/actions/comment';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { revalidatePath } from 'next/cache';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface CommentModalProps {
    text: string;
    icon: React.JSX.Element;
    postCreatorUsername: string | null | undefined;
    postId: string;
    signedInUserId: string | undefined;
}

export default function CommentModal({
    text,
    icon,
    postCreatorUsername,
    postId,
    signedInUserId,
}: CommentModalProps) {
    const [isPending, setIsPending] = useState(false);
    const { toast } = useToast();

    const formSchema = z.object({
        comment: z.string().min(2).max(50),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: '',
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsPending(true);
            const resp = await createComment({
                postId: postId,
                text: values.comment,
                userId: signedInUserId
                    ? signedInUserId
                    : 'signedin user id not given',
            });
            if (resp.success) {
                form.reset();
                setIsPending(false);
                toast({
                    title: 'Comment added.',
                });
            }
            revalidatePath('/home');
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
                    <div className="cursor-pointer">{icon}</div>
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
                                                src: imageLink,
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-3 text-white">
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
                                                src: imageLink,
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-y-3 text-white w-full">
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
