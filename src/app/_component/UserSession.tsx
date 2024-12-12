import { auth, signOut } from '@/auth';
import React from 'react'
import UserMenu from './UserMenu';
import { Button } from '@nextui-org/react';

export default function UserSession() {
 
  return (
    <>
     <form action={async () => {
            'use server'
            await signOut();
          }}>
          <Button 
     variant="bordered" className="text-white">
            Sign Out
          </Button>
          </form>
    </>
  )
}
