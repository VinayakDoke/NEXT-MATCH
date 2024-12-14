'use client'
import { MessageDto } from '@/types'
import { Chip } from '@nextui-org/react'
import clsx from 'clsx'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { GoInbox } from 'react-icons/go'
import { MdOutlineOutbox } from 'react-icons/md'

type Props={
    messageList:MessageDto[]|[],
    setMessageList:React.Dispatch<React.SetStateAction<MessageDto[] | []>>
}
export default function MessageSidebar({messageList,setMessageList}:Props) {

    const router = useRouter()
    const searchParams = useSearchParams()
    const [selected, setSelected] = useState<string>(searchParams.get('container') || 'inbox')
    const pathname = usePathname()
    const items = [
        { key: 'inbox', label: 'Inbox', icon: GoInbox, chip: true },
        { key: 'outbox', label: 'Outbox', icon: MdOutlineOutbox, chip: true },

    ]
    const handleSelect = (key: string) => {
        setSelected(key)
        const params = new URLSearchParams()
        params.set('container', key)
        router.replace(`${pathname}?${params}`)
        setMessageList([])
    }
 
    return (
        <div className='flex flex-col shadow-md roundede-lg cursor-pointer'>
            {
                items.map(({ key, icon: Icon, label, chip }) => (
                    <div key={key}
                        className={
                            clsx('flex flex-row items-center rounded-t-lg gap-2 p-3', {
                                'text-secondary font-semibold': selected === key,
                                'text-black hover:text-secondary/70': selected != key
                            })
                        }
                        onClick={() => {
                            handleSelect(key)
                        }}
                    >
                        <Icon size={24} />
                        <div className='flex justify-between flex-grow'>
                            <span>{label}</span>
                            {chip &&selected === key&& <Chip>{messageList?.length}</Chip>}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
