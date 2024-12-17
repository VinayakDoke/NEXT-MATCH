import { getMemberByUserId } from '@/app/actions/memberActions'
import { notFound } from 'next/navigation';
import React, { ReactNode } from 'react'
import MemberSidebar from '../MemberSidebar';

export default async function Layout({ children, params }: { children: ReactNode, params: { userId: string } }) {
 const userId=params&& params?.userId as string;
 if(!userId)return null
  const member = await getMemberByUserId(userId);
    const basePath =userId&& `/members/${userId}`
    const navLinks = [
      { name: 'Profile', href: `${basePath}` },
      { name: 'Photos', href: `${basePath}/photos` },
      { name: 'Chat', href: `${basePath}/chat` },
  
    ]
    if (!member) return notFound()

    return (
        <div className="grid grid-cols-12 gap-5 h-[80vh]">
        <div className="col-span-3">
          <MemberSidebar member={member} navLinks={navLinks} />
        </div>
        <div className="col-span-9 ">
          {children}
        </div>
      </div>
    )
}
