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

  const handleUpdate = (id) => e =>{
    Swal.fire({
      title: `Update Food Item?`,
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
          id="swal2-input-category">`,

      showCancelButton: true,
      confirmButtonText: "Update",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#F97316",

      preConfirm: () => {
        const inputName = Swal.getPopup().querySelector('#swal2-input-name').value;
        const inputPrice = Swal.getPopup().querySelector('#swal2-input-price').value;
        const inputCategory = Swal.getPopup().querySelector('#swal2-input-category').value;
        return {inputName,inputPrice,inputCategory};
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const {inputName,inputPrice,inputCategory} = result.value;
        const newFoodItem = {
          name: inputName,
          price: inputPrice,
          category: inputCategory
        };
        updateFood(id, newFoodItem);
      }
    });
  }

  return (
    <div className='page-template'>
      <table>
        <thead>
          <tr>
            <th>Food name</th>
            <th>Food price</th>
            <th>Food category</th>
            <th>Food image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            foods.map((item,i)=>(
              <tr key={i+1}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td><img src={`http://localhost:8000/images/${item.image}`} className='w-10' alt="img" /></td>
                <td>
                  <div className='flex'>
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
  )
}

export default GetFoodItems