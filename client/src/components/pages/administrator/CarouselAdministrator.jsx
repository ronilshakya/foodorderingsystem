import React, { useEffect, useState } from 'react';
import useAddCarouselImage from '../../../hooks/useAddCarouselImage';
import useGetCarouselImage from '../../../hooks/useGetCarouselImage';
import useDeleteCarouselImage from '../../../hooks/useDeleteCarouselImage';
import Button from '../../template/Button'
import Swal from 'sweetalert2';
import { FaUpload } from 'react-icons/fa';
import AdminDeleteButton from '../../template/AdminDeleteButton';

const CarouselAdministrator = () => {
    const { addCarouselImage } = useAddCarouselImage();
    const { getCarouselImagefunction, getCarouselImages } = useGetCarouselImage();
    const { deleteCarouselImage } = useDeleteCarouselImage();
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        getCarouselImagefunction();
    }, [getCarouselImages]);

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleImageSubmission = (e) => {
        e.preventDefault();
        if (selectedImage) {
            const formData = new FormData();
            formData.append('image', selectedImage);
            addCarouselImage(formData);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Image Uploaded Successfully',
                showConfirmButton: false,
                timer: 1000,
            });
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'No image selected',
                showConfirmButton: false,
                timer: 1000,
            });
        }
    };
    const handleImageDeletion = (itemId) =>{
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure to delete this image?',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((res)=>{
            if(res.isConfirmed){
                deleteCarouselImage(itemId)
            }
        })
    }

    return (
        <div className="page-template">
            <h1 className='text-lg font-semibold'>Carousel Images</h1>
             <div className="flex items-center justify-center w-full my-4">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col gap-1 items-center justify-center pt-5 pb-6">
                        {selectedImage ? (
                            <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="h-24 w-24 mb-2" />
                        ):(
                            <FaUpload />
                        )}
                        <p className="text-sm text-gray-500 mb-2"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500">JPEG, PNG or JPG</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={handleImageChange} />
                    {selectedImage &&(
                        <Button onClick={handleImageSubmission}>Add</Button>
                    )}
                </label>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                {getCarouselImages.map((item) => (
                    <div key={item._id}>
                        <div className='relative group'>
                            <img className='group-hover:' src={`${import.meta.env.VITE_BASE_URL}/carousel/${item.carouselImage}`}  alt="" />
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                            <AdminDeleteButton className='hidden group-hover:block transition-all absolute top-1/2 left-1/2' onClick={()=>handleImageDeletion(item._id)}/>
                        </div>
                    </div>
                ))}
           
            </div>
        </div>
    );
};

export default CarouselAdministrator;
