import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://backend-chi-eight-81.vercel.app'
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
