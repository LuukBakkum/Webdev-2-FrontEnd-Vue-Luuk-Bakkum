import { defineStore } from 'pinia';
import movieKnightAPI from '../axios-auth';

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
                        if (response.data.error) {
                            reject(response.data.error);
                            return;
                        }
                        if (response.status == 401) {

                            reject('Invalid username or password.');
                            return;
                        }
                        console.log(response.data);
                        const jwtToken = response.data;
                        if (!jwtToken) {
                            reject('No token received.');
                            return;
                        }
                        this.setLocalstorage(response);
                        resolve(true);
                    })
                    .catch(error => {
                        if (error.response && error.response.status === 401) {
                            reject('Invalid username or password.');
                        } else {
                            reject(error.message);
                        }
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
                if (!this.checkValidInput(registerData.username)) {
                    reject('Invalid input.');
                    return;
                }
                movieKnightAPI.post('/register', registerData)
                    .then((response) => {
                        if (!response || response.status !== 200 || !response.data) {
                            reject('Invalid response from server.');
                            return;
                        }
                        if (response.data.error) {
                            reject(response.data.error);
                            return;
                        }                     
                        const jwtToken = response.data;
                        if (!jwtToken) {
                            reject('No token received.');
                            return;
                        }
                        this.setLocalstorage(response);
                        resolve(true);
                    })
                    .catch(error => {
                        if (response.status == 401) {
                            reject('Invalid username or password.');
                            return;
                        }
                        reject(error.message);
                    });
            });
        },
        checkValidInput(input) {
            if (input === null || input === undefined || input === '') {
                return false;
            }
            return true;
        },
        setLocalstorage(response) {
            this.jwt = response.data.jwt;
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
        }
    },
    created() {
        this.autoLogin();
    },
});

