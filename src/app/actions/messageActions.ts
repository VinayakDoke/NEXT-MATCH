'use server'

import { messageSchema, MessageSchema } from "@/lib/schemas/messageSchema";
import { ActionResult } from "@/types";
import { Message } from "@prisma/client";
import { getAuthrisedUserId } from "./authActions";
import { prisma } from "@/lib/Prisma";
import { mapMessageToMessageDto } from "@/lib/mappings";
import { tr } from "date-fns/locale";

export async function createMessage(recipientUserId: string, data: MessageSchema): Promise<ActionResult<Message>> {
    try {
        console.log("recipientUserId", recipientUserId)
        const userId = await getAuthrisedUserId();
        const validated = messageSchema.safeParse(data)
        if (!validated.success) return { status: "error", error: validated.error.errors }
        const { text } = validated.data;
        const message = await prisma.message.create({
            data: {
                text: text,
                recipientId: recipientUserId,
                senderId: userId
            }
        })
        return { status: "success", data: message }
    } catch (error) {

        return { status: "error", error: 'Something went wrong' }
    }
}
export async function getMessageThread(recipientId: string) {
    try {
        const userId = await getAuthrisedUserId();
        const messages = await prisma.message.findMany({
            where: {
                OR: [{
                    senderId: userId,
                    recipientId
                }, {
                    senderId: recipientId,
                    recipientId: userId
                }
                ]
            },
            orderBy: {
                created: 'asc'
            },
            select: {
                id: true,
                text: true,
                created: true,
                dateRead: true,
                sender: {
                    select: {
                        userId: true,
                        name: true,
                        image: true
                    }
                },
                recipient: {
                    select: {
                        userId: true,
                        name: true,
                        image: true
                    }
                }
            }
        })
        return messages.map((message) => (mapMessageToMessageDto(message)))
    } catch (error) {
        throw error
    }
}

export async function getMessageByContainer(container: string) {
    try {
        const userId = await getAuthrisedUserId()
        const selector = container === 'outbox' ? 'senderId' : 'recipientId'
        const messages = await prisma.message.findMany({
            where: {
                [selector]: userId
            }, orderBy: {
                created: 'asc'
            },
            select: {
                id: true,
                text: true,
                created: true,
                dateRead: true,
                sender: {
                    select: {
                        userId: true,
                        name: true,
                        image: true
                    }
                },
                recipient: {
                    select: {
                        userId: true,
                        name: true,
                        image: true
                    }
                }
            }
        })
        return messages.map((message) => mapMessageToMessageDto(message))
    } catch (error) {
        throw error
    }
}