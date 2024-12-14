'use client'
import { MessageDto } from '@/types';
import { getKeyValue, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Key } from 'react'

type Props = {
    messages: MessageDto[]|[]
}
export default function MessageTable({ messages }: Props) {
    const searchParams = useSearchParams()
    const isOutbox = searchParams.get('container') == 'outbox';
const router=useRouter()
    const columns = [
        { key: isOutbox ? 'recipientName' : 'sendName', label: isOutbox ? 'Recipient' : 'Sender' },
        { key: 'text', label: 'Message' },
        {
            key: 'created', label: isOutbox ? 'Date send' : 'Date received'
        }
        
    ]

    const handleRowSelected=(key:Key)=>{
const message=messages.find(m=>m.id==key)
const url=isOutbox?`/members/${message?.recipientId}`:`/members/${message?.senderId}`
router.push(url+'/chat')
}
    return (
        <Table
            aria-label='Table with messages'
            selectionMode='single'
            onRowAction={(key) => { handleRowSelected(key)}}
        >
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={messages} emptyContent='No message for this container'>
                {(item) => (
                    <TableRow key={item.id} className='cursor-pointer'>
                        {(columnKey) => (
                            <TableCell>{
                                getKeyValue(item, columnKey)
                            }</TableCell>
                        )}

                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
