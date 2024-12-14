'use client'
import { createMessage } from '@/app/actions/messageActions'
import { messageSchema, MessageSchema } from '@/lib/schemas/messageSchema'
import { handleFromServerErrors } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@nextui-org/react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { HiPaperAirplane } from 'react-icons/hi2'

export default function ChatForm() {
 const router=useRouter()
 const params=useParams<{userId:string}>()
 const userId = params.userId;
    const{reset,register,handleSubmit,setError,formState:{isSubmitting,isValid,errors}}=useForm<MessageSchema>({
    resolver:zodResolver(messageSchema)
 })
 const onSubmit=async(data:MessageSchema)=>{
   const result=await createMessage(userId,data)
   if(result.status=='error'){
    handleFromServerErrors(result,setError);
    router.refresh()
   }else{
    reset()
    router.refresh()
   }
 }
    return (
   <form onSubmit={handleSubmit(onSubmit)} className='w-full flex items-center gap-2'>
<Input
fullWidth
placeholder='Text here'
variant='faded'
{...register('text')}
isInvalid={!!errors.text}
errorMessage={errors.text?.message}
/>
<Button type='submit' isIconOnly
color='secondary'
radius='full'
isLoading={isSubmitting}
isDisabled={!isValid||isSubmitting}
>
    <HiPaperAirplane size={18}/>
</Button>

   </form>
  )
}
