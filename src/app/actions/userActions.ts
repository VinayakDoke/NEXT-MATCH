'use server'

import { Member } from "@prisma/client";
import { memberEditSchema, MemberEditSchema } from "../members/edit/memberEditSchema";
import { ActionResult } from "@/types";
import { getAuthrisedUserId } from "./authActions";
import { prisma } from "@/lib/Prisma";

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