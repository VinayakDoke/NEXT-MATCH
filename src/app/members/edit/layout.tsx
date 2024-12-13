import { getMemberByUserId } from '@/app/actions/memberActions'
import { notFound } from 'next/navigation';
import React, { ReactNode } from 'react'
import MemberSidebar from '../MemberSidebar';
import { getAuthrisedUserId } from '@/app/actions/authActions';

export default async function Layout({ children }: { children: ReactNode }) {
  const userId = await getAuthrisedUserId();
  const member = await getMemberByUserId(userId);
  const basePath = `/members/edit`
  const navLinks = [
    { name: 'Edit Profile', href: `${basePath}` },
    { name: 'Update Photos', href: `${basePath}/photos` },

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
