import React, { useEffect } from 'react'
import useGetContact from '../../../hooks/useGetContact'

const ContactUsInquiries = () => {

    const {getContacts, contactUsInquiries} = useGetContact();
    useEffect(()=>{
        getContacts()
    },[])

  return (
    <div className='page-template'>
        <h1 className='text-2xl my-7 font-semibold'>Total inquiries: {contactUsInquiries.length}</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contactUsInquiries.map((inquiry)=>(
                <div key={inquiry._id} className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-orange-500 hover:text-white transition-all group">
                    <div className='flex items-center justify-between'>
                        <h1 className='my-2 text-2xl font-bold tracking-tight'>{inquiry.subject}</h1>
                        <time className='my-3 text-sm font-normal leading-none text-gray-500 group-hover:text-gray-300'>{inquiry.dateOfSubmission}</time>
                    </div>
                    <h1 className='my-2 text-lg font-semibold tracking-tight'>From: {inquiry.fullName}</h1>
                    <h1>{inquiry.email}</h1>
                    <h1 className='my-2 font-normal text-gray-700 group-hover:text-neutral-200'>{inquiry.message}</h1>
                </div>
            ))}

        </div>
    </div>
  )
}

export default ContactUsInquiries