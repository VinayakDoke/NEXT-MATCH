'use client'
import { Card, CardBody, CardHeader, Divider, Image } from '@nextui-org/react'
import { Member, Photo } from '@prisma/client'
import React from 'react'
import StarButton from '@/components/StarButton'
import DeleteButton from '@/components/DeleteButton'
import ImageUploadButton from '@/components/ImageUploadButton'
import { useRouter } from 'next/navigation'
import { CloudinaryUploadWidgetResults } from 'next-cloudinary'
import { addImage } from '@/app/actions/userActions'
import { toast } from 'react-toastify'
import MemberPhoto from '@/components/MemberPhoto'

type Props = {
    photos: Photo[],
    member:Member
}
export default function ProfilePhotoCard({ photos ,member}: Props) {
    const router = useRouter()
    const onAddImage = async (result: CloudinaryUploadWidgetResults) => {
        if (result.info && typeof result.info === 'object') {
            await addImage(result.info.secure_url, result.info.public_id)
            router.refresh()
        } else {
            toast.error('Problem adding image')
        }

    }
    return (
        <Card className="w-full mt-5 h-[80vh]">
            <CardHeader className='text-2xl font-semibold text-secondary'><div>Profile Edit</div> 

            <div className='absolute right-3 mt-5 mb-2 ' style={{float:"right",font:"14px"}}>
                    <ImageUploadButton onUploadImage={onAddImage} />
                </div>
            </CardHeader>
            <Divider />

            <CardBody>        
                <MemberPhoto photos={photos} mainImageUrl={member?.image} editing={true}/>
            </CardBody>
        </Card>
    )

}
