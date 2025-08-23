import React from 'react'

const VerifyEmail = () => {
  return (
    <div className='relative w-full h-[100%] overflow-hidden'>
        <div className='min-h-screen flex items-center justify-center px-4 bg-green-100'>
            <div className='bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm text-center'>
                <h2 className='text-xl md:text-2xl font-semibold text-green-700 mb-4 '>✅ Check Your Email</h2>
                <p className='text-gray-600 text-sm ' style={{fontFamily:"cursive"}}>We've sent you an email to verify your account. Please check your inbox and click the verification link</p>
            </div>
        </div>
      
    </div>
  )
}

export default VerifyEmail
