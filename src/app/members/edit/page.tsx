import React from 'react'
import ProfileEditCard from './ProfileEditCard'
import { getAuthrisedUserId } from '@/app/actions/authActions'
import { getMemberByUserId } from '@/app/actions/memberActions';
import { notFound } from 'next/navigation';

export default async function page() {
 const userId=await getAuthrisedUserId();
 const member=await getMemberByUserId(userId)
 if(!member) return notFound()
    return (
    <div>{member&&<ProfileEditCard member={member}/>}</div>
  )
}
