'use server';

import db from '@/lib/db';
import { validateRequest } from '../validateRequests';

export const createCommunity = async (name: string, description: string) => {
    try {
        const { user } = await validateRequest();
        if (!user) {
            return { success: false, msg: 'Forbidden request.' };
        }
        const community = await db.community.create({
            data: {
                creatorId: user?.id,
                name,
                description,
            },
        });
        return {
            success: true,
            msg: 'Community created.',
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            msg: 'Error occurred while creating community.',
        };
    }
};

export const followCommunity = async (communityId: string) => {
    try {
        const { user } = await validateRequest();
        if (!user) {
            return { success: false, msg: 'Forbidden request.' };
        }
        const newMemeber = await db.communityMember.create({
            data: {
                communityId,
                userId: user?.id,
            },
        });
        return {
            success: true,
            msg: 'Community followed.',
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            msg: 'Error occured while following community.',
        };
    }
};

export const unfollowCommunity = async (communityMemberId: string) => {
    try {
        const { user } = await validateRequest();
        if (!user) {
            return { success: false, msg: 'Forbidden request.' };
        }
        const deleteMember = await db.communityMember.delete({
            where: {
                id: communityMemberId,
            },
        });
        return {
            success: true,
            msg: 'Community unfollowed.',
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            msg: 'Error occured while unfollowing community.',
        };
    }
};
