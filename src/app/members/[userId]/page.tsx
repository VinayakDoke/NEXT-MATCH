import { getMemberByUserId } from '@/app/actions/memberActions'
import React from 'react'
import MemberContent from './MemberContent';

export default async function page({params}:{params:{userId:String}}) {
  const member=await getMemberByUserId(params.userId.toString());
    return (
    <>{member&&<MemberContent member={member}/>}</>
  )
}

