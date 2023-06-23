<template>
    <Modal ref="modalRef">
        <div v-if="!isRegister">
            <h1>Login</h1>
            <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input v-model="formData.username" type="text" class="form-control" id="username" placeholder="helloWorld">
                <label for="password" class="form-label">Password</label>
                <input v-model="formData.password" type="password" id="inputPassword" class="form-control"
                    aria-labelledby="passwordHelpBlock">
                <div id="passwordHelpBlock" class="form-text">
                    Your password must be 8-20 characters long, contain letters and numbers, and must not contain
                    spaces, special characters, or emoji.
                </div>
                <button type="button" class="btn btn-success btn-md btn-wide"
                    @click="() => handleLogin(formData)">Login</button>
                Dont have an account? <a href="#" @click.prevent="isRegister = true">Register</a>
                <div class="alert alert-danger mt-3" role="alert" v-if="errorMessage">
                    {{ this.errorMessage }}
                </div>                
            </div>
        </div>
        <div v-else>
            <h1>Register</h1>
            <div class="mb-3">
                <label for="inputEmail" class="form-label">Email</label>
                <input v-model="registerData.email" type="email" class="form-control" id="inputEmail" placeholder="topleraar@inholland.nl">
                <label for="inputUsername" class="form-label">Username</label>
                <input v-model="registerData.username" type="text" class="form-control" id="inputUsername" placeholder="helloWorld">
                <label for="inputPassword" class="form-label">Password</label>
                <input v-model="registerData.password" type="password" id="inputPassword" class="form-control" aria-labelledby="passwordHelpBlock">
                <div id="passwordHelpBlock" class="form-text">
                    Your password must be 8-20 characters long, contain letters and numbers, and must not contain
                    spaces, special characters, or emoji.
                </div>
                <button type="button" class="btn btn-success btn-md btn-wide"
                @click="() => register(registerData)">Register</button>
                Already have an account? <a href="#" @click.prevent="isRegister = false">Login</a>
                <div class="alert alert-danger mt-3" role="alert" v-if="errorMessage">
                    {{ this.errorMessage }}
                </div>
            </div>
        </div>
    </Modal>
</template>

<script>
import Modal from './Modal.vue';
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { userAuthStore } from '../stores/auth-store';

export default {
    name: 'Login',
    components: {
        Modal,
    },
    setup() {
        const modalRef = ref(null);
        const formData = reactive({ username: '', password: '' });
        const registerData = reactive({ username: '', password: '', email: '' });
        const store = userAuthStore();
        const router = useRouter();
        let errorMessage = ref('');
        let isRegister = ref(false);

        async function handleLogin() {
            try {
                await store.login(formData);
                router.push('/');
            } catch (error) {
                errorMessage.value = error;
            }
        }

        async function register(registerData) {
            try {
                await store.register(registerData);
                router.push('/');
            } catch (error) {
                errorMessage.value = error;
            }
        }

        function openModal() {
            modalRef.value.open();
        }

        return {
            modalRef,
            openModal,
            formData,
            registerData,
            handleLogin,
            register,
            errorMessage,
            isRegister,
        }
    },
};
</script>