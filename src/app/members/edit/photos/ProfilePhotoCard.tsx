'use client'
import { Card, CardBody, CardHeader, Divider, Image } from '@nextui-org/react'
import { Photo } from '@prisma/client'
import React from 'react'
import PhotoList from './PhotoList'
import StarButton from '@/components/StarButton'
import DeleteButton from '@/components/DeleteButton'
import ImageUploadButton from '@/components/ImageUploadButton'
import { useRouter } from 'next/navigation'
import { CloudinaryUploadWidgetResults } from 'next-cloudinary'
import { addImage } from '@/app/actions/userActions'
import { toast } from 'react-toastify'

type Props = {
    photos: Photo[]
}
export default function ProfilePhotoCard({ photos }: Props) {
    const router=useRouter()
    const onAddImage=async (result:CloudinaryUploadWidgetResults)=>{
if(result.info&& typeof result.info==='object'){
    await addImage(result.info.secure_url,result.info.public_id)
    router.refresh()
}else{
    toast.error('Problem adding image')
}
       
    }
    return (
        <Card className="w-full mt-5 h-[80vh]">
            <CardHeader className='text-2xl font-semibold text-secondary'> Profile Edit</CardHeader>
            <Divider />

            <CardBody>
                <div className='pt-5 pl-5'>
                    <ImageUploadButton onUploadImage={onAddImage}/>
                </div>
                <div className='grid grid-cols-5 gap-3'>
                    {photos && photos?.map((photo) =>
                    (
                        <div key={photo.id}>
                            <div className='relative' style={{ "width": "200px", "height": "200px" }}>
                                <Image
                                    width={200}
                                    height={200}
                                    src={photo.url}
                                    alt='Image of member'
                                    className='object-cover aspect-sqaure'
                                />
                                <div className='absolute top-3 left-3 z-50'>
                                    <StarButton selected={false} loading={false} />
                                </div>
                                <div className='absolute top-3 right-3 z-50'>
                                    <DeleteButton loading={false} />
                                </div>
                            </div>
                        </div>
                    )
                    )}
                </div>

            </CardBody>
        </Card>
    )

}
