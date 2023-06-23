<template>
  <link href="../src/assets/css/product.css" rel="stylesheet">

  <div class="container-fluid" id="titleField">
    <div class="container" id="title">
      <h1>MovieKnight movies</h1>
      <h3>Get your snacks ready, this will be a long one</h3>
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
                <button id="descriptionBtn" v-if="movie.showFull" @click="toggleDescription(movie)">Hide full
                  description</button>
                <hr>
                <a href="#" class="btn btn-primary" @click.prevent="addToCart(movie)">Add to cart</a>
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

export default {
  name: "Movie",
  data() {
    return {
      movies: []
    };
  },
  created() {
    this.getMovies();
  },
  methods: {
    getMovies() {
      movieKnightAPI.get('movies')
        .then(response => {
          console.log(response.data)
          this.movies = response.data.map(movie => ({
            id: movie.id,
            title: movie.title,
            price: movie.price,
            description: movie.description,
            image: movie.image,
            movie_id: movie.movie_id,
            showFullDescription: false
          }));
        })
        .catch(error => {
          console.error(error);
        });
    },
    addToCart(movie) {
      let cart = localStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];

      let found = false;
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].movie_id === movie.movie_id) {
          found = true;
          break;
        }
      }

      if (!found) {
        cart.push(movie);
        localStorage.setItem('cart', JSON.stringify(cart));

        this.$toast.success(`${movie.title} has been added to your cart.`, { position: "top" });
      } else {
        this.$toast.show(`${movie.title} is already in your cart.`, { position: "top" });
      }
      setTimeout(this.$toast.clear, 3000)
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
    }
  }
};
</script>
  
<style></style>