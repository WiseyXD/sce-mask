export type UserRole = 'ADMIN' | 'USER';
export type TUserDetails = {
    userDetails: {
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
};
