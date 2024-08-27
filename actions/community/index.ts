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

export const getAllCommunitiesNotFollowedOrCreatedByUser = async () => {
    try {
        const { user } = await validateRequest();
        if (!user) {
            return {
                success: false,
                msg: `Forbidden Request.`,
            };
        }
        const communities = await db.community.findMany({
            where: {
                AND: [
                    { creatorId: { not: user.id } }, // Exclude communities created by the user
                    {
                        members: {
                            none: {
                                userId: user.id, // Exclude communities joined by the user
                            },
                        },
                    },
                ],
            },
        });
        console.log(communities);
        return {
            success: true,
            msg: communities,
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            msg: `Error occured while fetching all the communities.`,
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

export const unfollowCommunity = async (communityId: string) => {
    try {
        const { user } = await validateRequest();
        if (!user) {
            return { success: false, msg: 'Forbidden request.' };
        }
        const deleteMember = await db.communityMember.delete({
            where: {
                communityId_userId: {
                    communityId: communityId,
                    userId: user.id,
                },
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
