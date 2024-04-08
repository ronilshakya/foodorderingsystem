import React,{useEffect, useState} from 'react'
import profilePic from '../../../Header/img/1.png'
import useAddProfilePic from '../../../../hooks/useAddProfilePic';
import useGetProfilePic from '../../../../hooks/useGetProfilePic';
import LoadingSpinner from '../../../../assets/Spinner-1s-200px.svg';
import Button from '../../../template/Button';
import Swal from 'sweetalert2';

const UserInfo = (props) => {
    const { username, email, _id } = props.userData;
    const {addProfilePic} = useAddProfilePic();
    const [selectedImage, setSelectedImage] = useState(null);
    const {userImage,getProfilePic} = useGetProfilePic();
    const [isLoading, setIsLoading] = useState(true);

    const handleImageChange =(event)=>{
        setSelectedImage(event.target.files[0])
    }

    const handleFormSubmission = (event) =>{
        event.preventDefault();
        if(selectedImage){
            addProfilePic(_id,selectedImage)
            Swal.fire({
                position: "top",
                icon: "success",
                title: `Image Uploaded`,
                showConfirmButton: true
            })
        }else{
            Swal.fire({
                position: "top",
                icon: "error",
                title: `Please choose an image`,
                showConfirmButton: true
            })
        }
    }

    useEffect(()=>{
        getProfilePic(_id)
        .then(setIsLoading(false))
        .catch((error) => {
            console.error('Error fetching profile picture:', error);
            setIsLoading(false);
        });
    },[getProfilePic,_id,addProfilePic,handleFormSubmission])

  return (
    <>
        <h1 className='text-xl my-5'>User Info</h1>
        <div className='flex flex-col md:flex-row justify-center gap-8 items-center border border-neutral-300 rounded-xl px-4 py-6'>
            <div className='flex flex-col items-center'>
                <div className='ring-2 ring-neutral-300 w-32 h-32 overflow-hidden rounded-full mb-4'>
                    {isLoading?(
                        <img src={LoadingSpinner} alt="spinner" className='w-32' />
                    ):(
                        <img src={`${import.meta.env.VITE_BASE_URL}/userprofile/${userImage.profileImage}`} className='w-32' alt="prof" />
                    )}
                </div>
                <form onSubmit={handleFormSubmission} className='flex flex-col items-center'  encType='multipart/form-data'>
                    <label htmlFor="">Update Profile Picture</label>
                    <input type="file" name='upload-pic' className='block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-orange-50 file:text-orange-700
                        hover:file:bg-orange-100 my-3' onChange={handleImageChange}/>
                    <Button type='submit' width={{width:'15rem'}}>Upload</Button>
                </form>
            </div>
            <div className='text-center'>
                <div className='m-6'>
                    <h1 className='text-neutral-500'>Username</h1>
                    <h1 className='text-orange-500 text-3xl'>{username}</h1>
                </div>
                <div className='m-6'>
                    <h1 className='text-neutral-500'>Email</h1>
                    <h1 className='text-orange-500 text-3xl'>{email}</h1>
                </div>
            </div>
        </div>
    </>
  )
}

export default UserInfo