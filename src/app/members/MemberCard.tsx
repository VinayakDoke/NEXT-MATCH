'use client';
import { Card, CardFooter, Image } from '@nextui-org/react'
import { Member } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

type Props = {
    member: Member,
}

export default function MemberCard({ member }: Props) {
    return (
        <Card as={Link} href={`/members/${member.userId}`} fullWidth>
            <Image
                isZoomed
                alt={member?.name}
                width={300}
                src={member?.image || '/image/user.png'}
                className='aspect-square object-cover'
            />
            <CardFooter className='absolute bottom-0 z-10 bg-dark-gradient'>
                <div className='flex flex-col text-white'>
                    <span className='font-semibold text-white'>{member?.name}</span>
                    <span className='text-sm text-white'>{member?.city}</span>
                </div>
            </CardFooter>
        </Card>

    )
}
