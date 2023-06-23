<template>
    <link href="../src/assets/css/adminTerminal.css" rel="stylesheet">

    <div class="container-fluid" id="titleField">
        <div class="container" id="title">
            <h1>MovieKnight Admin Terminal</h1>
            <h3>Whats the officer problem?</h3>
        </div>
    </div>

    <div id="overview-container">
        <div>
            <h1>C.R.U.D</h1>
            <div class="grid-container">
                <!-- Library Table -->
                <div>
                    <h2>Library</h2>
                    <table class="table-responsive mb-4" id="libraryDataTable">
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Movie ID</th>
                        <th>Serie ID</th>
                        <th>Price</th>
                        <th>Update</th>
                        <th>Delete</th>

                        <tr v-for="(order, index) in orders" :key="index" @click="selectOrder(order.id, order)">
                            <td>{{ order.id }}</td>
                            <td>{{ order.user_id }}</td>
                            <td>{{ order.movie_id }}</td>
                            <td>{{ order.serie_id }}</td>
                            <td>{{ order.price }}</td>
                            <td><button class="btn btn-warning" @click="this.updateLibraryModal.open()"
                                    :disabled="selectedOrderId !== order.id">Update</button></td>
                            <td><button class="btn btn-danger" @click="this.deleteLibraryModal.open()"
                                    :disabled="selectedOrderId !== order.id">Delete</button></td>
                        </tr>
                    </table>
                    <button class="btn btn-success" @click="this.addLibraryModal.open()">Add Library Item</button>
                </div>

                <!-- Movie Table -->
                <div>
                    <h2>Movie</h2>
                    <table class="table-responsive mb-4" id="movieDataTable">
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Movie_ID</th>
                        <th>Update</th>
                        <th>Delete</th>

                        <tr v-for="(movie, index) in movies" :key="index" @click="selectMovie(movie.id, movie)">
                            <td>{{ movie.id }}</td>
                            <td>{{ movie.title }}</td>
                            <td>{{ movie.description }}</td>
                            <td>{{ movie.image }}</td>
                            <td>{{ movie.price }}</td>
                            <td>{{ movie.movie_id }}</td>
                            <td><button class="btn btn-warning" @click="this.updateMovieModal.open()"
                                    :disabled="selectedMovieId !== movie.id">Update</button></td>
                            <td><button class="btn btn-danger" @click="this.deleteMovieModal.open()"
                                    :disabled="selectedMovieId !== movie.id">Delete</button></td>
                        </tr>
                    </table>
                    <button class="btn btn-success" @click="this.addMovieModal.open()">Add Movie</button>
                </div>

                <!-- Serie Table -->
                <div>
                    <h2>Serie</h2>
                    <table class="table-responsive mb-0" id="serieDataTable">
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Serie_ID</th>
                        <th>Update</th>
                        <th>Delete</th>

                        <tr v-for="(serie, index) in series" :key="index" @click="selectSerie(serie.id, serie)">
                            <td>{{ serie.id }}</td>
                            <td>{{ serie.title }}</td>
                            <td>{{ serie.description }}</td>
                            <td>{{ serie.image }}</td>
                            <td>{{ serie.price }}</td>
                            <td>{{ serie.serie_id }}</td>
                            <td><button class="btn btn-warning" @click="this.updateSerieModal.open()"
                                    :disabled="selectedSerieId !== serie.id">Update</button></td>
                            <td><button class="btn btn-danger" @click="this.deleteSerieModal.open()"
                                    :disabled="selectedSerieId !== serie.id">Delete</button></td>

                        </tr>
                    </table>
                    <button class="btn btn-success" @click="this.addSerieModal.open()">Add Serie</button>
                </div>

                <!-- User Table -->
                <div>
                    <h2>User</h2>
                    <table class="table-responsive mb-0" id="userDataTable">
                        <th>ID</th>
                        <th>Username</th>
                        <th>Password_Hash</th>
                        <th>Email</th>
                        <th>isAdmin</th>
                        <th>Update</th>
                        <th>Delete</th>

                        <tr v-for="(user, index) in users" :key="index" @click="selectUser(user.id, user)">
                            <td>{{ user.id }}</td>
                            <td>{{ user.username }}</td>
                            <td>{{ user.password_hash }}</td>
                            <td>{{ user.email }}</td>
                            <td v-if="user.admin">Yes</td>
                            <td v-else>No</td>
                            <td><button class="btn btn-warning" @click="this.updateUserModal.open()"
                                    :disabled="selectedUserId !== user.id">Update</button></td>
                            <td><button class="btn btn-danger" @click="this.deleteUserModal.open()"
                                    :disabled="selectedUserId !== user.id">Delete</button></td>
                        </tr>
                    </table>
                    <button class="btn btn-success" @click="this.addUserModal.open()">Add User</button>
                </div>
            </div>
        </div>
    </div>

    <!-- MODALS -->
    <!-- Add Library Item Modal -->
    <Modal ref="addLibraryModal" id="addLibraryModal" title="Add Library Item">
        <form @submit.prevent="addLibrary">
            <div class="form-group">
                <label for="addUserId">User ID</label>
                <input type="number" class="form-control" id="addUserId" v-model="newOrder.user_id">
            </div>
            <div class="form-group">
                <label for="addMovieId">Movie ID</label>
                <input type="number" class="form-control" id="addMovieId" v-model="newOrder.movie_id">
            </div>
            <div class="form-group">
                <label for="addSerieId">Serie ID</label>
                <input type="number" class="form-control" id="addSerieId" v-model="newOrder.serie_id">
            </div>
            <div class="form-group">
                <label for="addPrice">Price</label>
                <input type="number" min="0.00" max="10000.00" step="0.01" class="form-control" id="addPrice"
                    v-model="newOrder.price">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <div class="alert alert-danger mt-3" role="alert" v-if="errorMessage">
                {{ this.errorMessage }}
            </div>
        </form>
    </Modal>

    <!-- Update Library Item Modal -->
    <Modal ref="updateLibraryModal" id="updateLibraryModal" title="Update Library Item">
        <form @submit.prevent="updateLibrary">
            <div class="form-group">
                <label for="updateUserId">User ID</label>
                <input type="number" class="form-control" id="updateUserId" v-model="selectedOrder.user_id">
            </div>
            <div class="form-group">
                <label for="updateMovieId">Movie ID</label>
                <input type="number" class="form-control" id="updateMovieId" v-model="selectedOrder.movie_id">
            </div>
            <div class="form-group">
                <label for="updateSerieId">Serie ID</label>
                <input type="number" class="form-control" id="updateSerieId" v-model="selectedOrder.serie_id">
            </div>
            <div class="form-group">
                <label for="updatePrice">Price</label>
                <input type="number" class="form-control" id="updatePrice" v-model="selectedOrder.price">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <div class="alert alert-danger mt-3" role="alert" v-if="errorMessage">
                {{ this.errorMessage }}
            </div>
        </form>
    </Modal>

    <!-- Delete Library Item Modal -->
    <Modal ref="deleteLibraryModal" id="deleteLibraryModal" title="Delete Library Item: {{ selectedOrder.id }}">
        <h5 class="modal-title" id="deleteLibraryModalLabel">Delete Library Item</h5>
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-danger" @click="deleteLibrary">Delete</button>
        <div class="alert alert-danger mt-3" role="alert" v-if="errorMessage">
            {{ this.errorMessage }}
        </div>
    </Modal>

    <!-- Add Movie Modal -->
    <Modal ref="addMovieModal" id="addMovieModal" title="Add Movie">
        <form @submit.prevent="addMovie">
            <div class="form-group">
                <label for="addMovieTitle">Title</label>
                <input type="text" class="form-control" id="addMovieTitle" v-model="newMovie.title">
            </div>
            <div class="form-group">
                <label for="addMovieDescription">Description</label>
                <input type="text" class="form-control" id="addMovieDescription" v-model="newMovie.description">
            </div>
            <div class="form-group">
                <label for="äddMoviePrice">Price</label>
                <input type="number" class="form-control" id="addMoviePrice" v-model="newMovie.price">
            </div>
            <div class="form-group">
                <label for="addMovieImage">Image</label>
                <input type="text" class="form-control" id="addMovieImage" v-model="newMovie.image">
            </div>
            <div class="form-group">
                <label for="addMovieMovie_id">Movie ID</label>
                <input type="number" class="form-control" id="addMovieMovie_id" v-model="newMovie.movie_id">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <div class="alert alert-danger mt-3" role="alert" v-if="errorMessage">
                {{ this.errorMessage }}
            </div>
        </form>
    </Modal>

    <!-- Update Movie Modal -->
    <Modal ref="updateMovieModal" id="updateMovieModal" title="Update Movie">
        <form @submit.prevent="updateMovie">
            <div class="form-group">
                <label for="updateMovieTitle">Title</label>
                <input type="text" class="form-control" id="updateMovieTitle" v-model="selectedMovie.title">
            </div>
            <div class="form-group">
                <label for="updateMovieDescription">Description</label>
                <input type="text" class="form-control" id="updateMovieDescription" v-model="selectedMovie.description">
            </div>
            <div class="form-group">
                <label for="updateMoviePrice">Price</label>
                <input type="number" class="form-control" id="updateMoviePrice" v-model="selectedMovie.price">
            </div>
            <div class="form-group">
                <label for="updateMovieImage">Image</label>
                <input type="text" class="form-control" id="updateMovieImage" v-model="selectedMovie.image">
            </div>
            <div class="form-group">
                <label for="updateMovieMovie_id">Movie ID</label>
                <input type="number" class="form-control" id="updateMovieMovie_id" v-model="selectedMovie.movie_id">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <div class="alert alert-danger mt-3" role="alert" v-if="errorMessage">
                {{ this.errorMessage }}
            </div>
        </form>
    </Modal>

    <!-- Delete Movie Modal -->
    <Modal ref="deleteMovieModal" id="deleteMovieModal" title="Delete Movie">
        <h5 class="modal-title" id="deleteMovieModalLabel">Delete Movie</h5>
        <p>Are you sure you want to delete this movie? This action cannot be undone.</p>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-danger" @click="deleteMovie">Delete</button>
        <div class="alert alert-danger mt-3" role="alert" v-if="errorMessage">
            {{ this.errorMessage }}
        </div>
    </Modal>

    <!-- Add Serie Modal -->
    <Modal ref="addSerieModal" id="addSeriesModal" title="Add Serie">
        <form @submit.prevent="addSerie">
            <div class="form-group">
                <label for="addSerieTitle">Title</label>
                <input type="text" class="form-control" id="addSerieTitle" v-model="newSerie.title">
            </div>
            <div class="form-group">
                <label for="addSerieDescription">Description</label>
                <input type="text" class="form-control" id="addSerieDescription" v-model="newSerie.description">
            </div>
            <div class="form-group">
                <label for="addSeriePrice">Price</label>
                <input type="number" class="form-control" id="addSeriePrice" v-model="newSerie.price">
            </div>
            <div class="form-group">
                <label for="addSerieImage">Image</label>
                <input type="text" class="form-control" id="addSerieImage" v-model="newSerie.image">
            </div>
            <div class="form-group">
                <label for="addSerieSerie_id">Serie ID</label>
                <input type="number" class="form-control" id="addSerieSerie_id" v-model="newSerie.serie_id">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <div class="alert alert-danger mt-3" role="alert" v-if="errorMessage">
                {{ this.errorMessage }}
            </div>
        </form>
    </Modal>

    <!-- Update Serie Modal -->
    <Modal ref="updateSerieModal" id="updateSerieModal" title="Update Serie">
        <form @submit.prevent="updateSerie">
            <div class="form-group">
                <label for="updateSerieTitle">Title</label>
                <input type="text" class="form-control" id="updateSerieTitle" v-model="selectedSerie.title">
            </div>
            <div class="form-group">
                <label for="updateSerieDescription">Description</label>
                <input type="text" class="form-control" id="updateSerieDescription" v-model="selectedSerie.description">
            </div>
            <div class="form-group">
                <label for="updateSeriePrice">Price</label>
                <input type="number" class="form-control" id="updateSeriePrice" v-model="selectedSerie.price">
            </div>
            <div class="form-group">
                <label for="updateSerieImage">Image</label>
                <input type="text" class="form-control" id="updateSerieImage" v-model="selectedSerie.image">
            </div>
            <div class="form-group">
                <label for="updateSerieSerie_id">Serie ID</label>
                <input type="number" class="form-control" id="updateSerieSerie_id" v-model="selectedSerie.serie_id">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <div class="alert alert-danger mt-3" role="alert" v-if="errorMessage">
                {{ this.errorMessage }}
            </div>
        </form>
    </Modal>

    <!-- Delete Serie Modal -->
    <Modal ref="deleteSerieModal" id="deleteSerieModal" title="Delete Serie">
        <h5 class="modal-title" id="deleteSerieModalLabel">Delete Serie</h5>
        <p>Are you sure you want to delete this serie? This action cannot be undone.</p>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-danger" @click="deleteSerie">Delete</button>
        <div class="alert alert-danger mt-3" role="alert" v-if="errorMessage">
            {{ this.errorMessage }}
        </div>
    </Modal>

    <!-- Add User Modal -->
    <Modal ref="addUserModal" id="addUserModal" title="Add User">
        <form @submit.prevent="addUser">
            <div class="form-group">
                <label for="addUserUsername">Username</label>
                <input type="text" class="form-control" id="addUserUsername" v-model="newUser.username">
            </div>
            <div class="form-group">
                <label for="addUserPassword">Password</label>
                <input type="text" class="form-control" id="addUserPassword" v-model="newUser.password"
                    placeholder="enter new password">
            </div>
            <div class="form-group">
                <label for="addUserEmail">Email</label>
                <input type="text" class="form-control" id="addUserEmail" v-model="newUser.email">
            </div>
            <div class="form-group">
                <label for="updateUserRole">Admin</label>
                <input type="checkbox" id="updateUserRole" v-model="newUser.admin">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <div class="alert alert-danger mt-3" role="alert" v-if="errorMessage">
                {{ this.errorMessage }}
            </div>
        </form>
    </Modal>

    <!-- Update User Modal -->
    <Modal ref="updateUserModal" id="updateUserModal" title="Update User">
        <form @submit.prevent="updateUser">
            <div class="form-group">
                <label for="updateUserUsername">Username</label>
                <input type="text" class="form-control" id="updateUserUsername" v-model="selectedUser.username">
            </div>
            <div class="form-group">
                <label for="updateUserPassword">Password</label>
                <input type="text" class="form-control" id="updateUserPassword" v-model="selectedUser.password">
            </div>
            <div class="form-group">
                <label for="updateUserEmail">Email</label>
                <input type="text" class="form-control" id="updateUserEmail" v-model="selectedUser.email">
            </div>
            <div class="form-group">
                <label for="updateUserRole">Admin</label>
                <input type="checkbox" id="updateUserRole" v-model="selectedUser.admin">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
            <div class="alert alert-danger mt-3" role="alert" v-if="errorMessage">
                {{ this.errorMessage }}
            </div>
        </form>
    </Modal>

    <!-- Delete User Modal -->
    <Modal ref="deleteUserModal" id="deleteUserModal" title="Delete User">
        <h5 class="modal-title" id="deleteUserModalLabel">Delete User</h5>
        <p>Are you sure you want to delete this user? This action cannot be undone.</p>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-danger" @click="deleteUser">Delete</button>
        <div class="alert alert-danger mt-3" role="alert" v-if="errorMessage">
            {{ this.errorMessage }}
        </div>
    </Modal>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue';
