"use client";
import { usePresenceChannel } from '@/hooks/usePresenceChannel';
import { NextUIProvider } from '@nextui-org/react'
import React, { ReactNode } from 'react'
import { useNotificationChannel } from '../hooks/useNotificationChannel';

export default function Providers({children,userId}:{children:ReactNode,userId:string|null}) {
  usePresenceChannel()
  useNotificationChannel(userId)
  return (
    <NextUIProvider>{children}</NextUIProvider>
  )
}
