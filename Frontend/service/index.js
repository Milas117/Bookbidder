import $router from '@/router';
import axios from 'axios';
import store from '@/store'; 


let service = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 1000
});

service.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            if (error.response.status === 401) {
                store.dispatch('updateUser', null); 
                $router.push('/login');
            }
        }
        return Promise.reject(error);
    }
);

const registerUser = async (username, email, password) => {
    try {
        const response = await service.post('/register', { username, email, password });
        const data = response.data;
        const token = data.token;

        const user = data.user;

        console.log('user: ', user, token);

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user)); 

        store.dispatch('updateUser', user); 

        $router.push('/'); 
        return data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

const handleSignIn = async (email, password) => {
    try {
        const response = await service.post('/login', { email, password });
        const data = response.data;
        const token = data.token;
        const user = data.user; 

        console.log('user:', user, token);

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user)); 

        store.dispatch('updateUser', user); 

        $router.push('/');
        return data;
    } catch (error) {
        console.error('Sign in failed:', error.message);
        throw new Error('Invalid email or password.');
    }
};

const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    store.dispatch('updateUser', null); 
    $router.push('/login'); 
};

const createBookAuction = async (data) => {
    try {
      const response = await service.post('/createBookAuction', data);
      console.log('data: ', data);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

const fetchAuctions = async () => {
    try {
        const response = await service.get('/auctions');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

const placeBid = async (auctionId, bidAmount) => {
    try {
        const response = await service.post(`/bid/${auctionId}`, { bidAmount });
        
        console.log('Placing bid');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

const fetchFinishedAuctionMessages = async () => {
    try {
        const response = await service.get('/messages');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

const fetchUserAuctions = async () => {
    try {
        const response = await service.get('/userAuctions');
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

export { service, registerUser, handleSignIn, handleLogout, createBookAuction, fetchAuctions, placeBid, fetchFinishedAuctionMessages, fetchUserAuctions };
