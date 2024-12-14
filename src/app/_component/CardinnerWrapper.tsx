'use client'
import { Card, CardBody, CardFooter, CardHeader, Divider } from '@nextui-org/react'
import React,{ReactNode} from 'react'

type Props={
    header:ReactNode|string,
body:ReactNode,
footer?:ReactNode
}
export default function CardinnerWrapper({header,body,footer}:Props) {
  return (
    <Card className="w-full mt-5 h-[80vh]">
      <CardHeader > 
        {typeof (header)=="string"?
        <div className='text-2xl font-semibold text-secondary'>{header}</div>: <>{header}</>
    }
      </CardHeader>
      <Divider />
      <CardBody>
       {body}
      </CardBody>
      {
        footer&&<CardFooter>
            {footer}
        </CardFooter>
      }
    </Card>
  )
}
