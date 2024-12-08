"use client"
import Providers from '@/components/Providers'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import { FaRegSmile } from "react-icons/fa"; // importing an icon

export default function MyButton() {
  return (
    <Providers>
      <Button
        as={Link}
        href='/members'
        color="primary"
        startContent={<FaRegSmile size={20} />}
        variant='bordered'
      >click me</Button>
    </Providers>
  )
}
