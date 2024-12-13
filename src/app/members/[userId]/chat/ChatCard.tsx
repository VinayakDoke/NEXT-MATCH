'use client'
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react'
import React from 'react'

export default function ChatCard() {
  return (
    <Card className="w-full mt-5 h-[80vh]">
      <CardHeader className='text-2xl font-semibold text-secondary'> Chat</CardHeader>
      <Divider />
      <CardBody>
        Chat here
      </CardBody>
    </Card>
  )
}
