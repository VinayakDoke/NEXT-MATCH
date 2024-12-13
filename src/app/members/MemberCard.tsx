'use client';
import LikeButton from '@/components/LikeButton';
import { Card, CardFooter, Image } from '@nextui-org/react'
import { Member } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

type Props = {
    member: Member,
    likeIds:string[]
}

export default function MemberCard({ member,likeIds }: Props) {
   const hasLiked=likeIds.includes(member.userId)

    return (
        <Card as={Link} href={`/members/${member.userId}`} fullWidth>
            
            <Image
                isZoomed    
                alt={member?.name}
                width={"100%"}
                src={member?.image || '/image/user.png'}
                className='aspect-square object-cover'
            />
            <div className='absolute top-3 right-3 z-50' 
            onClick={(e)=>{
e.preventDefault()
            }}
            >
                <LikeButton targetId={member.userId} hasLiked={hasLiked}/>
            </div>
            <CardFooter className='absolute bottom-0 z-10 bg-dark-gradient'>
                <div className='flex flex-col text-white'>
                    <span className='font-semibold text-white'>{member?.name}</span>
                    <span className='text-sm text-white'>{member?.city}</span>
                </div>
            </CardFooter>
        </Card>

    )
}
