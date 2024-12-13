'use client'
import { Spinner, Tab, Tabs } from '@nextui-org/react'
import { Member } from '@prisma/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { Key, useTransition } from 'react'
import MemberCard from '../members/MemberCard'

type Props = {
    members: Member[],
    likeIds: string[]
}
export default function ListsTab({ members, likeIds }: Props) {
    const searchParams = useSearchParams()
    const router = useRouter();
    const pathname = usePathname()
    const [isPending, startTransition] = useTransition()
    const tabs = [
        { id: "source", label: "Member I have liked" },
        { id: "target", label: "Member that like me" },
        { id: "mutual", label: "Mutual likes" }
    ]
    function handleTabChange(key: Key) {
        startTransition(() => {
            const params = new URLSearchParams(searchParams)
            params.set('type', key.toLocaleString());
            router.replace(`${pathname}?${params.toString()}`)
        })

    }
    return (
        <div className='flex w-full flex-col mt-5 gap-5'>
            <Tabs
                aria-label='Like tabs'
                items={tabs}
                color='secondary'
                onSelectionChange={(key) => {
                    handleTabChange(key)
                }}
            >
                {
                    (items) => (
                        <Tab key={items.id} title={items.label}>
                            {
                                isPending?<div className='flex flex-cols justify-center items-center h-[60vh]'>
                                    <Spinner
                                    size="lg"
                                    label={"Loading..."}
                                    />
                                </div>: <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:md:grid-cols-3 xl:md:grid-cols-6 gap-8'>
                                {
                                    members?.length > 0 ? members.map((item) => (
                                        <MemberCard member={item} key={item.id} likeIds={likeIds} />
                                    )
                                    ) : ""
                                }
                            </div>
                            }
                           
                        </Tab>
                    )
                }
            </Tabs>
        </div>
    )
}
