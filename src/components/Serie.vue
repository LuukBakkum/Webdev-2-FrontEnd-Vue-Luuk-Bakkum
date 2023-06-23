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
            price: serie.price,
            description: serie.description,
            image: serie.image,
            serie_id: serie.serie_id,
            showFullDescription: false
          }));
        })
        .catch(error => {
          console.error(error);
        });
    },
    addToCart(serie) {
      let cart = localStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];

      let found = false;
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].serie_id === serie.serie_id) {
          found = true;
          break;
        }
      }

      if (!found) {
        cart.push(serie);
        localStorage.setItem('cart', JSON.stringify(cart));

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