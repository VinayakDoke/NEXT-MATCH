import React from 'react'
import MessageSidebar from './MessageSidebar'
import { getMessageByContainer } from '../actions/messageActions'
import MessageContainer from './MessageContainer'

export default async function page() {
  
  return (
    <>
    <MessageContainer/>
    </>
  )
}
