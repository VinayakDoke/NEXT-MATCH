'use server'

import { auth } from "@/auth";
import { prisma } from "@/lib/Prisma"
import { GetMemberParams, UserFilters } from "@/types";
import { Photo } from "@prisma/client";
import { addYears } from "date-fns";
import { getAuthrisedUserId } from "./authActions";

// GetMemberParams={
//     ageRange?:string;
//     gender?:string;
//     pageNumber?:string;
//     pageSize?:string;
//     orderBy?:string
// }
export async function getMembers({
    ageRange = '18,100',
    gender = 'male,female',
    orderBy = 'updated',
    pageNumber = '1',
    pageSize = '12',
}: GetMemberParams) {
    const userId = await getAuthrisedUserId();
    if (!userId) return null;

    try {
        // Parse age range and calculate DOB limits
        const [minAge, maxAge] = ageRange.split(',').map(Number);
        const currentDate = new Date();
        const minDob = addYears(currentDate, -maxAge); // Older DOB
        const maxDob = addYears(currentDate, -minAge); // Younger DOB

        // Validate orderBy
        const validOrderByFields = ['updated', 'created', 'name']; // Adjust as needed
        if (!validOrderByFields.includes(orderBy)) {
            throw new Error(`Invalid orderBy value: ${orderBy}`);
        }

        // Parse pagination parameters
        const page = parseInt(pageNumber, 10);
        const limit = parseInt(pageSize, 10);
        const skip = (page - 1) * limit;

        // Query Prisma
        return await prisma.member.findMany({
            where: {
                AND: [
                    { dateOfBirth: { gte: minDob } },
                    { dateOfBirth: { lte: maxDob } },
                    { gender: { in: gender.split(',') } },
                ],
                NOT: {
                    userId: userId,
                },
            },
            orderBy: {
                [orderBy]: 'desc',
            },
            skip, // Enable pagination
            take: limit,
        });
    } catch (error) {
        console.error('Error fetching members:', error);
        throw new Error('Failed to fetch members. Please try again.');
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