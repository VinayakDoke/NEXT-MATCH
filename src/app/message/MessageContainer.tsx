'use client'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getMessageByContainer } from '../actions/messageActions'
import { MessageDto } from '@/types'
import MessageSidebar from './MessageSidebar'
import MessageTable from './MessageTable'

export default function MessageContainer() {
    const searchParams = useSearchParams()
    const [messageList,setMessageList]=useState<MessageDto[]|[]>([])
    useEffect(() => {
        async function getMessageSideBarData() {
            let search=searchParams.get('container')?searchParams.get('container'):'inbox'
            if(search){
            const messages = await getMessageByContainer(search)
           if(messages){setMessageList(messages)}else{
            setMessageList([])
           }
        }
        }
        getMessageSideBarData()
    }, [searchParams.get('container')])

    return (
        <div className='grid grid-cols-12 gap-5 h-[80] mt-10'>
             <div className='col-span-2'>
             <MessageSidebar messageList={messageList} setMessageList={setMessageList}/>
             </div>
             <div className='col-span-10'>
            <MessageTable messages={messageList}/>
             </div>
           </div>
    )
}
