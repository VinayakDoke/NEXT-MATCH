'use server'

import { User, Member, Photo } from "@prisma/client";
import { memberEditSchema, MemberEditSchema } from "../members/edit/memberEditSchema";
import { ActionResult } from "@/types";
import { getAuthrisedUserId, UpdateUserImage } from "./authActions";
import { prisma } from "@/lib/Prisma";
import { cloudinary } from "@/lib/cloudinary";

export async function updateMemberProfile(data: MemberEditSchema): Promise<ActionResult<Member>> {
    try {

        const userId = await getAuthrisedUserId();
        const validated = memberEditSchema.safeParse(data);
        if (!validated.success) return { status: 'error', error: validated.error.errors }
        const { name, description, city, country } = validated.data
        const member = await prisma.member.update({
            where: { userId },
            data: {
                name, description, city, country

            }
        })
        return { status: "success", data: member }
    } catch (error) {
        return { status: 'error', error: "Something went" }
    }
}

export async function addImage(url: string, publicId: string) {
    try {
        const userId = await getAuthrisedUserId()
        return await prisma.member.update({
            where: { userId },
            data: {
                photos: {
                    create: [
                        {
                            url, publicId
                        }
                    ]
                }
            }
        })
    } catch (error) {
        throw error
    }
}

export async function setMainImage(photo: Photo) {
    try {
        const userId = await getAuthrisedUserId()
        await UpdateUserImage(userId, photo)
        return await prisma.member.update({
            where: { userId },
            data: { image: photo.url }
        })
    } catch (error) {
        throw error
    }
}

export async function deleteImage(photo: Photo) {
    const userId = await getAuthrisedUserId();
    try {
        if (photo.publicId) {
            await cloudinary.v2.uploader.destroy(photo.publicId)
        }
        return prisma.member.update({
            where: { userId },
            data: {
                photos: {
                    delete: { id: photo.id }
                }
            }
        })
    } catch (error) {
        throw error
    }
}