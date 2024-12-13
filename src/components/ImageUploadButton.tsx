'use client'
import { CldUploadButton, CloudinaryUploadWidgetResults } from 'next-cloudinary'
import React from 'react'
import { HiPhoto } from 'react-icons/hi2'

type Props={
    onUploadImage:(result:CloudinaryUploadWidgetResults)=>void
}

export default function ImageUploadButton({onUploadImage}:Props) {
    return (
        <div>
            <CldUploadButton
                options={{ maxFiles: 1 }}
                onSuccess={
                    onUploadImage
                }
                signatureEndpoint={'/api/sign-image'}
                uploadPreset='nm-demo'
               
                className='flex items-center gap-2 text-secondary border-purple-900 border-2 rounded-lg py-2 px-4 hover:bg-secondary hover:text-white mb-3  ' 
            >
                <HiPhoto size={28} /><small style={{fontWeight:"normal"}}>Upload new image</small>
            </CldUploadButton>
        </div>
    )
}