import Modal from './Modal.vue';
import { userAuthStore } from '../stores/auth-store';
import { computed, reactive } from 'vue';
import movieKnightAPI from '../axios-auth';

export default {
    name: 'AdminTerminal',
    data() {

        return {
            orders: [],
            movies: [],
            series: [],
            users: [],

            //selected id's
            selectedOrderId: null,
            selectedMovieId: null,
            selectedSerieId: null,
            selectedUserId: null,

            //selected items
            selectedOrder: {},
            selectedMovie: {},
            selectedSerie: {},
            selectedUser: {},

            //new items
            newOrder: {},
            newMovie: {},
            newSerie: {},
            newUser: {},

            //error
            errorMessage: null,
        };
    },
    setup() {
        //modal refs
        const addLibraryModal = ref(null);
        const updateLibraryModal = ref(null);
        const deleteLibraryModal = ref(null);

        const addMovieModal = ref(null);
        const updateMovieModal = ref(null);
        const deleteMovieModal = ref(null);

        const addSerieModal = ref(null);
        const updateSerieModal = ref(null);
        const deleteSerieModal = ref(null);

        const addUserModal = ref(null);
        const updateUserModal = ref(null);
        const deleteUserModal = ref(null);

        return {
            addLibraryModal,
            updateLibraryModal,
            deleteLibraryModal,
            addMovieModal,
            updateMovieModal,
            deleteMovieModal,
            addSerieModal,
            updateSerieModal,
            deleteSerieModal,
            addUserModal,
            updateUserModal,
            deleteUserModal,
        };
    },
    created() {
        this.getLibrary();
        this.getMovies();
        this.getSeries();
        this.getUsers();
    },
    methods: {
        getLibrary() {
            movieKnightAPI.get('orders')
                .then(response => {
                    console.log('Orders Response data:', response.data)
                    this.orders = response.data.map(order => ({
                        id: order.id,
                        user_id: order.user_id,
                        movie_id: order.movie_id,
                        serie_id: order.serie_id,
                        price: order.price,
                    }));

                    console.log(this.orders);
                })
                .catch(error => {
                    console.error(error);
                    this.errorMessage = error;
                });
        },
        selectOrder(id, order) {
            this.selectedOrderId = id;
            this.selectedOrder = order;
        },
        addLibrary() {
            this.errorMessage = null;
            if (!this.checkLibraryInput(this.newOrder)) {
                return;
            }
            this.checkLibraryInput(this.newOrder);
            const newOrder = [this.newOrder];
            movieKnightAPI.post('orders', newOrder)
                .then(response => {
                    this.$toast.success("New user added", { position: "top" });
                    this.addLibraryModal.close();
                    this.getLibrary();
                    this.newOrder = {
                        user_id: null,
                        movie_id: null,
                        serie_id: null,
                        price: null,
                    };
                })
                .catch(error => {
                    this.errorMessage = error;
                });
        },
        checkLibraryInput(checkOrder){
            if (checkOrder.user_id == null && checkOrder.movie_id == null && checkOrder.serie_id == null && checkOrder.price == null) {
                this.errorMessage = "Please fill in the fields";
                return false;
            }
            if (checkOrder.user_id == null) {
                this.errorMessage = "Please enter the user_id";
                return false;
            }
            if ((checkOrder.movie_id && checkOrder.serie_id) || (!checkOrder.movie_id && !checkOrder.serie_id)) {
                this.errorMessage = "Please fill in only one of the fields: movie_id or serie_id";
                return false;
            }
            if (checkOrder.price == null) {
                this.errorMessage = "Please enter the price";
                return false;
            }
            return true;
        },
        updateLibrary() {
            if (this.selectedOrderId) {
                this.errorMessage = null;
                if (!this.checkLibraryInput(this.selectedOrder)) {
                    return;
                }
                movieKnightAPI.put('orders/' + this.selectedOrderId, this.selectedOrder)
                    .then(response => {
                        this.$toast.success("Library item updated", { position: "top" });
                        this.updateLibraryModal.close();
                        this.selectOrder = {
                            user_id: null,
                            movie_id: null,
                            serie_id: null,
                            price: null,
                        };
                    })
                    .catch(error => {
                        this.errorMessage = error;
                    });
            }
        },
        deleteLibrary() {
            if (this.selectedOrderId) {

                movieKnightAPI.delete('orders/' + this.selectedOrderId)
                    .then(response => {
                        this.$toast.success("Library item deleted", { position: "top" });
                        this.deleteLibraryModal.close();
                        this.getLibrary();
                    })
                    .catch(error => {
                        this.errorMessage = error;
                    });
            }
        },
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
                    this.errorMessage = error;
                });
        },
        selectMovie(id, movie) {
            this.selectedMovieId = id;
            this.selectedMovie = movie;
        },
        addMovie() {
            this.errorMessage = null;
            if (!this.checkMovieInput(this.newMovie)) {
                return;
            }            
            movieKnightAPI.post('movies', this.newMovie)
                .then(response => {
                    this.$toast.success("New movie added", { position: "top" });
                    this.addMovieModal.close();
                    this.getMovies();
                    this.newMovie = {
                        title: '',
                        price: '',
                        description: '',
                        image: '',
                        movie_id: '',
                    };
                })
                .catch(error => {
                    this.errorMessage = error;
                });
        },
        checkMovieInput(checkMovie){
            if (checkMovie.title == null && checkMovie.price == null && checkMovie.description == null && checkMovie.image == null && checkMovie.movie_id == null) {
                this.errorMessage = "Please fill in at least one of the fields";
                return false;
            }
            if (checkMovie.title == null) {
                this.errorMessage = "Please enter the title";
                return false;
            }
            if (checkMovie.price == null) {
                this.errorMessage = "Please enter the price";
                return false;
            }
            if (checkMovie.description == null) {
                this.errorMessage = "Please enter the description";
                return false;
            }
            if (checkMovie.image == null) {
                this.errorMessage = "Please enter the image";
                return false;
            }
            if (checkMovie.movie_id == null) {
                this.errorMessage = "Please enter the movie_id";
                return false;
            }
            return true;
        },
        updateMovie() {
            if (this.selectedMovieId) {
                this.errorMessage = null;
                if (!this.checkMovieInput(this.selectedMovie)) {
                    return;
                }
                movieKnightAPI.put('movies/' + this.selectedMovieId, this.selectedMovie)
                    .then(response => {
                        this.$toast.success("Movie updated", { position: "top" });
                        this.updateMovieModal.close();
                        this.getMovies();
                        this.selectedMovie = {
                            title: '',
                            price: '',
                            description: '',
                            image: '',
                            movie_id: '',
                        };
                    })
                    .catch(error => {
                        this.errorMessage = error;
                    });
            }
        },
        deleteMovie() {
            if (this.selectedMovieId) {
                movieKnightAPI.delete('movies/' + this.selectedMovieId)
                    .then(response => {
                        this.$toast.success("Movie deleted", { position: "top" });
                        this.deleteMovieModal.close();
                        this.getMovies();
                    })
                    .catch(error => {
                        this.errorMessage = error;
                    });
            }
        },
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
                    this.errorMessage = error;
                });
        },
        selectSerie(id, serie) {
            this.selectedSerieId = id;
            this.selectedSerie = serie;
        },
        addSerie() {
            this.errorMessage = null;
            if (!this.checkSerieInput(this.newSerie)) {
                return;
            }
            movieKnightAPI.post('series', this.newSerie)
                .then(response => {
                    this.$toast.success("New serie added", { position: "top" });
                    this.addSerieModal.close();
                    this.getSeries();
                    this.newSerie = {
                        title: "",
                        price: "",
                        description: "",
                        image: "",
                        serie_id: ""
                    };
                })
                .catch(error => {
                    this.errorMessage = error;
                });
        },
        checkSerieInput(checkSerie){
            if (checkSerie.title == null && checkSerie.price == null && checkSerie.description == null && checkSerie.image == null && checkSerie.serie_id == null) {
                this.errorMessage = "Please enter the title, price, description, image and serie_id";
                return false;
            }
            if (checkSerie.title == null) {
                this.errorMessage = "Please enter the title";
                return false;
            }
            if (checkSerie.price == null) {
                this.errorMessage = "Please enter the price";
                return false;
            }
            if (checkSerie.description == null) {
                this.errorMessage = "Please enter the description";
                return false;
            }
            if (checkSerie.image == null) {
                this.errorMessage = "Please enter the image";
                return false;
            }
            if (checkSerie.serie_id == null) {
                this.errorMessage = "Please enter the serie_id";
                return false;
            }
            return true;
        },
        updateSerie() {
            if (this.selectedSerieId) {
                this.errorMessage = null;
                if (!this.checkSerieInput(this.selectedSerie)) {
                    return;
                }
                movieKnightAPI.put('series/' + this.selectedSerieId, this.selectedSerie)
                    .then(response => {
                        this.$toast.success("Serie updated", { position: "top" });
                        this.updateSerieModal.close();
                        this.getSeries();
                        this.selectedSerie = {
                            title: "",
                            price: "",
                            description: "",
                            image: "",
                            serie_id: ""
                        };
                    })
                    .catch(error => {
                        this.errorMessage = error;
                    });
            }
        },
        deleteSerie() {
            if (this.selectedSerieId) {
                movieKnightAPI.delete('series/' + this.selectedSerieId)
                    .then(response => {
                        this.$toast.success("Serie deleted", { position: "top" });
                        this.deleteSerieModal.close();
                        this.getSeries();
                    })
                    .catch(error => {
                        this.errorMessage = error;
                    });
            }
        },
        getUsers() {
            movieKnightAPI.get('users')
                .then(response => {
                    console.log(response.data)
                    this.users = response.data.map(user => ({
                        id: user.id,
                        username: user.username,
                        password_hash: user.password,
                        email: user.email,
                        admin: user.admin,
                    }));
                })
                .catch(error => {
                    console.error(error);
                    this.errorMessage = error;
                });
        },
        selectUser(id, user) {
            this.selectedUserId = id;
            this.selectedUser = user;
        },
        addUser() {
            this.errorMessage = null;
            if (!this.checkUserInput(this.newUser)) {
                return;
            }
            this.newUser.admin = this.newUser.admin ? 1 : 0;
            movieKnightAPI.post('users', this.newUser)
                .then(response => {
                    this.$toast.success("New user added", { position: "top" });
                    this.addUserModal.close();
                    this.getUsers();
                    this.newUser = {
                        username: '',
                        password: '',
                        email: '',
                        admin: false
                    };
                })
                .catch(error => {
                    this.errorMessage = error;
                });
        },
        checkUserInput(checkUser){
            if (checkUser.username == null && checkUser.password == null && checkUser.email == null) {
                this.errorMessage = "Please enter the username, password and email";
                return false;
            }
            if (checkUser.username == null) {
                this.errorMessage = "Please enter the username";
                return false;
            }
            if (checkUser.password == null) {
                this.errorMessage = "Please enter the password";
                return false;
            }
            if (checkUser.email == null) {
                this.errorMessage = "Please enter the email";
                return false;
            }
            return true;
        },
        updateUser() {
            if (this.selectedUserId) {
                this.errorMessage = null;
                if (!this.checkUserInput(this.selectedUser)) {
                    return;
                }

                this.selectedUser.admin = this.selectedUser.admin ? 1 : 0;
                movieKnightAPI.put('users/' + this.selectedUserId, this.selectedUser)
                    .then(response => {
                        // this.$toast.warning("This is the response: " + response.data, { position: "top" });
                        this.$toast.success("User updated", { position: "top" });
                        this.updateUserModal.close();
                        this.getUsers();
                        this.selectedUser = {
                            username: '',
                            password: '',
                            email: '',
                            admin: false
                        };
                    })
                    .catch(error => {
                        this.errorMessage = error;
                    });
            }
        },
        deleteUser(user) {
            if (this.selectedUserId) {
                movieKnightAPI.delete('users/' + this.selectedUserId)
                    .then(response => {
                        this.$toast.success("User deleted", { position: "top" });
                        this.deleteUserModal.close();
                        this.getUsers();
                    })
                    .catch(error => {
                        this.errorMessage = error;
                    });
            }
        },
    },
    components: {
        Modal,
    },
};

</script>