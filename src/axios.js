import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:8002',
  baseURL: 'https://discordapp-mern-live.herokuapp.com',
});

export default instance;
