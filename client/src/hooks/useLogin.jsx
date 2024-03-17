import axios from 'axios';
import { useState } from 'react';
import useAuth from '../context/authContext';
import { useNavigate } from 'react-router-dom';

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

            if (response.status === 200) {
                console.log(response.data.message);
                alert(response.data.message);
                login(response.data.token, response.data.user);
                navigate('/');
            } else if (response.status === 404) {
                setError(response.data.message);
            } else {
                console.error('Registration failed');
                alert('Registration failed');
            }
        } catch (error) {
            console.error('Registration failed', error);
            alert('Registration failed');
        } finally {
            setLoading(false); 
        }
    };

    return { loading, error, loginUser };
};

export default useLogin;
