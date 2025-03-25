import React, { useEffect } from 'react'
import useGetAllFoodItems from '../../../hooks/useGetAllFoodItems'
import useDeleteFoodItem from '../../../hooks/useDeleteFoodItem';
import useUpdateFoodItem from '../../../hooks/useUpdateFoodItem';
import AdminDeleteButton from '../../template/AdminDeleteButton';
import AdminUpdateButton from '../../template/AdminUpdateButton';
import Swal from 'sweetalert2';


const GetFoodItems = () => {
  const {foods,getAllFoods} = useGetAllFoodItems();
  const {deleteFoodItem} = useDeleteFoodItem();
  const {updateFood,updatedFood} = useUpdateFoodItem();

  useEffect(()=>{
    getAllFoods();
  },[deleteFoodItem,getAllFoods,updatedFood]);

  const handleDelete = (id,name)=> e =>{
    Swal.fire({
      title: "Warning",
      text: `Are you sure you want to delete ${name}?`,
      icon:"question",
      position: "center",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#F97316"
    })
    .then(result=>{
      if(result.isConfirmed){
        deleteFoodItem(id);
      }
    })
  }

  const handleUpdate = (id) => (e) => {
    Swal.fire({
      title: 'Update Food Item?',
      html: `
        <input
          placeholder="Set name"
          type="text"
          class="swal2-input"
          id="swal2-input-name">
          
        <input
          placeholder="Set price"
          type="number"
          class="swal2-input"
          id="swal2-input-price">
          
        <input
          placeholder="Set category"
          type="text"
          class="swal2-input"
          id="swal2-input-category">
  
        <input
          placeholder="Set inventory"
          type="number"
          class="swal2-input"
          id="swal2-input-inventory">,
        <input
          placeholder="Set Description"
          type="text"
          class="swal2-input"
          id="swal2-input-description">`,

      showCancelButton: true,
      confirmButtonText: 'Update',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#F97316',
      preConfirm: () => {
        const inputName = Swal.getPopup().querySelector('#swal2-input-name').value;
        const inputPrice = Swal.getPopup().querySelector('#swal2-input-price').value;
        const inputCategory = Swal.getPopup().querySelector('#swal2-input-category').value;
        const inputInventory = Swal.getPopup().querySelector('#swal2-input-inventory').value;
        const inputDescription = Swal.getPopup().querySelector('#swal2-input-description').value;
        return { inputName, inputPrice, inputCategory, inputInventory, inputDescription };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { inputName, inputPrice, inputCategory, inputInventory, inputDescription } = result.value;
        const newFoodItem = {};
  
        if (inputName) newFoodItem.name = inputName;
        if (inputPrice) newFoodItem.price = parseFloat(inputPrice);
        if (inputCategory) newFoodItem.category = inputCategory;
        if (inputInventory) newFoodItem.inventory = parseInt(inputInventory, 10);
        if (inputDescription) newFoodItem.description = inputDescription;
  
        updateFood(id, newFoodItem);
      }
    });
  };

  return (
    <div className='page-template'>
      <h1 className='text-2xl my-4'>All Foods</h1>
      <h1 className='text-2xl my-4'>Total Foods: {foods.length}</h1>
      <div className='flex flex-col'>
        <div className="overflow-x-auto sm:mx-6 lg:mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className='min-w-full text-left text-sm font-semibold text-surface'>
                <thead className='bg-orange-500 text-white'>
                  <tr>
                    <th scope="col" className="table-data">SN.</th>
                    <th scope="col" className="table-data">Food name</th>
                    <th scope="col" className="table-data">Food price</th>
                    <th scope="col" className="table-data">Food category</th>
                    <th scope="col" className="table-data">Food image</th>
                    <th scope="col" className="table-data">Food inventory</th>
                    <th scope="col" className="table-data">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    foods.map((item,i)=>(
                      <tr key={i+1} className=''>
                        <td className="table-data whitespace-nowrap">{i+1}</td>
                        <td className="table-data whitespace-nowrap">{item.name}</td>
                        <td className="table-data whitespace-nowrap">{item.price}</td>
                        <td className="table-data whitespace-nowrap">{item.category}</td>
                        <td className="table-data whitespace-nowrap"><img src={`${import.meta.env.VITE_BASE_URL}/images/${item.image}`} className='w-10' alt="img" /></td>
                        <td className="table-data whitespace-nowrap">{item.inventory}</td>
                        <td className="table-data whitespace-nowrap">
                          <div className='flex gap-2'>
                            <AdminUpdateButton  onClick={handleUpdate(item._id)} />
                            <AdminDeleteButton onClick={handleDelete(item._id, item.name)} />
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GetFoodItems