import axios from 'axios';
import { useState } from 'react';
import useAuth from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const useLogin = () => {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const loginUser = async (values) => {
        try {
            setError(null);
            setLoading(true);

            const response = await axios.post('http://localhost:8000/api/auth/signin', values);

            if (response.status === 201) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${response.data.message}`,
                    showConfirmButton: false,
                    timer: 1000
                });

                login(response.data.token, response.data.user);
                navigate('/');
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
            }else if (error.response.status === 404) {
                setError('User not found');
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: 'User not found',
                    showConfirmButton: false,
                    timer: 1000
                });
            } else {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `Login failed: ${error.message}`,
                    showConfirmButton: false,
                    timer: 1000
                });
            }
            navigate('/sign-in-form');
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, loginUser };
};

export default useLogin;
