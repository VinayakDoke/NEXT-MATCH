import React from 'react'
import ProfilePhotoCard from './ProfilePhotoCard'
import { getAuthrisedUserId } from '@/app/actions/authActions'
import { getMemberPhotosByUserId } from '@/app/actions/memberActions'

export default async function page() {
 const userId=await getAuthrisedUserId()
 const photos=await getMemberPhotosByUserId(userId)
    return (
    <div>{photos&&<ProfilePhotoCard photos={photos}/>}</div>
  )
}
