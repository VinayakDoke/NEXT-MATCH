
import React from 'react'
import BackButton from './BackButton'
import { auth, signOut } from '@/auth'
import { json } from 'stream/consumers';
import { getMembers } from '../actions/memberActions';
import Image from 'next/image';
import { calculateAge } from '@/lib/utils';
import Link from 'next/link';
import MemberCard from './MemberCard';
import { notFound } from 'next/navigation';
import { fetchCurrentUserLikeIds } from '../actions/likeActions';

export default async function page() {
  const members = await getMembers()
  const likeIds=await fetchCurrentUserLikeIds()
  if (!members) return notFound();
  return (
    <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:md:grid-cols-3 xl:md:grid-cols-6 gap-8'>

      {members && members?.map((member) => {
        return (
          <MemberCard member={member} key={member.id} likeIds={likeIds}/>)
      })
      }
    </div>

  )
}
