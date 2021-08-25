import axios from 'axios';

export const uploadImage = axios.create({
    baseURL: 'https://api.cloudinary.com/v1_1/dyhww1ai4/image/upload',    
})