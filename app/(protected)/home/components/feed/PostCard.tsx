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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { imageLink } from '@/lib/utils';
import { TPost } from '@/types';
import { User as NextUser } from '@nextui-org/react';
import { BookmarkPlus, Heart, MessagesSquare } from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type TPostCardProps = {
    username: string | null | undefined;
    post: TPost;
};

interface CommentModalProps {
    text: string;
    icon: React.JSX.Element;
    postCreatorUsername: string | null | undefined;
}

const postsIcons = [
    {
        text: 'Comment',
        icon: (
            <MessagesSquare className="hover:border border-blue-400 rounded-md duration-150 ease-in-out" />
        ),
        isModal: true,
        onClickFunction: () => {},
    },
    {
        text: 'Like',
        icon: (
            <Heart className="hover:border border-red-600 rounded-md duration-150 ease-in-out" />
        ),
        isModal: false,
        onClickFunction: () => {
            console.log('Like');
        },
    },
    {
        text: 'Bookmark',
        icon: (
            <BookmarkPlus className="hover:border border-blue-400 rounded-md duration-150 ease-in-out" />
        ),
        isModal: false,
        onClickFunction: () => {
            console.log('Bookmark');
        },
    },
];

export default function PostCard({ username, post }: Partial<TPostCardProps>) {
    return (
        <div className="flex flex-col">
            <div className="flex py-3 px-2">
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
                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-x-2">
                        <p className="font-semibold text-lg">{username}</p>
                        <p className="text-muted">
                            {/* {JSON.stringify(post?.time)} */}
                            {/* {moment(post?.time).format('MM/DD/YYYY')} */}
                            {moment(post?.time).fromNow()}
                        </p>
                    </div>
                    <div className="flex flex-col gap-y-3">
                        {post?.text}
                        {post?.mediaLink && (
                            <Image
                                src={post?.mediaLink}
                                alt="Media"
                                className="rounded-lg"
                                height={300}
                                width={300}
                            />
                        )}
                    </div>
                    <div className="flex justify-evenly gap-x-3 pt-2 ">
                        {postsIcons.map((item) => {
                            return (
                                <>
                                    {item.isModal ? (
                                        <CommentModal
                                            text={
                                                post?.text
                                                    ? post?.text
                                                    : 'No text'
                                            }
                                            icon={item.icon}
                                            postCreatorUsername={username}
                                        />
                                    ) : (
                                        <div
                                            key={item.text}
                                            className="cursor-pointer"
                                            onClick={item.onClickFunction}
                                        >
                                            {item.icon}
                                        </div>
                                    )}
                                </>
                            );
                        })}
                    </div>
                </div>
            </div>
            <Separator />
        </div>
    );
}

function CommentModal({ text, icon, postCreatorUsername }: CommentModalProps) {
    const formSchema = z.object({
        comment: z.string().min(2).max(50),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: '',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }
    return (
        <>
            <Dialog>
                <DialogTrigger>
                    {' '}
                    <div key={text} className="cursor-pointer">
                        {icon}
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Comment</DialogTitle>
                        <DialogDescription>
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
                                    <Form {...form}>
                                        <form
                                            onSubmit={form.handleSubmit(
                                                onSubmit
                                            )}
                                            className="flex items-center space-y-8"
                                        >
                                            <FormField
                                                control={form.control}
                                                name="comment"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Username
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder="shadcn"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormDescription>
                                                            This is your public
                                                            display name.
                                                        </FormDescription>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type="submit">
                                                Submit
                                            </Button>
                                        </form>
                                    </Form>
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}
