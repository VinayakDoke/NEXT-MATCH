"use client"
import { registerUser } from '@/app/actions/authActions'
import { loginSchema, LoginSchema } from '@/lib/schemas/loginSchema'
import { registerSchema, RegisterSchema } from '@/lib/schemas/register'
import { handleFromServerErrors } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { GiPadlock } from 'react-icons/gi'
import { toast } from 'react-toastify'

export default function RegisterForm() {
  const { register, setError, formState: { errors, isValid }, handleSubmit } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
    shouldFocusError: true
  })
  const onSubmit = async (data: RegisterSchema) => {
    const result = await registerUser(data);
    if (result.status == "success") {
               toast.success("User Registered succesfully")           
           } else {
               handleFromServerErrors(result, setError)
               toast.error(errors?.root?.serverError?.message)
           }
  }
  return (
    <Card className='w-2/5 mx-auto'>

      <CardHeader className='flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center gap-2 text-secondary'>
          <div className='flex flex-rows items-center gap-3'>
            <GiPadlock size={30} />
            <h1 className='text-3xl font-semibold'>Register</h1>
          </div>
          <p className='text-neutral-500'>Welcome back to NextMatch</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <Input label="Name"
              variant='bordered'
              {...register("name")}

              isInvalid={!!errors.name}
              errorMessage={errors?.name?.message as string}
            />
            <Input label="Email"
              variant='bordered'
              {...register("email")}

              isInvalid={!!errors.email}
              errorMessage={errors?.email?.message as string}
            />
            <Input label="Password"
              variant='bordered'
              type='password'
              {...register("password")}
              isInvalid={!!errors.password}
              errorMessage={errors?.password?.message as string}
            />
            <Input label="Confirm Password"
              variant='bordered'
              type='password'
              {...register("confirm_password")}
              isInvalid={!!errors.confirm_password}
              errorMessage={errors?.confirm_password?.message as string}
            />
            <Button isDisabled={!isValid} fullWidth color='secondary' type={"submit"}>
              Register
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}
