import React from 'react'
import PhotoCard from './PhotoCard'

export default function page({ params }: { params: { userId: string } }) {
  return (
    <><PhotoCard userId={params.userId}/></>
  )
}
