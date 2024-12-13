import { getMemberByUserId } from '@/app/actions/memberActions'
import { notFound } from 'next/navigation';
import React, { ReactNode } from 'react'

export default async function Layout({ children }: { children: ReactNode}) {

    return (
        <div >
      
          {children}
       
      </div>
    )
}
