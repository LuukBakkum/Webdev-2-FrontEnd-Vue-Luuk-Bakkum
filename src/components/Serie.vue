<template>
  <link href="../src/assets/css/product.css" rel="stylesheet">

  <div class="container-fluid" id="titleField">
    <div class="container" id="title">
      <h1>MovieKnight series</h1>
      <h3>Hours and hours of entertainment</h3>
    </div>
  </div>
  <div id="overview-container">
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
                <button id="descriptionBtn" v-if="serie.showFull" @click="toggleDescription(serie)">Hide full
                  description</button>
                <hr>
                <a href="#" class="btn btn-primary" @click.prevent="addToCart(serie)">Add to cart</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<!-- // import Serie from '@/assets/js/serie.js' -->
<script>
import axios from 'axios';
import movieKnightAPI from '../axios-auth';

export default {
  name: "Serie",
  data() {
    return {
      series: []
    };
  },
  created() {
    this.getSeries();
  },
  methods: {
    getSeries() {
      movieKnightAPI.get('series')
        .then(response => {
          console.log(response.data)
          this.series = response.data.map(serie => ({
            id: serie.id,
            title: serie.title,
            price: serie.price, // voeg gewoon zelf de prijs toe
            description: serie.description,
            image: serie.image,
            serie_id: serie.serie_id,
            showFullDescription: false // Add this line
          }));
        })
        .catch(error => {
          console.error(error);
        });
    },
    addToCart(serie) {
      // Check if the cart already exists in localStorage
      let cart = localStorage.getItem('cart');

      // Parse it back to an array if it exists, or use an empty array if it doesn't
      cart = cart ? JSON.parse(cart) : [];

      // Check if the serie is already in the cart
      let found = false;
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].serie_id === serie.serie_id) {
          found = true;
          break;
        }
      }

      // Only add the serie if it's not already in the cart
      if (!found) {
        cart.push(serie);

        // Store it back in localStorage, stringifying it to store as a string
        localStorage.setItem('cart', JSON.stringify(cart));

        // Show the toast notification
        this.$toast.success(`${serie.title} has been added to your cart.`, { position: "top" });
      } else {
        this.$toast.show(`${serie.title} is already in your cart.`, { position: "top" });
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
    toggleDescription(serie) {
      serie.showFull = !serie.showFull;
    }
  }
};
</script>
    
<style></style>


  <!-- getSeries() {
    const apiKey = 'ec3431508ecf1ac6cbc4cc3a576afbb1';
    const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYzM0MzE1MDhlY2YxYWM2Y2JjNGNjM2E1NzZhZmJiMSIsInN1YiI6IjY0NWE5YTFhZmUwNzdhNWNhYmQxNDU4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BvPsrTaTIjK-y6q-I50aLxbvYQYN-daU06UGFPLW1yY';
    axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&page=4&sort_by=vote_count.desc`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'accept': 'application/json'
      }
    })
      .then(response => {
        this.series = response.data.results.map(serie => ({
          title: serie.name,
          image: `https://image.tmdb.org/t/p/w500${serie.poster_path}`,
          description: serie.overview,
        }));
      })
      .catch(error => {
        console.error(error);
      });
  }, -->

  <!-- Dit heeft de serie title: {{ serie.title }}
  Dit heeft de serie image: {{ serie.image }}
  Dit heeft de serie description: {{ serie.description }} -->