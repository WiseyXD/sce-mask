'use client';
import { createPost } from '@/actions/posts';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { postCreationSchema } from '@/lib/schema';
import { UploadDropzone } from '@/lib/uploadthing';
import { imageLink } from '@/lib/utils';
import { TUserDetails } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button as NextButton, User as NextUser } from '@nextui-org/react';

import { BarChartHorizontal, Image, Smile, XIcon } from 'lucide-react';
import { useRef, useState } from 'react';
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
        icon: <BarChartHorizontal />,
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
    const [isPendingPost, setIsPendingPost] = useState<boolean>(false);
    const [isPendingUpload, setIsPendingUpload] = useState<boolean>(false);

    const { toast } = useToast();
    const [showDropzone, setShowDropzone] = useState<boolean>(false);
    // const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof postCreationSchema>>({
        resolver: zodResolver(postCreationSchema),
        defaultValues: {
            text: '',
        },
    });

    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const selectedFile = e.target.files?.[0] ?? null;
    //     setFile(selectedFile);

    //     if (fileUrl) {
    //         URL.revokeObjectURL(fileUrl);
    //     }

    //     if (selectedFile) {
    //         const url = URL.createObjectURL(selectedFile);
    //         setFileUrl(url);
    //     } else {
    //         setFileUrl(undefined);
    //     }
    // };

    async function onSubmit(values: z.infer<typeof postCreationSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        if (!userDetails) {
            return;
        }
        try {
            setIsPendingPost(true);
            setIsPendingPost(true);
            const resp = await createPost({
                text: values.text,
                userId: userDetails.id,
                mediaLink: fileUrl ? fileUrl : '',
            });
            if (resp.success) {
                form.reset();
                // setFile(null);
                setFileUrl(undefined);
                if (fileInputRef.current) {
                    fileInputRef.current.value = ''; // Clear the file input
                }
                toast({
                    title: 'Post created succesfully.',
                });
                setIsPendingPost(false);
                setIsPendingUpload(false);
                setShowDropzone(false);

                console.log(resp.msg);
            } else {
                setIsPendingPost(false);
                setIsPendingUpload(false);
                console.log(resp.msg);
            }
        } catch (error) {
            toast({
                title: 'Error occured while post creation.',
                variant: 'destructive',
            });
            setIsPendingPost(false);
            setIsPendingUpload(false);
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
                                        <Textarea
                                            placeholder="What's Happening?"
                                            className="border-0 w-full mb-4 resize-none"
                                            {...field}
                                            disabled={isPendingPost}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Separator />

                        {/* File preview */}

                        {/* {fileUrl && file && (
                            <div className="mt-4">
                                {file.type.startsWith('image/') ? (
                                    <img src={fileUrl} alt="Selected file" />
                                ) : file.type.startsWith('video/') ? (
                                    <video src={fileUrl} controls />
                                ) : null}
                            </div>
                        )} */}

                        <div className="flex justify-between pt-3">
                            <div className="flex items-center gap-x-2 text-blue-600">
                                {icons.map((item) => {
                                    return (
                                        <div
                                            className="cursor-pointer"
                                            key={item.text}
                                        >
                                            {showDropzone &&
                                            item.type == 'file' ? (
                                                <div className="flex ">
                                                    <UploadDropzone
                                                        className="cursor-pointer"
                                                        endpoint="imageUploader"
                                                        disabled={
                                                            isPendingUpload
                                                        }
                                                        onBeforeUploadBegin={(
                                                            files
                                                        ) => {
                                                            setIsPendingPost(
                                                                true
                                                            );

                                                            // Preprocess files before uploading (e.g. rename them)
                                                            return files.map(
                                                                (f) =>
                                                                    new File(
                                                                        [f],
                                                                        'renamed-' +
                                                                            f.name,
                                                                        {
                                                                            type: f.type,
                                                                        }
                                                                    )
                                                            );
                                                        }}
                                                        onUploadBegin={() => {
                                                            setIsPendingPost(
                                                                true
                                                            );
                                                        }}
                                                        onClientUploadComplete={(
                                                            res
                                                        ) => {
                                                            // Do something with the response
                                                            console.log(
                                                                'Files: ',
                                                                res[0]
                                                            );

                                                            setFileUrl(
                                                                res[0].url
                                                            );
                                                            setIsPendingPost(
                                                                false
                                                            );
                                                            toast({
                                                                title: 'File uploaded successfully.',
                                                            });
                                                        }}
                                                        onUploadError={(
                                                            error: Error
                                                        ) => {
                                                            // Do something with the error.
                                                            setIsPendingPost(
                                                                false
                                                            );
                                                            toast({
                                                                title: `ERROR! ${error.message}`,
                                                                variant:
                                                                    'destructive',
                                                            });
                                                        }}
                                                    />
                                                    {showDropzone ? (
                                                        <div
                                                            onClick={() => {
                                                                setShowDropzone(
                                                                    false
                                                                );
                                                                setIsPendingPost(
                                                                    false
                                                                );
                                                            }}
                                                            className="cursor-pointer"
                                                        >
                                                            <XIcon />
                                                        </div>
                                                    ) : null}
                                                </div>
                                            ) : item.type == 'file' ? (
                                                <div
                                                    className=""
                                                    onClick={() => {
                                                        setShowDropzone(true);
                                                        setIsPendingPost(true);
                                                    }}
                                                >
                                                    {item.icon}
                                                </div>
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
                                disabled={isPendingPost}
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
