'use server'

import { auth, signIn, signOut } from "@/auth";
import { sendVerificationEmail } from "@/lib/mail";
import { prisma } from "@/lib/Prisma";
import { LoginSchema } from "@/lib/schemas/loginSchema";
import { registerSchema, RegisterSchema } from "@/lib/schemas/register";
import { generateToken, getTokenByEmail } from "@/lib/tokens";
import { ActionResult } from "@/types";
import { Photo, TokenType, User } from "@prisma/client";
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
    return prisma.user.findUnique({
        where: { email }
    })
}
export async function getUserById(email: string) {
    return prisma.user.findUnique({ where: { email } })
}
export async function SignInUser(data: LoginSchema): Promise<ActionResult<string>> {
    try {
        const existingUser = await getUserByEmail(data.email)
        if (!existingUser || !existingUser.email) {
            return { status: 'error', error: 'Invalid credential' }
        }
        if (!existingUser.emailVerified) {
            const token = await generateToken(existingUser.email, TokenType.VERIFICATION);
            await sendVerificationEmail(token.email, token.token)
            return {
                status: 'error',
                error: 'Please verify your email address before loggin in'
            }
        }

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

export async function getAuthrisedUserId() {
    const session = await auth();
    const userId = session?.user?.id
    if (!userId) throw new Error('Unauthorised')
    return userId
}

export async function UpdateUserImage(userId: string, photo: Photo) {
    await prisma.user.update({
        where: { id: userId },
        data: {
            image: photo.url
        }
    })

}

export async function verifyEmail(token: string): Promise<ActionResult<string>> {
    try {
        const existingToken = await getTokenByEmail(token);
        if (!existingToken) {
            return { status: 'error', error: 'Invalid token' }
        }
        const hasExpired = new Date() > existingToken.expires;
        if (hasExpired) {
            return { status: 'error', error: 'Token has expired' }
        }
        const existingUser=await getUserByEmail(existingToken.email)
        if(!existingUser){
            return { status: 'error', error: 'User not found' }
        }
        await prisma.user.update({
            where:{id:existingUser.id},
            data:{
                emailVerified:new Date()
            }
        })
        await prisma.token.delete({
            where:{id:existingToken.id}
        })
        return {status:'success',data:'Success'}
   
    } catch (error) {
    return { status: 'error', error: 'Something went wrong' }
}
}