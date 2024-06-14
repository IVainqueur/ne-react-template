import _ from 'axios';
import Cookies from 'js-cookie';
const baseUrl = import.meta.env.VITE_API_URL;

const axios = _.create({
   baseURL: baseUrl,
   headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
   },
});

export default axios;
