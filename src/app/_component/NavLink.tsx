"use client"
import { NavbarItem } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props={
    url:string;
    lable:string
}

export default function NavLink({url,lable}:Props) {
    const pathname=usePathname()
   const isActive=pathname==url
  return (
    <NavbarItem   isActive={isActive} style={{ color: isActive ? '#FFA500' : 'white' }}>
    <Link href={url}>{lable}</Link>
  </NavbarItem>
  )
}


