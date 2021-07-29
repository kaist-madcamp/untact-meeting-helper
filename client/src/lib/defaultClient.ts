import axios, { AxiosInstance } from 'axios';
import { TOKEN } from './constant';

const token = localStorage.getItem(TOKEN);

const Axios: AxiosInstance = axios.create({
  baseURL: 'http://143.248.194.185:80',
  headers: {
    authorization: token,
  },
});

export default Axios;
