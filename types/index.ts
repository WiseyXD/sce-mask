export type UserRole = 'ADMIN' | 'USER';
export type TUserDetails = {
    id: string;
    username: string | null;
    email: string;
    password: string;
    isEmailVerified: boolean;
    image: string | null;
    department: string | null;
    yearOfAddmission: string | null;
    role: UserRole;
} | null;

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
    postId: string;
    userId: string;
    text?: string; // Optional field
    mediaLink?: string; // Optional field
    time?: Date;
    likeCount?: number;
    bookmarks?: number;
    user?: {
        image?: string | null;
        username: string | null;
    };
};
