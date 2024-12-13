'use client'
import { getMemberPhotosByUserId } from '@/app/actions/memberActions'
import { Card, CardBody, CardHeader, Divider, Image } from '@nextui-org/react'
import { Photo } from '@prisma/client'
import React, { useEffect, useState } from 'react'

type Props={
    photoList:Photo[]
}
export default function PhotoCard({photoList}:Props) {
   
    return (
        photoList&&
        <Card className="w-full mt-5 h-[80vh]">
            <CardHeader className='text-2xl font-semibold text-secondary'> Photos</CardHeader>
            <Divider />
            <CardBody>
                <div className='grid gird-cols-5 gap-3'>
                    {photoList && photoList?.map((photo) =>
                    (
                        <div key={photo.id}>
                            <Image
                                width={200}
                                height={200}
                                src={photo.url}
                                alt='Image of member'
                                className='object-cover aspect-sqaure'
                            />
                        </div>
                    )
                    )}
                </div>
            </CardBody>
        </Card>
    )
}
