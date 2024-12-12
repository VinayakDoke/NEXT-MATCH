import { getMemberByUserId } from '@/app/actions/memberActions'
import { notFound } from 'next/navigation';
import React, { ReactNode } from 'react'
import MemberSidebar from '../MemberSidebar';

export default async function Layout({ children, params }: { children: ReactNode, params: { userId: string } }) {
    const member = await getMemberByUserId(params.userId);
    if (!member) return notFound()
    return (
        <div className="grid grid-cols-12 gap-5 h-[80vh]">
        <div className="col-span-3">
          <MemberSidebar member={member} />
        </div>
        <div className="col-span-9 ">
          {children}
        </div>
      </div>
    )
}
