<template>
  <link href="../src/assets/css/home.css" rel="stylesheet">

  <div class="container-fluid" id="titleField">
    <div class="container" id="title">
      <h1 v-if="username">Welcome at MovieKnight, {{ username }}</h1>
      <h1 v-else>Welcome at MovieKnight</h1>
      <h3>More movies than you could ever watch</h3>
    </div>
  </div>
  <div id="overview-container">
    <div class="left">
      <div class="card">
        <h4 class="card-title">View our selection</h4>
        <div class="card-body">
          Are you tired of endlessly scrolling through streaming platforms only to be disappointed by their limited
          selection?
          Look no further! At MovieKnight, we're committed to providing you with an extensive and diverse library of films
          that cater to every taste and preference.
          <button class="btn btn-danger" @click="$router.push('/movies')">View our selection</button>
        </div>
      </div>
      <div class="card">
        <h4 class="card-title">More interested in series?</h4>
        <div class="card-body">
          Unearth spellbinding series on MovieKnight, your ultimate destination for mesmerizing TV adventures.
          Explore enthralling narratives, encounter unforgettable heroes, and binge to your heart's content.
          Join MovieKnight now and unlock a realm of endless entertainment!
          <button class="btn btn-danger" @click="$router.push('/series')">View our selection</button>
        </div>
      </div>
      <h4>Contact</h4>
      <p>Adres: Pijnboomstraat 12, 2534PC <br>
        Phone: 053-53285934 <br>
        Email: info@movieknight.nl</p>
    </div>
    <div class="right">
      <div class="row">
        <h3>Who are we?</h3>
        <p>And don't worry about compatibility – our digital movie store supports various formats and devices, ensuring a
          seamless viewing experience.
          At MovieKnight, we believe in rewarding our loyal customers. That's why we offer exclusive discounts, bundles,
          and special promotions,
          making your movie collection more affordable than ever.</p>
        <p>So, what are you waiting for? Embark on a cinematic
          journey like no other and dive into the world of MovieKnight!
          Purchase your favorite films and series today and unlock endless hours of entertainment. Happy viewing!</p>
      </div>
      <div class="row">
        <h3>Our expertise</h3>
        <p>Why buy from us? Our easy-to-navigate platform lets you browse through an extensive range of genres,
          from the latest blockbusters to timeless classics and hidden indie gems. Plus, with our ever-growing collection,
          you'll never run out of options to keep you entertained. We take pride in our high-quality content, offering
          movies in stunning resolutions up to 4K Ultra HD.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
    };
  },
  created() {
    this.username = localStorage.getItem('username');
    this.email = localStorage.getItem('email');
  },
};
</script>

<style>

</style>