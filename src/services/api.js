import axios from "axios";

const api = axios.create({
    baseURL: 'https://diel-backend.herokuapp.com/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

export default api