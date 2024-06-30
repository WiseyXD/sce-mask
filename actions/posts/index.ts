'use server';
import db from '@/lib/db';
import { TPost } from '@/types';

const createPost = (postData: TPost) => {
    db.post.create({
        data: {
            userId: postData.userId,
            text: postData.text,
            ...(postData.mediaLink && { mediaLink: postData.mediaLink }),
        },
    });
};
