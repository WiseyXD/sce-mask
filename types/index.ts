export type UserRole = 'ADMIN' | 'USER';
// export type TUserDetails = {
//     id: string;
//     username: string | null;
//     email: string;
//     password: string;
//     description: string | null;
//     isEmailVerified: boolean;
//     image: string | null;
//     department: string | null;
//     yearOfAddmission: string | null;
//     role: UserRole;
//     followers: TFollower[];
//     following: TFollowing[];
// } | null;

export type TUserDetails = {
    id: string;
    username: string | null;
    description: string | null;
    email: string;
    password: string;
    isEmailVerified: boolean;
    image: string | null;
    department: string | null;
    yearOfAddmission: string | null;
    role: 'USER' | 'ADMIN'; // Assuming 'role' can be either 'USER' or 'ADMIN'
    followers: {
        id: string;
        followerId: string;
        followingId: string;
        createdAt: Date;
        follower: {
            id: string;
            username: string | null;
            image: string | null;
        };
    }[];
    following: {
        id: string;
        followerId: string;
        followingId: string;
        createdAt: Date;
        following: {
            id: string;
            username: string | null;
            image: string | null;
        };
    }[];
};

export type TFollower = {
    id: string;
    follower: {
        id: string;
        username: string | null;
        image: string | null;
    };
    followerId: string;
    followingId: string;
    createdAt: Date;
};

export type TFollowing = {
    id: string;
    following: {
        id: string;
        username: string | null;
        image: string | null;
    };
    followerId: string;
    followingId: string;
    createdAt: Date;
};

export type TPost = {
    id?: string;
    userId: string;
    text: string;
    mediaLink?: string | null; // Optional field
    time?: Date;
    likeCount?: number;
    bookmarks?: number;
    user?: {
        image?: string | null;
        username: string | null;
    };
    comments?: TComment[]; // Array
};

export type TComment = {
    id?: string;
    postId?: string | null; // postId can be null if the comment is a reply to another comment
    userId: string;
    text?: string; // Optional field
    mediaLink?: string; // Optional field
    time?: Date;
    likeCount?: number;
    bookmarks?: number;
    parentCommentId?: string | null; // Nullable field for replies
    user?: {
        image?: string | null;
        username: string | null;
    };
    replies?: TComment[]; // Optional array for replies to this comment
    commentLikes?: number; // Optional field for the number of likes
    commentBookmarks?: number; // Optional field for the number of bookmarks
};

export type TBookmark = {
    id: string;
    userId: string;
    postId: string;
    createdAt: Date;
    post: TPost;
};
