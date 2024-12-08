"use client"
import React from 'react'
import Providers from '@/components/Providers'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import { FaRegSmile } from "react-icons/fa"; // importing an icon

export default function BackButton() {
  return (
    <Providers>
    <Button
      as={Link}
      href='/'
      color="primary"
      variant='bordered'
    >Go Back</Button>
  </Providers>
  )
}
