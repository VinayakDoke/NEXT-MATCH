
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

export default async function page() {
  const members = await getMembers()
  if(!members) return notFound();
  return (
    <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:md:grid-cols-3 xl:md:grid-cols-6 gap-8'>

      {/* {members && members?.map((member) => {
        return (
          <Link href={`/members/${member.userId}`} key={member.id} className=''>
            <div className="relative max-w-sm rounded overflow-hidden shadow-lg rounded-xl">
              {member?.image ? <Image className="w-full" src={member?.image} alt="Sunset in the mountains" width={200} height={200} /> : ""}
              <div className=" flex flex-col p-2 pl-3 justify-start   overflow-hidden absolute bottom-0 z-10 bg-dark-gradient" style={{width:"100%"}}>
                <div className="font-semibold text-xl  text-align-left  text-white">{member?.name}  {calculateAge(member.dateOfBirth)}</div>
                <p className="text-gray-700 text-base " style={{color:"white"}}>
                  {member?.city}
                </p>  

              </div>


            </div>


          </Link>

        )
      })} */}
{members && members?.map((member) =>{
  return(
  <MemberCard member={member} key={member.id}/>) })
  }
    </div>

  )
}
