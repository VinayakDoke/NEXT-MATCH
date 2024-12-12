import { z } from 'zod'
export const registerSchema = z.object({
    email: z.string().email({ message: "Email is required" }),
    name: z.string({ message: "Name is required" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one digit" })
        .regex(/[@$!%*?&#]/, { message: "Password must contain at least one special character (@$!%*?&#)" }),

    confirm_password: z.string().min(8, { message: "Confirm password must be at least 8 characters" }), // Added the same length validation
    }).refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"], // Error will be attached to 'confirm_password' field


})

export type RegisterSchema = z.infer<typeof registerSchema>