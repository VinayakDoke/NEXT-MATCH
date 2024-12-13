import React from 'react'
import PhotoCard from './PhotoCard'
import { getMemberPhotosByUserId } from '@/app/actions/memberActions'

export default async function page({ params }: { params: { userId: string } }) {
  const Result =await getMemberPhotosByUserId(params.userId)
  return (
    <>{Result?<PhotoCard photoList={Result} />:""}</>
  )
}
