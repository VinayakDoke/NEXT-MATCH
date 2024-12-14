'use client'
import CardinnerWrapper from '@/app/_component/CardinnerWrapper'
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react'
import React from 'react'
import ChatForm from './ChatForm'
import { Message } from '@prisma/client'
import { MessageDto } from '@/types'
import MessageBox from './MessageBox'

type Props={
  messages:MessageDto[],
  userId:string
}

export default function ChatCard({messages,userId}:Props) {

  return (
    <>
    <CardinnerWrapper header='Chat'
    body={<div>{
      messages?.length===0?<>
      "No messages to display "
      </>
      :
      <>
      {
        messages?.map((message)=>{
          return(
            <div key={message.id}>
<MessageBox message={message} currentUserId={userId}/>
            </div>
          )
        })
      }
      </>
    }
    </div>}
    footer={<ChatForm/>}
    />
    </>
  )
}
