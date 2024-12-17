'use server'

import { messageSchema, MessageSchema } from "@/lib/schemas/messageSchema";
import { ActionResult, MessageDto } from "@/types";
import { Message } from "@prisma/client";
import { getAuthrisedUserId } from "./authActions";
import { prisma } from "@/lib/Prisma";
import { mapMessageToMessageDto } from "@/lib/mappings";
import { tr } from "date-fns/locale";
import { pusherServer } from "@/lib/pusher";
import { createChatId } from "@/lib/utils";



const messageSelect={
    
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

export async function createMessage(recipientUserId: string, data: MessageSchema): Promise<ActionResult<MessageDto>> {
    try {
        const userId = await getAuthrisedUserId();
        const validated = messageSchema.safeParse(data)
        if (!validated.success) return { status: "error", error: validated.error.errors }
        const { text } = validated.data;
        const message = await prisma.message.create({
            data: {
                text: text,
                recipientId: recipientUserId,
                senderId: userId
            },
            select: messageSelect
        })
        const messageDto=mapMessageToMessageDto(message)
        await pusherServer.trigger(createChatId(userId,recipientUserId),'message:new',messageDto)
        await pusherServer.trigger(`private=${recipientUserId}`,'message:new',messageDto)
   
       
        return { status: "success", data: messageDto }
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
                    recipientId,
                    sederDeleted: false,
                }, {
                    senderId: recipientId,
                    recipientId: userId,
                    recipientDeleted: false,
                }
                ]
            },
            orderBy: {
                created: 'asc'
            },
            select: messageSelect
        })

        if (messages.length > 0) {
            const readMessageIds=messages.filter(m=>m.dateRead==null
                &&m.recipient?.userId==userId
                &&m.sender?.userId==recipientId
            ).map(m=>m.id)
            await prisma.message.updateMany({
                where: {
                  id:{in:readMessageIds}
                }, data: {
                    dateRead: new Date()
                }
            })
            await pusherServer.trigger(createChatId(recipientId,userId),'message:read',readMessageIds)
        }

      
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
            select: messageSelect
        })
        return messages.map((message) => mapMessageToMessageDto(message))
    } catch (error) {
        throw error
    }
}
export async function deleteMessage(messageId: string, isOutbox: boolean) {
    const select = isOutbox ? 'senderDeleted' : 'recipientDeleted'
    try {
        const userId = await getAuthrisedUserId()
        const selector = isOutbox ? 'sederDeleted' : 'recipientDeleted'
        await prisma.message.delete({
            where: { id: messageId },

        })

        // const messagesToDelete=await prisma.message.findMany({
        //     where:{
        //         OR:[
        //             {
        //                 senderId:userId,
        //                 sederDeleted:true,
        //                 recipientDeleted:true
        //             },{
        //                 recipientId:userId,
        //                 sederDeleted:true,
        //                 recipientDeleted:true
        //             }
        //         ]
        //     }
        // })
        // if(messagesToDelete.length>0){
        //     await prisma.message.deleteMany({
        //         where:{
        //             OR:messagesToDelete.map((m)=>({id:m.id}))
        //         }
        //     })
        // }
        return { status: 'sucesses', message: 'Message deleted succesfully' }
    } catch (error) {
        throw error
    }
}
