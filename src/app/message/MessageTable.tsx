'use client'
import { MessageDto } from '@/types';
import { Avatar, Button, getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Key, useCallback, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai';
import { deleteMessage } from '../actions/messageActions';
import PresenceAvatar from '@/components/PresenceAvatar';

type Props = {
    messages: MessageDto[] | []
}
export default function MessageTable({ messages }: Props) {
    const searchParams = useSearchParams()
    const isOutbox = searchParams.get('container') == 'outbox';
    const router = useRouter()
    const columns = [
        { key: isOutbox ? 'recipientName' : 'senderName', label: isOutbox ? 'Recipient' : 'Sender' },
        { key: 'text', label: 'Message' },
        {
            key: 'created', label: isOutbox ? 'Date send' : 'Date received'
        },
        { key: 'action', label: 'Action' },
    ]

    const handleRowSelected = (key: Key) => {
        const message = messages.find(m => m.id == key)
        const url = isOutbox ? `/members/${message?.recipientId}` : `/members/${message?.senderId}`
        router.push(url + '/chat')
    }
const [isDeleting,setDeleting]=useState({id:"",loading:false})
    const handleDeleteMessage = async (message: MessageDto) => {
        setDeleting({id:message.id,loading:true})
        await deleteMessage(message.id,isOutbox)
        router.refresh()
        setDeleting({id:'',loading:false})
    }

    const renderCell = useCallback((item: MessageDto, columnKey: keyof MessageDto) => {
        const cellValue = item[columnKey]
        switch (columnKey) {
            case 'recipientName':
            case 'senderName':
                return (
                    <div className={`flex items-center gap-2 cursor-pointer ${!item.dateRead && !isOutbox ? 'font-semibold' : ''}`}>
                        {/* <Avatar
                            alt='Image of member'
                            src={(!isOutbox ? item.recipientImage : item.senderImage) || '/images/user.png'}
                        /> */}
                        <PresenceAvatar userId={isOutbox?item?.recipientId:item?.senderId}
                        src={isOutbox?item?.recipientImage:item?.senderImage}
                        />
                        <span>{cellValue}</span>
                    </div>
                )
            case 'text':
                return (
                    <div className='truncate'>
                        {cellValue}
                    </div>
                )
            case 'created':
                return cellValue


            default:
                return (
                    <Button onPress={()=>{
                        handleDeleteMessage(item)
                    }} 
                    isLoading={isDeleting.id==item.id}
                    isIconOnly variant='light'>
                        <AiFillDelete size={24} className='text-danger' />
                    </Button>
                )
        }
    }, [isOutbox])

    return (
        <Table
            aria-label='Table with messages'
            selectionMode='single'
            onRowAction={(key) => { handleRowSelected(key) }}
        >
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={messages} emptyContent='No message for this container'>
                {(item) => (
                    <TableRow key={item.id} className='cursor-pointer'>
                        {(columnKey) => (
                            <TableCell>
                                {/* <div className={`${!item.dateRead && !isOutbox ? 'font-semibold' : ''}`}>
                                    {
                                        getKeyValue(item, columnKey)
                                    }</div> */}
                                {renderCell(item, columnKey as keyof MessageDto)}
                            </TableCell>
                        )}

                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
