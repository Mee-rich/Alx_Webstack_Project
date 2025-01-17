import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 8000,
	headers: {
		Accept: 'application/json',
	},
})

axiosClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('ExperoAuth');
		if (token) {
		  config.headers['X-token'] = token;
		}
		return config;
	  },
	  (error) => Promise.reject(error)
	);

export default axiosClient;