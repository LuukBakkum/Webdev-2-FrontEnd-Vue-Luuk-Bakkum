import axios from 'axios';

const movieKnightAPI = axios.create({
    baseURL: 'http://localhost:80/'
});

export default movieKnightAPI;