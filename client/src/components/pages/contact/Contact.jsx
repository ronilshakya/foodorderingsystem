import React from 'react'
import Input from '../../template/Input';
import Button from '../../template/Button'

const Contact = () => {
  return (
    <div className='page-template'>
      <div className='grid grid-rows-2 grid-cols-1 lg:grid-cols-2 lg:grid-rows-1'>
        <div className='flex justify-center'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.2132631444324!2d85.32729480948369!3d27.679802776099006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19ca771e9e55%3A0xc94f84d1f057520f!2sNagarjuna%20College%20of%20IT!5e0!3m2!1sen!2snp!4v1708773604034!5m2!1sen!2snp" height="450" style={{border:"0",width:'95%'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div>
          <form action="" className='flex flex-col gap-4 bg-white'>
            <h1>Write Us</h1>
            <Input type="text"  placeholder='Enter your full name' />
            <Input type="text"  placeholder='Enter your email address' />
            <Input type="text"  placeholder='Enter subject' />
            <textarea  className="border border-neutral-400 p-2 rounded-md text-neutral-600 focus:border-orange-400 focus:outline-none" id="" cols="30" rows="8" placeholder='Enter your message'></textarea>
            <Button>Submit</Button> 
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact