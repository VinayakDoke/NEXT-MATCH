import React from 'react'
import NavBar from './NavBar'
import { auth } from '@/auth'

export default async function ParentNav() {
    const session= await auth()
    let user=null
    user=session?session?.user:null
  return (
    <>
    <NavBar user={user}/>
    </>
  )
}
