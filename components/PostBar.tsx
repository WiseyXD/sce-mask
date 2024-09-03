'use client';
import { createPost } from '@/actions/posts';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { postCreationSchema } from '@/lib/schema';
import { UploadButton } from '@/lib/uploadthing';
import { TUserDetails } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button as NextButton, User as NextUser } from '@nextui-org/react';

import { BarChartHorizontal, Image, Smile, XIcon } from 'lucide-react';
import Link from 'next/link';
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

type TPostBarProps = {
    userDetails: TUserDetails;
};

export default function PostBar({ userDetails }: TPostBarProps) {
    const [isPendingPost, setIsPendingPost] = useState<boolean>(false);
    const [isPendingUpload, setIsPendingUpload] = useState<boolean>(false);

    const { toast } = useToast();
    const [showDropzone, setShowDropzone] = useState<boolean>(false);
    // const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
    const fileInputRef = useRef<HTMLInputElement>(null);
    console.log(userDetails);
    const form = useForm<z.infer<typeof postCreationSchema>>({
        resolver: zodResolver(postCreationSchema),
        defaultValues: {
            text: '',
            communityId: '',
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

    const community = 'ary';

    async function onSubmit(values: z.infer<typeof postCreationSchema>) {
        if (!userDetails) {
            return;
        }
        try {
            setIsPendingPost(true);
            console.log(values.communityId);

            const resp = await createPost({
                text: values.text,
                userId: userDetails.id,
                mediaLink: fileUrl ? fileUrl : '',
                communityId: values.communityId,
            });
            if (resp.success) {
                form.reset();

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
            setIsPendingPost(false);
            setIsPendingUpload(false);
            toast({
                title: 'Error occured while post creation.',
                variant: 'destructive',
            });
        }
    }

    return (
        <div className="flex py-3 px-2 ">
            <div>
                {userDetails?.id ? (
                    <Link href={`/user-profile/${userDetails.id}`}>
                        <NextUser
                            as="button"
                            name={null}
                            description=""
                            className="transition-transform"
                            avatarProps={{
                                src: userDetails.image!,
                            }}
                        />
                    </Link>
                ) : (
                    <NextUser
                        as="button"
                        name={null}
                        description=""
                        className="transition-transform"
                        avatarProps={{
                            src: userDetails?.image!,
                        }}
                    />
                )}
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
                        <FormField
                            control={form.control}
                            name="communityId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Community</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a community" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem
                                                value="everyone"
                                                key={1}
                                            >
                                                Everyone
                                            </SelectItem>
                                            {/* @ts-ignore */}
                                            {userDetails?.joinedCommunities?.map(
                                                (community: any) => {
                                                    return (
                                                        <SelectItem
                                                            value={
                                                                community
                                                                    .community
                                                                    .id
                                                            }
                                                            key={community.id}
                                                        >
                                                            {
                                                                community
                                                                    .community
                                                                    .name
                                                            }
                                                        </SelectItem>
                                                    );
                                                }
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        You can manage email addresses in your{' '}
                                        <Link href="/examples/forms">
                                            email settings
                                        </Link>
                                        .
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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

                        <div className="grid grid-cols-1 lg:grid-cols-2 justify-between pt-3 gap-y-3">
                            <div className="flex items-center justify-evenly lg:justify-start lg:gap-x-2 text-blue-600 ">
                                {icons.map((item) => {
                                    return (
                                        <div
                                            className="cursor-pointer"
                                            key={item.text}
                                        >
                                            {showDropzone &&
                                            item.type == 'file' ? (
                                                <div className="flex ">
                                                    <UploadButton
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
                                className="bg-blue-600 dark:text-white  rounded-full"
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
