import axios from 'axios';
import { TOKEN } from './constant';
var token = localStorage.getItem(TOKEN);
var Axios = axios.create({
    baseURL: 'http://localhost:80' || 'http://192.249.18.120',
    headers: {
        authorization: token,
    },
});
export default Axios;
