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
  
<!-- // import Movie from '@/assets/js/movie.js' -->
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
            price: movie.price, // voeg gewoon zelf de prijs toe
            description: movie.description,
            image: movie.image,
            movie_id: movie.movie_id,
            showFullDescription: false // Add this line
          }));
        })
        .catch(error => {
          console.error(error);
        });
    },
    addToCart(movie) {
      // Check if the cart already exists in localStorage
      let cart = localStorage.getItem('cart');

      // Parse it back to an array if it exists, or use an empty array if it doesn't
      cart = cart ? JSON.parse(cart) : [];

      // Check if the movie is already in the cart
      let found = false;
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].movie_id === movie.movie_id) {
          found = true;
          break;
        }
      }

      // Only add the movie if it's not already in the cart
      if (!found) {
        cart.push(movie);

        // Store it back in localStorage, stringifying it to store as a string
        localStorage.setItem('cart', JSON.stringify(cart));

        // Show the toast notification
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


<!-- getMovies() {
  const apiKey = 'ec3431508ecf1ac6cbc4cc3a576afbb1';
  const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYzM0MzE1MDhlY2YxYWM2Y2JjNGNjM2E1NzZhZmJiMSIsInN1YiI6IjY0NWE5YTFhZmUwNzdhNWNhYmQxNDU4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BvPsrTaTIjK-y6q-I50aLxbvYQYN-daU06UGFPLW1yY';
  axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&page=3&sort_by=vote_count.desc`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'accept': 'application/json'
    }
  })
    .then(response => {
      this.movies = response.data.results.map(movie => ({
        title: movie.title,
        image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        description: movie.overview,
        movie_id: movie.id,
        showFullDescription: false // Add this line
      }));
    })
    .catch(error => {
      console.error(error);
    });
}, -->

<!-- Dit heeft de film id: {{ movie.id }}
Dit heeft de film image: {{ movie.image }}
Dit heeft de film title: {{ movie.title }}
Dit heeft de film description: {{ movie.description }} -->
