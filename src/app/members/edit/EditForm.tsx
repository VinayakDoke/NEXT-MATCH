'use client'
import { Member } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MemberEditSchema, memberEditSchema } from './memberEditSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Textarea } from '@nextui-org/react'
import { updateMemberProfile } from '@/app/actions/userActions'
import { handleFromServerErrors } from '@/lib/utils'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

type Props = {
    member: Member
}
export default function EditForm({ member }: Props) {
    const { register, handleSubmit, reset, setError,
        formState: { errors, isValid, isDirty, isSubmitting }
    } = useForm<MemberEditSchema>({
        resolver: zodResolver(memberEditSchema),
        mode: 'onTouched',
        shouldFocusError: true
    });
    const router = useRouter()
    const [status, setStatus] = useState<string>()
    useEffect(() => {
        if (member) {
            reset({
                name: member.name,
                description: member.description,
                city: member.city,
                country: member.country
            })
        }
    }, [member, reset])
    const onSubmit = async (data: MemberEditSchema) => {
        const result = await updateMemberProfile(data)
        if (result.status == "success") {
            toast.success("Profile updated succesfully")
            router.refresh()
            reset({ ...data })
        } else {
            handleFromServerErrors(result, setError)
            toast.error(errors?.root?.serverError?.message)
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4'>

            <Input
                label="Name"
                variant='bordered'
                {...register('name')}
                defaultValue={member.name}
                isInvalid={!!errors.name}
                errorMessage={
                    errors.name?.message
                }

            />
            <Textarea
                label='Description'
                variant='bordered'
                {...register('description')}
                isInvalid={!!errors?.description}
                errorMessage={
                    errors?.description?.message
                }
                minRows={6}

            />
            <div className='flex flex-cols-2 gap-2'>
                <Input
                    label="City"
                    variant='bordered'
                    {...register('city')}
                    defaultValue={member.city}
                    isInvalid={!!errors.city}
                    errorMessage={
                        errors.city?.message
                    }
                />
                <Input
                    label="Country"
                    variant='bordered'
                    {...register('country')}
                    defaultValue={member.country}
                    isInvalid={!!errors.country}
                    errorMessage={
                        errors.country?.message
                    }

                />
            </div>

            <Button
                type='submit'
                className='flex self-end'
                variant='solid'
                isDisabled={!isValid || !isDirty}
                isLoading={isSubmitting}
                color='secondary'
            >
                Update Profile
            </Button>
        </form>
    )
}
