import {z} from 'zod';

export const memberEditSchema=z.object({
    name:z.string().min(3,{message:"Name is required"}),
    description:z.string().min(2,{
        message:'Description is required'
    }),
    city:z.string().min(2,{
        message:'City is required'
    }),
    country:z.string().min(2,{
        message:'Country is required'
    })
})

export type MemberEditSchema=z.infer<typeof memberEditSchema>