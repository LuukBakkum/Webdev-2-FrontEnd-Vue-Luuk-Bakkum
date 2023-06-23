<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <h2 id="navTitle">MovieKnight</h2>
      <ul class="navbar-nav me-auto mb-2 mb-md-0 nav-container">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/movies" class="nav-link" active-class="active">Movies</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/series" class="nav-link" active-class="active">Series</router-link>
        </li>
      </ul>
      <div class="d-flex ms-auto">
        <ul class="navbar-nav">
          <li v-if="isAdmin" class="nav-item">
            <router-link to="/admin" class="nav-link" active-class="active">Admin Terminal</router-link>
          </li>
          <li v-if="isAuthenticated" class="nav-item">
            <router-link to="/library" class="nav-link" active-class="active">Personal Library</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/cart" class="nav-link" active-class="active">View cart</router-link>
          </li>
          <li class="nav-item">
            <LoginModal v-if="!isAuthenticated" ref="loginModalRef" />
            <button type="button" class="btn btn-success" v-if="!isAuthenticated" @click="openLoginModal">Login</button>
            <router-link to="/" type="button" class="btn btn-danger" v-if="isAuthenticated"
              @click="handleLogout">Logout</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
// import Navigation from '@/assets/js/navigation.js'
// export default Navigation;

import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import LoginModal from './Login.vue';
import { userAuthStore } from '../stores/auth-store';

export default {
  name: 'Navigation',
  components: {
    LoginModal,
  },
  setup() {
    const loginModalRef = ref(null);
    const store = userAuthStore();
    const router = useRouter();
    store.autoLogin();

    const isAuthenticated = computed(() => store.isAuthenticated);
    const isAdmin = computed(() => store.isAdmin);
    const userName = computed(() => store.username);

    function openLoginModal() {
      loginModalRef.value.openModal();
    }

    function handleLogout() {
      store.logout();  // logout method to be defined in your auth store
      console.log(isAuthenticated.value, userName.value);
      router.push('/');
    }

    return {
      loginModalRef,
      openLoginModal,
      isAuthenticated, // And here
      isAdmin,
      userName,
      handleLogout,
    }
  },
};
</script>

<style></style>
