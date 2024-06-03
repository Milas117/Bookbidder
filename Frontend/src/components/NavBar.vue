<template>
  <nav>
    <ul>
      <li class="nav-link">
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z"/>
        </svg>
        <router-link to="/" style="margin-left:10px">Home</router-link>
      </li>
      <li v-if="user" class="nav-link">
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10V6a3 3 0 0 1 3-3v0a3 3 0 0 1 3 3v4m3-2 .917 11.923A1 1 0 0 1 17.92 21H6.08a1 1 0 0 1-.997-1.077L6 8h12Z"/>
        </svg>
        <router-link to="/my_auctions" style="margin-left:10px">My auctions</router-link>
      </li>
      <li v-if="user" class="nav-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
          <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
        </svg>
        <router-link to="/create_auction" style="margin-left:10px;">Create book auction</router-link>
      </li>
      <li v-if="user" >
        <a href="#" class="nav-link" @mouseover="showNotifications = true" @mouseleave="showNotifications = false">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
          </svg>
          <span style="margin-left: 10px">Notifications ({{ messages.length }})</span>
          <div v-if="showNotifications" class="notification-dropdown">
            <div v-if="messages.length === 0">
              <p>You have 0 notifications.</p>
            </div>
            <div v-else>
              <div v-for="message in messages">
                <p>{{ messages.length }}. {{ message.message }}</p>
              </div>
            </div>
          </div>
        </a>
      </li>
      <li class="userEmail" v-if="user">
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" style="vertical-align: middle;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
        </svg> Hello, {{ user.name || user.username }}!
      </li> 
      <li v-else><router-link to="/login">Sign in</router-link></li>
      <a v-if="user" href="#" @click.prevent="logout" class="nav-link">
          <svg width="20px" height="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" class="icon" style="vertical-align: middle; margin-right: 10px;">
            <path fill="currentColor" d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 0 1-112.7 75.9A352.8 352.8 0 0 1 512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 0 1-112.7-75.9 353.28 353.28 0 0 1-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6z"/>
          </svg>
          Logout 
      </a>

    </ul>
  </nav>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed, ref, onMounted } from 'vue';
import { handleLogout, fetchFinishedAuctionMessages } from '../../service/index'; 

const store = useStore();
const showNotifications = ref(false);

const user = computed(() => store.getters.user);

const messages = ref([]);

onMounted(async () => {
  try {
    const fetchedMessages = await  fetchFinishedAuctionMessages()
    messages.value = fetchedMessages.map(message => ({
      sellerEmail: message.sellerEmail,
      auctionId: message.auctionId,
      bookName: message.bookName,
      message: message.message
    }))
  } catch (error) {
    console.error('Error fetching auction messages:', error.message);
  }
});

const logout = () => {
  handleLogout();
};
</script>

<style scoped>
nav {
  background-color: #333;
  padding: 1em;
}
ul {
  list-style: none;
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding: 0;
}
li {
  margin: 0 1em;
}
a {
  color: white;
  text-decoration: none;
  position: relative; 
}
a:hover {
  text-decoration: underline;
}
.userEmail {
  color: white;
}
.nav-link {
  color: white; 
  display: flex;
  align-items: center;
}
.notification-dropdown {
  position: absolute;
  top: 100%; 
  left: 0;
  background-color: #fff;
  padding: 0.5em;
  border: 1px solid #ccc;
  width: 300px;
  border-radius: 12px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000; 
}
.notification-dropdown p {
  margin: 0;
  padding: 0.5em 0;
  color: #333;
}
</style>