import axios from 'axios';
import { useState } from 'react';
import useAuth from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const useSignUp = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const registerUser = async (values) => {
        try {
            setError(null);
            setLoading(true);

            const response = await axios.post('http://localhost:8000/api/auth/signup', values);

            if (response.status === 201) {
                console.log(response.data.message);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${response.data.message}`,
                    showConfirmButton: false,
                    timer: 1000
                });
                login(response.data.token, response.data.user);
                navigate('/sign-in-form');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data.message);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `${error.response.data.message}`,
                    showConfirmButton: false,
                    timer: 1000
                });
            } else {
                console.error('Registration failed', error.message);
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `Registration failed: ${error.message}`,
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, registerUser };
};

export default useSignUp;
