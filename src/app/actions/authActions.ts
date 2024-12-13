'use server'

import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/lib/Prisma";
import { LoginSchema } from "@/lib/schemas/loginSchema";
import { registerSchema, RegisterSchema } from "@/lib/schemas/register";
import { ActionResult } from "@/types";
import { User } from "@prisma/client";
import bcrypt from 'bcryptjs'
import { AuthError } from "next-auth";


export async function registerUser(data: RegisterSchema): Promise<ActionResult<User>> {
    try {
        const validated = registerSchema.safeParse(data);
        if (!validated.success) {
            return { status: 'error', error: validated.error.errors }
        }
        const { name, email, password } = validated.data;
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await prisma.user.findUnique({
            where: { email: email }
        })
        if (existingUser) {
            return { status: 'error', error: 'User already exists' };
        }
        const user = await prisma.user.create({
            data: {
                name, email, passwordHash: hashedPassword
            }
        })
        return { status: 'success', data: user };
    } catch (error) {

        return { status: 'error', error: 'Something went wrong' };
    }

}
export async function getUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email }
     })
}
export async function getUserById(email: string) {
    return prisma.user.findUnique({ where: { email } })
}
export async function SignInUser(data: LoginSchema): Promise<ActionResult<string>> {
    try {
        const result = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        })
       
        return { status: "success", data: "Logged in" }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { status: "error", error: "Invalid credentials" }
                default:
                    return { status: "error", error: "Something went wrong" }
            }
        } else {
            return { status: "error", error: "Something went wrong" }
        }
    }
}

export async function UserSignOut() {  
   await signOut();
}

export async function getAuthrisedUserId(){
    const session = await auth();
    const userId = session?.user?.id
    if (!userId) throw new Error('Unauthorised')
    return userId
}