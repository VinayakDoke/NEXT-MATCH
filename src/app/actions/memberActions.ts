'use server'

import { auth } from "@/auth";
import { prisma } from "@/lib/Prisma"
import { UserFilters } from "@/types";
import { Photo } from "@prisma/client";
import { addYears } from "date-fns";
import { getAuthrisedUserId } from "./authActions";

export async function getMembers(searchParams: UserFilters) {
    const session = await auth()
    if (!session?.user) return null
    const ageRange = searchParams?.ageRange?.toLocaleString()?.split(',') || [18, 100]
    const currentDate = new Date()
    const minDob = addYears(currentDate, -ageRange[1] - 1);
    const maxDob = addYears(currentDate, -ageRange[0]);
    const orderSelector = searchParams?.orderBy || 'updated'

const selectedGender=searchParams?.gender?.toString()?.split(',')||['male','female']

    try {
        return prisma.member.findMany(
            {
                where: {
                    AND: [
                        { dateOfBirth: { gte: minDob } },
                        { dateOfBirth: { lte: maxDob } },
                        {gender:{in:selectedGender}}
                    ],
                    NOT: {
                        userId: session.user.id
                    }
                },
                orderBy: {
                    [orderSelector]: 'desc'
                }
            }
        );
    } catch (error) {
        throw error
    }
}
export async function getMemberByUserId(userId: string) {
    try {
        return prisma.member.findUnique({ where: { userId } })
    } catch (error) {
        throw error
    }
}

export async function getMemberPhotosByUserId(userId: string) {
    try {
        const member = await prisma.member.findUnique({
            where: { userId },
            select: { photos: true }
        })
        if (!member) return null
        return member.photos.map(p => p) as Photo[]
    } catch (error) {
        throw error
    }
}

export async function updateLastActive() {

    const userId = await getAuthrisedUserId()
    try {
        return prisma.member.update({
            where: { userId },
            data: { updated: new Date() }
        })
    } catch (error) {
        throw error
    }
}