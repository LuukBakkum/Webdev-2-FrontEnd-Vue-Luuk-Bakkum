import axios from 'axios';

export default {
  name: "Serie",
  data() {
    return {
      series: [],
    };
  },
  created() {
    this.getSeries();
  },
  methods: {
      getSeries() {
        const apiKey = 'ec3431508ecf1ac6cbc4cc3a576afbb1';
        const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYzM0MzE1MDhlY2YxYWM2Y2JjNGNjM2E1NzZhZmJiMSIsInN1YiI6IjY0NWE5YTFhZmUwNzdhNWNhYmQxNDU4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BvPsrTaTIjK-y6q-I50aLxbvYQYN-daU06UGFPLW1yY';
        axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=popularity.desc`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'accept': 'application/json'
          }
        })
          .then(response => {
            this.series = response.data.results.map(serie => ({
              title: serie.name,
              img: `https://image.tmdb.org/t/p/w500${serie.poster_path}`,
              description: serie.overview,
            }));
          })
          .catch(error => {
            console.error(error);
          });
      },
    handleCardClick(movieOrSeries) {
      // Do something when a card is clicked
    }
  },
};