"use client"
import React from 'react'
import Providers from '@/components/Providers'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { FaRegSmile } from "react-icons/fa"; // importing an icon
import { signOut } from '@/auth'

export default function SignOut() {
  return (
    <Providers>
    <Button
     onClick={()=>{
        'use server'
        signOut();
     }}
      href='/'
      color="primary"
      variant='bordered'
    >Go Back</Button>
  </Providers>
  )
}
