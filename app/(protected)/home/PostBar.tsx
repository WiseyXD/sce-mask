'use client';
import { createPost } from '@/actions/posts';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { postCreationSchema } from '@/lib/schema';
import { imageLink } from '@/lib/utils';
import { TUserDetails } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button as NextButton, User as NextUser } from '@nextui-org/react';
import { Image, Smile } from 'lucide-react';
import { useRef, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const icons = [
    {
        text: 'Image',
        icon: <Image />,
        type: 'file',
    },
    {
        text: 'Poll',
        icon: <Image />,
    },
    {
        text: 'Emoji',
        icon: <Smile />,
    },
    // {
    //     text: 'Schedule',
    //     icon: <CalendarRangeIcon />,
    // },
];

export default function PostBar({ userDetails }: NonNullable<TUserDetails>) {
    const [isPending, startTransisiton] = useTransition();
    const { toast } = useToast();
    const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof postCreationSchema>>({
        resolver: zodResolver(postCreationSchema),
        defaultValues: {
            text: '',
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] ?? null;
        setFile(selectedFile);

        if (fileUrl) {
            URL.revokeObjectURL(fileUrl);
        }

        if (selectedFile) {
            const url = URL.createObjectURL(selectedFile);
            setFileUrl(url);
        } else {
            setFileUrl(undefined);
        }
    };

    async function onSubmit(values: z.infer<typeof postCreationSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        if (!userDetails) {
            return;
        }
        try {
            startTransisiton(async () => {
                const resp = await createPost({
                    text: values.text,
                    userId: userDetails.id,
                    mediaLink: fileUrl ? fileUrl : '',
                });
                if (resp.success) {
                    form.reset();
                    setFile(null);
                    setFileUrl(undefined);
                    if (fileInputRef.current) {
                        fileInputRef.current.value = ''; // Clear the file input
                    }
                    toast({
                        title: 'Post created succesfully.',
                    });
                    console.log(resp.msg);
                } else {
                    console.log(resp.msg);
                }
            });
        } catch (error) {
            toast({
                title: 'Error occured while post creation.',
                variant: 'destructive',
            });
        }
    }

    return (
        <div className="flex py-3 px-2 ">
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
            <div className=" w-full">
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
                                    <FormControl>
                                        <Input
                                            placeholder="What's Happening?"
                                            className="border-0 w-full mb-4"
                                            {...field}
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Separator />
                        {fileUrl && file && (
                            <div className="mt-4">
                                {file.type.startsWith('image/') ? (
                                    <img src={fileUrl} alt="Selected file" />
                                ) : file.type.startsWith('video/') ? (
                                    <video src={fileUrl} controls />
                                ) : null}
                            </div>
                        )}

                        <div className="flex justify-between pt-3">
                            <div className="flex items-center gap-x-2 text-blue-600">
                                {icons.map((item) => {
                                    return (
                                        <div className="" key={item.text}>
                                            {item.type == 'file' ? (
                                                <Input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    accept="image/jpg,image/png,image/webp,image/jpg,image/gif,video/mp4,video/webm"
                                                    name="media"
                                                    onChange={handleFileChange}
                                                />
                                            ) : (
                                                item.icon
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                            <NextButton
                                className="bg-blue-600 text-white  rounded-full"
                                type="submit"
                                disabled={isPending}
                            >
                                Post
                            </NextButton>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
