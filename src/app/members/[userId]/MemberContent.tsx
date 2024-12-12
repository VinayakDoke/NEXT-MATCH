'use client'
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react'
import { Member } from '@prisma/client'
import React from 'react'

type Props = {
    member: Member
}
export default function MemberContent({ member }: Props) {
    return (
        <Card className="w-full mt-5 h-[80vh]">
        <CardHeader className='text-2xl font-semibold text-secondary'>Profile</CardHeader>
        <Divider/>
        <CardBody>
            {member.description}
        </CardBody>
        </Card>
    )
}
