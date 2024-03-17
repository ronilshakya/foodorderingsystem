import React from 'react'
import './contact.css'

const Contact = () => {
  return (
    <div className='page-template'>
      <div className='grid max-md:grid-rows-2 lg:grid-cols-2  mr-8'>
        <div>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.2132631444324!2d85.32729480948369!3d27.679802776099006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19ca771e9e55%3A0xc94f84d1f057520f!2sNagarjuna%20College%20of%20IT!5e0!3m2!1sen!2snp!4v1708773604034!5m2!1sen!2snp" width="600" height="450" style={{border:"0"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div>
          <form action="" className='flex flex-col gap-4'>
            <h1>Write Us</h1>
            <input type="text" className='contact-input' placeholder='Enter your full name'/>
            <input type="text" className='contact-input' placeholder='Enter your phone number'/>
            <input type="text" className='contact-input'placeholder='Enter your email address'/>
            <input type="text" className='contact-input'placeholder='Enter subject'/>
            <textarea name="" id="" cols="30" rows="10" className='contact-input' placeholder='Enter your message'></textarea>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact