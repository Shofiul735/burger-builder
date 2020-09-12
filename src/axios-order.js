import axios from 'axios';

const instance = axios.create(
    {
        baseURL:"https://burger-builder-b18e4.firebaseio.com/"
    }
);
export default instance;