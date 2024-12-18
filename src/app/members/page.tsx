
import React from 'react'
import { auth, signOut } from '@/auth'
import { getMembers } from '../actions/memberActions';
import MemberCard from './MemberCard';
import { notFound } from 'next/navigation';
import { fetchCurrentUserLikeIds } from '../actions/likeActions';
import PaginationComponent from '../_component/PaginationComponent';
import { GetMemberParams, UserFilters } from '@/types';

export default async function page({searchParams}:{searchParams:GetMemberParams}) {
  const members = await getMembers(searchParams)
  console.log("members",members)
  const likeIds=await fetchCurrentUserLikeIds()
  if (!members) return notFound();
  const session=await auth();
  return (
    <>
    <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:md:grid-cols-3 xl:md:grid-cols-6 gap-8'>

      {members && members?.map((member) => {
        return (
          
          <MemberCard member={member} key={member.id} likeIds={likeIds}/>)
      })
      }
       
    </div>
    <PaginationComponent/>
    </>
  )
}
