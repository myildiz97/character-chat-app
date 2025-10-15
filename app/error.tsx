'use client'

import { CustomButton } from '@/components/ui/custom/custom-button'
import { CustomHeading } from '@/components/ui/custom/custom-heading'
import { CustomText } from '@/components/ui/custom/custom-text'
import { ArrowLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ErrorPage() {
  const router = useRouter();
  return (
    <div className='flex flex-col items-center justify-start md:justify-center h-screen gap-2 p-4 pt-20 md:pt-4'>
      <CustomHeading variant='h1' className='text-center'>Sorry, something went wrong</CustomHeading>
      <CustomText variant='p'>Please try again later.</CustomText>
      <CustomButton onClick={() => router.back()}><ArrowLeftIcon className='size-4' /> Go back</CustomButton>
    </div>
  )
}