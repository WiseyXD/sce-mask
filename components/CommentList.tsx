import { TComment } from '@/types';

import { Separator } from '@/components/ui/separator';
import { Avatar, Card, CardHeader } from '@nextui-org/react';
import moment from 'moment';
import Image from 'next/image';
import IconSection from './IconSection';

type TCommentListProps = {
    comments: TComment[] | null;
    signedInUserId: string;
    depth: number;
};

export default function CommentList({
    comments,
    signedInUserId,
    depth = 0,
}: Partial<TCommentListProps>) {
    console.log(comments);
    if (comments == null || comments.length === 0) {
        return <>No Comments yet!</>;
    }

    console.log(`Rendering depth ${depth}:`, comments);

    return (
        <div className={`flex flex-col gap-y-4 ${depth > 0 ? 'pl-8' : ''}`}>
            {comments.map((comment: TComment) => {
                return (
                    <div key={comment.id} className="">
                        <div className="flex-col px-2 py-2">
                            <Card
                                shadow="none"
                                className="w-full border-none bg-transparent"
                            >
                                <CardHeader className="justify-between">
                                    <div className="flex gap-3">
                                        <Avatar
                                            isBordered
                                            radius="full"
                                            size="md"
                                            src={
                                                comment.user?.image
                                                    ? comment.user?.image
                                                    : undefined
                                            }
                                        />
                                        <div className="flex items-center justify-center gap-1">
                                            <h4 className="text-small font-semibold leading-none text-default-600">
                                                {comment.user?.username}
                                            </h4>
                                            <p className="text-muted">·</p>
                                            <p className="text-muted">
                                                {moment(
                                                    comment?.time
                                                ).fromNow()}
                                            </p>
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>
                            <div className="flex-col pl-16">
                                <div>
                                    <h4 className="text-bs leading-none dark:text-white">
                                        {comment.text}
                                    </h4>
                                </div>
                                {comment.mediaLink && (
                                    <div className=" flex justify-center mt-3 mb-2">
                                        <Image
                                            src={comment.mediaLink}
                                            alt="Media"
                                            className="rounded-lg"
                                            sizes="100vw"
                                            style={{
                                                width: '70%',
                                                height: '30%',
                                            }}
                                            width={500}
                                            height={300}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <Separator className="" />
                        <IconSection
                            isPostComment={false}
                            bookmarks={comment.bookmarks || 0}
                            likeCount={comment.likeCount || 0}
                            postId={comment.id || 'comment id not given'}
                            signedInUserId={signedInUserId!}
                            commentCount={comment.replies?.length || 0}
                            originalText={comment?.text!}
                            postCreatorUsername={comment.user?.username!}
                        />

                        <Separator className="mt-2" />

                        {comment.replies && comment.replies.length > 0 && (
                            <CommentList
                                comments={comment.replies}
                                signedInUserId={signedInUserId}
                                depth={depth + 1} // Increase depth for nested replies
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
