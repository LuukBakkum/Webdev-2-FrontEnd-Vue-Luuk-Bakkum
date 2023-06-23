// Import your dependencies and styles as before
import '../css/cart.css'

export default {
    name: "Cart",
    components: {},
    data() {
        return {
            isLoggedIn: false,
        };
    },
    mounted() {
        this.checkLoggedIn();
    },
    methods: {
        // Add your existing methods and the new checkLoggedIn method
        checkLoggedIn() {
            // <<<<<<<<<<<<<<<< ----------------- OPGELET ----------------- >>>>>>>>>>>>>>>>
            // Replace this with your actual session checking logic
            this.isLoggedIn = Math.random() >= 0.5;
        },
    },
};