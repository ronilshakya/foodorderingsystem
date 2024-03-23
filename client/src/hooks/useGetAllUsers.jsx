import axios from "axios";
import { useState,useEffect } from "react";

const useGetAllUsers = () => {
    const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/auth/getallusers');
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return {users, getAllUsers};
}

export default useGetAllUsers