'use client'
import CardinnerWrapper from '@/app/_component/CardinnerWrapper'
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react'
import React, { useCallback, useEffect, useState } from 'react'
import ChatForm from './ChatForm'
import { Message } from '@prisma/client'
import { MessageDto } from '@/types'
import MessageBox from './MessageBox'
import { pusherClient } from '@/lib/pusher'
import { formateShortDateTime } from '@/lib/utils'

type Props = {
  messages: MessageDto[],
  userId: string,
  chatId: string
}

export default function ChatCard({ chatId, messages, userId }: Props) {
  const [messageChat, setMesageChat] = useState(messages)

  const handleNewMessage = useCallback((message: MessageDto) => {
   
    setMesageChat(prevState => {
      return [...prevState, message]
    })
  }, [])

  const handleReadMessage = useCallback((messageIds: string[]) => {
    setMesageChat(prevState =>
      prevState.map(message => messageIds?.includes(message.id)
        ? { ...message, dateRead: formateShortDateTime(new Date()) } : message
      )
    )
  }, [])

  useEffect(() => {
  
    const channel = pusherClient.subscribe(chatId);
    channel.bind('message:new', handleNewMessage )
    channel.bind('message:read', handleReadMessage)

    return () => {
      channel.unsubscribe();
      channel.unbind('message:new', handleNewMessage)
      channel.unbind('message:read', handleReadMessage)
    }
  }, [chatId, handleNewMessage,handleReadMessage])

  return (
    <>
      <CardinnerWrapper header='Chat'
        body={<div>{
          messageChat?.length === 0 ? <>
            "No messages to display "
          </>
            :
            <>
              {
                messageChat?.map((message) => {
                  return (
                    <div key={message.id}>
                      <MessageBox message={message} currentUserId={userId} />
                    </div>
                  )
                })
              }
            </>
        }
        </div>}
        footer={<ChatForm />}
      />
    </>
  )
}
