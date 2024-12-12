import {z} from 'zod'
export const loginSchema=z.object({
    email:z.string().email({message:"Email is required"}),
    password:z.string( { message: "Password is required" })  
})

export type LoginSchema=z.infer<typeof loginSchema>