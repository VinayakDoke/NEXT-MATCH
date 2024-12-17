"use client";
import { usePresenceChannel } from '@/hooks/usePresenceChannel';
import { NextUIProvider } from '@nextui-org/react'
import React, { ReactNode } from 'react'

export default function Providers({children}:{children:ReactNode;}) {
  usePresenceChannel()
  return (
    <NextUIProvider>{children}</NextUIProvider>
  )
}
