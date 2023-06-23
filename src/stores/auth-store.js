import { defineStore } from 'pinia';
import  movieKnightAPI  from '../axios-auth';

export const userAuthStore = defineStore('auth', {
    state: () => ({
        jwt: '',
        user_id: '',
        username: '',
        email: '',
        isAdmin: false        
    }),
    getters: {
        isAuthenticated: (state) => state.jwt !== '',
        // isAdmin: (state) => state.isAdmin === true
    },
    actions: {
        autoLogin() {
            if (localStorage['jwt'] && localStorage['user_id'] && localStorage['username'] && localStorage['email']) {
                this.jwt = localStorage['jwt'];
                this.user_id = localStorage['user_id'];
                this.username = localStorage['username'];
                this.email = localStorage['email'];
                this.isAdmin = localStorage['admin'];

                movieKnightAPI.defaults.headers.common['Authorization'] = 'Bearer ' + this.jwt;
            }
        },
        async login(formData) {
            return new Promise((resolve, reject) => {
                movieKnightAPI.post('/login', formData)
                    .then((response) => {
                        // Basic response checks
                        if (!response || response.status !== 200 || !response.data) {
                            reject('Invalid response from server.');
                            return;
                        }

                        console.log(response.data);
        
                        const jwtToken = response.data;
        
                        if (!jwtToken) {
                            reject('No token received.');
                            return;
                        }
        
                        this.jwt = response.data.jwt;//jwt
                        this.user_id = response.data.user_id;
                        this.username = response.data.username;
                        this.email = response.data.email;
                        this.isAdmin = response.data.admin;
        
                        localStorage.setItem('jwt', this.jwt);
                        localStorage.setItem('user_id', this.user_id);
                        localStorage.setItem('username', this.username);
                        localStorage.setItem('email', this.email);
                        localStorage.setItem('admin', this.isAdmin);
        
                        movieKnightAPI.defaults.headers.common['Authorization'] = 'Bearer ' + this.jwt;

                        // Resolve the promise
                        resolve(true);
                    })
                    .catch(error => {
                        // Reject the promise with the error message
                        reject(error.message);
                    });
            });
        },
        logout() {
            this.jwt = '';
            this.user_id = '';
            this.username = '';
            this.email = '';
            this.isAdmin = false;
        
            localStorage.removeItem('jwt');
            localStorage.removeItem('user_id');
            localStorage.removeItem('username');
            localStorage.removeItem('email');
            localStorage.removeItem('admin');
        
            movieKnightAPI.defaults.headers.common['Authorization'] = '';
         },

        register(registerData) {
            return new Promise((resolve, reject) => {
                movieKnightAPI.post('/register', registerData)
                    .then((response) => {
                        // Basic response checks
                        if (!response || response.status !== 200 || !response.data) {
                            reject('Invalid response from server.');
                            return;
                        }
        
                        const jwtToken = response.data;
        
                        if (!jwtToken) {
                            reject('No token received.');
                            return;
                        }
        
                        this.jwt = response.data.jwt;//jwt
                        this.user_id = response.data.user_id;
                        this.username = response.data.username;
                        this.email = response.data.email;
                        this.isAdmin = response.data.admin;
        
                        localStorage.setItem('jwt', this.jwt);
                        localStorage.setItem('user_id', this.user_id);
                        localStorage.setItem('username', this.username);
                        localStorage.setItem('email', this.email);
                        localStorage.setItem('admin', this.isAdmin);
        
                        movieKnightAPI.defaults.headers.common['Authorization'] = 'Bearer ' + this.jwt;

                        // Resolve the promise
                        resolve(true);
                    })
                    .catch(error => {
                        // Reject the promise with the error message
                        reject(error.message);
                    });
            });
        }
    },
    created() {
        this.autoLogin();
    },
});

