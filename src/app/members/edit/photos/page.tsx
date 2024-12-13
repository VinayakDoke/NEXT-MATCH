import React from 'react'
import ProfilePhotoCard from './ProfilePhotoCard'
import { getAuthrisedUserId } from '@/app/actions/authActions'
import { getMemberByUserId, getMemberPhotosByUserId } from '@/app/actions/memberActions'

export default async function page() {
 const userId=await getAuthrisedUserId()
 const photos=await getMemberPhotosByUserId(userId)
 const member=await getMemberByUserId(userId)
    return (
    <div>{photos&&member?<ProfilePhotoCard photos={photos} member={member} />:""}</div>
  )
}
