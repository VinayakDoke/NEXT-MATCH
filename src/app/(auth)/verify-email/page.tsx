import CardinnerWrapper from '@/app/_component/CardinnerWrapper'
import { verifyEmail } from '@/app/actions/authActions'
import { Spinner } from '@nextui-org/react'
import React from 'react'

export default async function page({searchParams}:{searchParams:{token:string}}) {
  const result= await verifyEmail(searchParams.token)
    return (
    <>
    <div className='flex flex-col space-y-4 items-center'>
        <div className='flex flex-row items-center'>
        <p>Verifying your email address. Please wait...</p>
        {!result&&<Spinner color='secondary'/>}
        </div>

    </div>
    </>
  )
}
