"use client"

import { CustomCard } from '../ui/custom/custom-card'
import GoogleSignin from './google-signin'

export function LoginCard() {
  const footer = (
    <div className='w-full flex items-center justify-center'>
      <p className='text-xs text-center text-muted-foreground'>By continuing, you agree with the Terms and Privacy Policy</p>
    </div>
  )
  return (
    <CustomCard
      title="Get access to 10M+ Characters"
      description="Sign up in just ten seconds"
      headerClassName='text-center'
      headerDescriptionClassName='text-foreground'
      contentClassName='flex items-center justify-center'
      className='border-none z-10 sm:ml-8 lg:ml-20 my-auto'
      footer={footer}
      footerClassName='mx-auto'
    >
      <GoogleSignin />
    </CustomCard>
  )
}
