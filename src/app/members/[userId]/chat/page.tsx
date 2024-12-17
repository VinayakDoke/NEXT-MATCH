import React from 'react'
import ChatCard from './ChatCard'
import { getMessageThread } from '@/app/actions/messageActions'
import { getAuthrisedUserId } from '@/app/actions/authActions'
import { createChatId } from '@/lib/utils'

export default async function page({params}:{params:{userId:string}}) {
  const userId=await getAuthrisedUserId()
  const messages=await getMessageThread(params?.userId)
  const chatId=createChatId(userId,params?.userId)
  return (
    <>
    {messages?<ChatCard chatId={chatId} messages={messages} userId={params?.userId}/>:""}
    </>
  )
}
