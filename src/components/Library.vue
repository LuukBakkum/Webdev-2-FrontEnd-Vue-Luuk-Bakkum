<template>
    <link href="../src/assets/css/product.css" rel="stylesheet">

    <div class="container-fluid" id="titleField">
        <div class="container" id="title">
            <h1>MovieKnight Personal Library</h1>
            <h3>What will you be watching now? I cant decide.</h3>
        </div>
    </div>
    <div id="overview-container">
        <div class="section">
            <h2>Movies</h2>
            <div class="container">
                <div class="row">
                    <div class="col-lg-4" v-for="(movie, index) in movies" :key="index">
                        <div class="card">
                            <img :src="movie.image" class="card-img-top" :alt="movie.title">
                            <div class="card-body">
                                <h5 class="card-title">{{ movie.title }}</h5>
                                <p class="card-text">
                                    {{ movie.showFull ? movie.description : truncateDescription(movie.description, 100) }}
                                    <span v-if="movie.description.length > 100 && !movie.showFull">
                                        <a id="descriptionBtn" @click="toggleDescription(movie)">Show more</a>
                                    </span>
                                </p>
                                <button id="descriptionBtn" v-if="movie.showFull" @click="toggleDescription(movie)">Hide
                                    full
                                    description</button>
                                <hr>
                                <a href="#" class="btn btn-primary" @click.prevent="watchNow(movie.title)">Watch now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="section">
            <h2>Series</h2>
            <div class="container">
                <div class="row">
                    <div class="col-lg-4" v-for="(serie, index) in series" :key="index">
                        <div class="card">
                            <img :src="serie.image" class="card-img-top" :alt="serie.title">
                            <div class="card-body">
                                <h5 class="card-title">{{ serie.title }}</h5>
                                <p class="card-text">
                                    {{ serie.showFull ? serie.description : truncateDescription(serie.description, 100) }}
                                    <span v-if="serie.description.length > 100 && !serie.showFull">
                                        <a id="descriptionBtn" @click="toggleDescription(serie)">Show more</a>
                                    </span>
                                </p>
                                <button id="descriptionBtn" v-if="serie.showFull" @click="toggleDescription(serie)">Hide
                                    full
                                    description</button>
                                <hr>
                                <a href="#" class="btn btn-primary" @click.prevent="watchNow(serie.title)">Watch now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import movieKnightAPI from '../axios-auth';
import { userAuthStore } from '../stores/auth-store';
import { computed, reactive } from 'vue';

export default {
    name: 'library',
    data() {
        return {
            orders: [],
            movies: [],
            series: [],
            user_id: '',
        };
    },
    setup() {
        const store = userAuthStore();
        const user_id = computed(() => store.user_id);

        return {

            store,
            user_id,
        };
    },

    created() {
        this.getUserLibrary();
    },
    methods: {
        getUserLibrary() {
            movieKnightAPI.get('orders/user')
                .then(response => {
                    console.log('Orders Response data:', response.data)
                    this.orders = response.data.map(order => ({
                        id: order.id,
                        movie_id: order.movie_id ? {
                            id: order.movie_id.id,
                            title: order.movie_id.title,
                            price: order.movie_id.price,
                            description: order.movie_id.description,
                            image: order.movie_id.image,
                        } : null,
                        serie_id: order.serie_id ? {
                            id: order.serie_id.id,
                            title: order.serie_id.title,
                            price: order.serie_id.price,
                            description: order.serie_id.description,
                            image: order.serie_id.image,
                        } : null,
                        price: order.price,
                    }));

                    this.movies = this.orders.filter(order => order.movie_id !== null).map(order => order.movie_id);
                    this.series = this.orders.filter(order => order.serie_id !== null).map(order => order.serie_id);

                    console.log(this.orders);
                    console.log(this.movies);
                    console.log(this.series);
                })
                .catch(error => {
                    console.error(error);
                });
        },
        truncateDescription(description, maxLength) {
            if (description.length > maxLength && !this.showFullDescription) {
                return description.substring(0, maxLength) + '...';
            } else {
                return description;
            }
        },
        toggleDescription(movie) {
            movie.showFull = !movie.showFull;
        },
        watchNow(title) {
            this.$toast.success("You are now watching: " + title, { position: "top" });
        },
    },
};
</script>