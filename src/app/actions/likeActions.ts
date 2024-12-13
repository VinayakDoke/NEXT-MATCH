'use server'

import { auth } from "@/auth";
import { prisma } from "@/lib/Prisma";
import { boolean } from "zod"
import { getAuthrisedUserId } from "./authActions";

export async function toggleLikeMember(targetUserId: string, isLiked: boolean) {
    try {
        const userId = await getAuthrisedUserId();
        if (isLiked && userId) {
            await prisma.like.delete({
                where: {
                    sourceUserId_targetUserId: {
                        sourceUserId: userId,
                        targetUserId
                    }
                }
            })
        } else if (!isLiked && userId) {
            await prisma.like.create({
                data: {
                    sourceUserId: userId,
                    targetUserId

                }
            })
        }
    } catch (error) {
        throw error
    }
}

export async function fetchCurrentUserLikeIds() {
    try {
        const userId = await getAuthrisedUserId();
        const likeIds = await prisma.like.findMany(
            {
                where: {
                    sourceUserId: userId
                },
                select: {
                    targetUserId: true
                }
            }
        )
        return likeIds.map(like => like.targetUserId);
    } catch (error) {
        throw error
    }
}

export async function fetchLikedMembers(type = 'source') {
    try {
        const userId = await getAuthrisedUserId();
        switch (type) {
            case 'source':
                return await fetchSourceLikes(userId);
            case 'target':
                return await fetchTargetLikes(userId);
            case 'mutual':
                return await fetchMutualLikes(userId);
            default:
                break;
        }
    } catch (error) {
        throw error
    }
}

async function fetchSourceLikes(userId: string) {
    const sourceList=await prisma.like.findMany(
        {
            where:{
                sourceUserId:userId,    
            },
            select:{targetMember:true}
        }
    )
    return sourceList.map(item=>item.targetMember)
}
async function fetchTargetLikes(userId: string) {
    const sourceList=await prisma.like.findMany(
        {
            where:{
                targetUserId:userId,    
            },
            select:{sourceMember:true}
        }
    )
    return sourceList.map(item=>item.sourceMember)
}
async function fetchMutualLikes(userId: string) {
    const sourceList=await prisma.like.findMany(
        {
            where:{
                sourceUserId:userId,    
            },
            select:{targetUserId:true}
        }
    )
    const likeIds= sourceList.map(item=>item.targetUserId)

const mutualList=await prisma.like.findMany({
    where:{
        AND:[
            {targetUserId:userId},
            {sourceUserId:{in:likeIds}}
        ]
    },
    select:{sourceMember:true}
})


return mutualList.map(item=>item.sourceMember)
}