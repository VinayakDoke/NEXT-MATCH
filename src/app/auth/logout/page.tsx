'use client'
import { UserSignOut } from '@/app/actions/authActions';
import { signOut } from '@/auth'
import { useRouter } from 'next/navigation';
import React from 'react'

export default  function page() {
// const sessionRemove=await signOut();
const router=useRouter()
const handleSignOut = async () => {
  await UserSignOut();
  // Optionally redirect after sign-out
  window.location.href = '/';
    };

  React.useEffect(() => {
    handleSignOut();
  }, []);
  return (
    <></>
  )
}
