import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SigninPage = () => {
  return (
    <main  className='flex w-full h-screen items-center justify-center'>
        <SignIn/>
    </main>
  )
}

export default SigninPage