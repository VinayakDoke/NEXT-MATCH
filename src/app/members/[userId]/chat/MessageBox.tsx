'use client'
import { timeAgo } from '@/lib/utils'
import { MessageDto } from '@/types'
import { Avatar } from '@nextui-org/react'
import clsx from 'clsx'
import { formatDistance, parse } from 'date-fns'
import React from 'react'

type Props = {
    message: MessageDto,
    currentUserId: string
}

export default function MessageBox({ message, currentUserId }: Props) {
    const isCurrentUserSender = message.senderId == currentUserId

    const renderAvatar = () => {
        return <Avatar
            name={message.senderName}
            className='self-end'
            src={message.senderImage || 'images/user.png'}
        />
    }

    const messageContentClasses = clsx(
        'flex flex-col w-[50%] px-2 py-1', {
        'rounded-l-xl rounder-tr-xl text-white bg-blue-100': isCurrentUserSender,
        'rounded-l-xl rounder-tl-xl border-gray-200 bg-green-100': !isCurrentUserSender,
    }
    )
     function timeAgo(date: string) {
        const parsedDate = parse(date, "dd MM yy hh:mm:a", new Date());
      let sendDate=new Date(parsedDate)
      if (isNaN(sendDate.getTime())) {
        return "Invalid date";
      }
      return formatDistance(sendDate,new Date());
    }
    const renderMessageHeader = () => {
        return <div  className='flex w-full'>
            <div className={
                clsx('flex items-center w-3/5', {
                    'justify-between': isCurrentUserSender
                })
            }>
               
                <div className='flex'>
                    <span className='text-sm font-semibold text-gray-900'>{message.senderName}</span>
                    <span className='text-sm text-gray-500 ml-2'>{message.created}</span>
                   
                </div>
            </div>
            {
                    message.dateRead && message.recipientId === currentUserId ? (
                        <span className='text-xs text-black italic justify-end'>
                            Read {timeAgo(message.dateRead)}
                        </span>
                    ):<></>
                }
        </div>
    }
    const renderMessageContent = () => {
        return <div className={messageContentClasses}>
           {renderMessageHeader()}
            <p className='text-sm py-3 text-gray-900'>
                {
                    message.text
                }
            </p>
        </div>
    }


    return (
        <div className='grid grid-rows-1'>
            <div className={clsx('flex gap-2 mb-3', {
                'justify-end text-right': !isCurrentUserSender,
                'justify-start': isCurrentUserSender,
            })}>
                {
                    isCurrentUserSender && renderAvatar()
                }
                {renderMessageContent()}
                {
                    !isCurrentUserSender && renderAvatar()
                }
            </div>

        </div>
    )
}
