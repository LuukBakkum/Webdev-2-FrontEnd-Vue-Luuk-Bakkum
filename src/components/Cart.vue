<template>
    <link href="../src/assets/css/home.css" rel="stylesheet">

    <div class="container-fluid" id="titleField">
        <div class="container" id="title">
            <h1>MovieKnight Cart overview</h1>
            <h3>What are we interested in today?</h3>
        </div>
    </div>
    <div id="overview-container">
        <div class="left">
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Product code</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in cart" :key="row.id">
                        <td>{{ row.title }}</td>
                        <td>{{ row.movie_id || row.serie_id }}</td>
                        <td>{{ row.price }}</td>
                        <td style="width: 20px;"><button class="btn btn-danger" @click="deleteItem(row.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th colspan="3">Total</th>
                        <td>€{{ totalPrice }}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div class="right">
            <div class="row" id="title-section">
                <template v-if="isAuthenticated">
                    <h3>You can now proceed to the checkout</h3>
                    <p>Almost there! Your couch is already waiting!</p>

                    <label>Select method of payment</label>
                    <select v-model="selectedPaymentMethod" class="payment-select">
                        <option disabled value="">Please select one</option>
                        <option>Paypal</option>
                        <option>Credit card</option>
                        <option>iDeal</option>
                    </select>

                    <border-box style="background-color: white; color: black;">
                        <p>Payment to: MovieKnightINC</p>
                        <p>IBAN: NL06MOVI0000674043</p>
                        <p>Number of products: {{ cart.length }}</p>
                        <p>Total price: €{{ totalPrice }}</p>
                        <p>Payment method: {{ selectedPaymentMethod }}</p>
                        <p>Date of payment: {{ paymentDate }}</p>
                    </border-box>

                    <button type="button" id="checkoutBtn" class="btn btn-success btn-md btn-wide"
                        :disabled="!selectedPaymentMethod" @click="openModal">
                        Go to checkout
                    </button>
                </template>
                <template v-else>
                    <h3>User is not logged in</h3>
                    <p>Please log in to access your account and features.</p>
                </template>
            </div>
            <div class="row" id="login-section" v-if="!isAuthenticated">
                <template v-if="isAuthenticated">
                    <h4>Go to check-out now</h4>
                    <p>And dont forget to buy some popcorn</p>
                </template>
                <template v-else>
                    <h4>Log in here</h4>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1"
                            placeholder="name@example.com">
                        <label for="inputPassword5" class="form-label">Password</label>
                        <input type="password" id="inputPassword5" class="form-control" aria-labelledby="passwordHelpBlock">
                        <div id="passwordHelpBlock" class="form-text">
                            Your password must be 8-20 characters long, contain letters and numbers, and must not contain
                            spaces, special characters, or emoji.
                        </div>
                        <button type="button" class="btn btn-success btn-md btn-wide">Login</button>
                    </div>
                </template>
            </div>
        </div>
    </div>

    <!-- <p>{{ jwt }}</p>
    <div v-for="item in cart" :key="item.id">
        <div class="row">
            <div class="col-4">
                <img :src="item.image" alt="product image" class="img-fluid">
            </div>
            <div class="col-8">
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
                <p>Price: €{{ item.price }}</p>
                <button class="btn btn-danger" @click="deleteItem(item.id)">Delete</button>
            </div>
        </div>
    </div> -->

    <Modal ref="modalRef">
        <div>
            <h1>Payment Complete</h1>
            <h5>You made a very good choice!</h5>
            <p>Your products have been activated in your personal library.</p>
            <p>Enjoy your movie night!</p>

            <button type="button" class="btn btn-success btn-md btn-wide" @click="goToLibrary">
                Go to my library
            </button>
            <button type="button" class="btn btn-danger btn-md btn-wide" @click="closeModal">
                Close
            </button>
        </div>
    </Modal>
</template>
  
<script>
// import '../assets/css/cart.css';

import { ref, onMounted, nextTick } from 'vue';
import Modal from './Modal.vue';
import { userAuthStore } from '../stores/auth-store';
import { computed, reactive } from 'vue';
import movieKnightAPI from '../axios-auth';

export default {
    name: "Cart",
    components: {
        Modal,
    },
    data() {
        return {
            isLoggedIn: false,
            selectedPaymentMethod: '',
            jwt: '',
        };
    },
    setup() {
        const modalRef = ref(null);

        const store = userAuthStore();
        const isAuthenticated = computed(() => store.isAuthenticated);
        const jwt = computed(() => store.jwt);

        const cart = reactive({
            items: [],
        });

        const totalPrice = computed(() =>
            cart.items.reduce((acc, item) => acc + Number(item.price), 0)
        );

        const paymentDate = ref(new Date().toLocaleDateString());

        onMounted(async () => {
            await nextTick();
            let localCart = localStorage.getItem('cart');
            localCart = localCart ? JSON.parse(localCart) : [];
            cart.items = localCart;
        });

        const goToCheckout = () => {
            // implement your checkout logic here
        };

        return {
            isAuthenticated,
            jwt,
            cart: computed(() => cart.items),
            totalPrice,
            paymentDate,
            goToCheckout,
            modalRef, // This is now accessible to use as `this.modalRef` in the rest of your component
        };
    },
    methods: {
        deleteItem(id) {
            const index = this.cart.findIndex((item) => item.id === id);
            this.cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        openModal() {
            this.saveOrders()
                .then(() => {
                    this.modalRef.open();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        },
        closeModal() {
            this.modalRef.close();
        },
        goToLibrary() {
            this.$router.push('/library');
        },
        async saveOrders() {
            return new Promise((resolve, reject) => {
                const orders = this.cart.map(item => ({
                    movie_id: item.movie_id,
                    serie_id: item.serie_id,
                    price: item.price,
                }));
                movieKnightAPI.post('orders', orders)
                    .then((response) => {
                        console.log(response);
                        this.cart.splice(0, this.cart.length); // Clears the cart by removing all elements
                        localStorage.setItem('cart', JSON.stringify(this.cart)); // Update the local storage
                        resolve(response);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        reject(error);
                    });
            })
        },
    },
};
</script>
  
<style scoped>
@import '../assets/css/cart.css';
</style>

<!-- cart: this.cart,
totalPrice: this.totalPrice,
paymentMethod: this.selectedPaymentMethod,
paymentDate: this.paymentDate, -->