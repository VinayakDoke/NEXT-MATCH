
import React from 'react'
import BackButton from './BackButton'
import { auth, signOut } from '@/auth'
import { json } from 'stream/consumers';

export default async function page() {
 
  return (
    <>
      
      <div>page members</div>
      <BackButton />

    </>

  )
}
