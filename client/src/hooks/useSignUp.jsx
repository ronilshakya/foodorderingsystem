import axios from 'axios';
import { useState } from 'react';
import useAuth from '../context/authContext';
import { useNavigate } from 'react-router-dom';

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
                alert(response.data.message);
                login(response.data.token, response.data.user);
                navigate('/sign-in-form')
            } else if (response.status === 400) {
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

    return { loading, error, registerUser };
};

export default useSignUp;
