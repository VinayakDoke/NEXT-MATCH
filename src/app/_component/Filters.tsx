'use client'
import { Button, Select, SelectItem, Slider } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import React from 'react'
import { IconBase } from 'react-icons'
import { FaFemale, FaMale } from 'react-icons/fa'
import { string } from 'zod'

export default function Filters() {
    const pathname = usePathname()
    let valueAtIndex0: string | null = null;
    const router = useRouter()
    const searchParams = useSearchParams()
    const orderList = [
        { label: 'Last active', value: 'updated' },
        { label: 'Newest members', value: 'created' }
    ]
    const selectGender = searchParams.get('gender')?.split(',') || ['male', 'female']

    const genders = [
        { value: 'male', icon: FaMale },
        { value: 'female', icon: FaFemale }
    ]
    const handleAgeSelect = (value: number[]) => {
        const params = new URLSearchParams(searchParams)
        params.set('ageRange', value.join(','))
        router.replace(`${pathname}?${params}`)
    }
    const handleOrderSelect = (value: any) => {
        if (!value || !Array.from(value).length) {
            console.error('No value selected');
            return;
        }

        valueAtIndex0 = Array.from(value)[0];
        const params = new URLSearchParams(searchParams);
        params.set('orderBy', valueAtIndex0.toString());
        router.replace(`${pathname}?${params}`);
    };

    const handleGenderSelect = (value: string) => {
        const params = new URLSearchParams(searchParams);
        if (selectGender.includes(value)) {
            params.set('gender', selectGender.filter(g => g != value).toString())
        } else {
            params.set('gender', [...selectGender, value].toLocaleString())
        }
        router.replace(`${pathname}?${params}`);
    }


    if (pathname != "/members") return null
    return (
        <div className='shadow-md py-2'>
            <div className='flex flex-row justify-around items-center'>
                <div className='flex gap-2 items-center'>
                    <div>Gender:</div>
                    {
                        genders.map(({ icon: Icon, value }) => (
                            <Button
                                onPress={(e) => {
                                    handleGenderSelect(value)
                                }}
                                key={value} size='sm' isIconOnly
                                color={selectGender.includes(value) ? 'secondary' : 'default'}
                            >
                                <Icon size={24} />
                            </Button>
                        ))
                    }
                </div>
                <div className='flex flex-row items-center gap-2 w-1/4'>
                    <Slider
                        label='Age range'
                        color='secondary'
                        size='sm'
                        minValue={18}
                        maxValue={100}
                        defaultValue={[18, 100]}
                        onChangeEnd={(value) => { handleAgeSelect(value as number[]) }}
                    />
                </div>
                <div className='w-1/4'>
                    <Select
                        size='sm'
                        fullWidth
                        placeholder='Order by'
                        variant='bordered'
                        color='secondary'
                        aria-label='Order by selector'
                        selectedKeys={new Set([searchParams.get('orderBy') || 'updated'])}
                        //    onSelectionChange={(value)=>handleOrderSelect(value)}
                        onSelectionChange={(value) => handleOrderSelect(value)}
                    >
                        {
                            orderList.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))
                        }
                    </Select>
                </div>
            </div>
        </div>
    )
}
