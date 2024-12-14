import React from 'react'
import ChatCard from './ChatCard'
import { getMessageThread } from '@/app/actions/messageActions'

export default async function page({params}:{params:{userId:string}}) {
  
  const messages=await getMessageThread(params?.userId)
  
  return (

    <>
    {messages?<ChatCard messages={messages} userId={params?.userId}/>:""}
    </>
  )
}
