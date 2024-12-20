"use client"
import { SignInUser } from '@/app/actions/authActions'
import { loginSchema, LoginSchema } from '@/lib/schemas/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { GiPadlock } from 'react-icons/gi'
import { toast } from 'react-toastify'

export default function LoginForm() {
  const router = useRouter()
  const { register, formState: { errors, isValid, isSubmitting }, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    shouldFocusError: true
  })
  const onSubmit = async (data: LoginSchema) => {

    const result = await SignInUser(data)
    if (result.status === "success") {
      router.push('/members')
    } else {
      toast.error(result.error as string)
    }
  }
  return (
    <Card className='w-2/5 mx-auto'>

      <CardHeader className='flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center gap-2 text-secondary'>
          <div className='flex flex-rows items-center gap-3'>
            <GiPadlock size={30} />
            <h1 className='text-3xl font-semibold'>Login</h1>
          </div>
          <p className='text-neutral-500'>Welcome back to NextMatch</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <Input label="Email"
              variant='bordered'
              {...register("email")}
              // aria-invalid={errors.email ? "true" : "false"}
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
            <Button
              isLoading={isSubmitting}
              isDisabled={!isValid} fullWidth color='secondary' type={"submit"}>
              Login
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}
