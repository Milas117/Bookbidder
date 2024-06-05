<template>
  <div class="container">
    <h1>Put your book on auction</h1>
    <form @submit.prevent="createBookAuction" class="form">
      <div class="form-group">
        <label for="imageUrl">Image URL:</label>
        <input type="text" id="imageUrl" v-model="imageUrl" class="form-control" required>
      </div>
      
      <div class="form-group">
        <label for="bookName">Book Name:</label>
        <input type="text" id="bookName" v-model="bookName" class="form-control" required>
      </div>
      
      <div class="form-group">
        <label for="bookAuthor">Book Publisher:</label>
        <input type="text" id="bookAuthor" v-model="bookAuthor" class="form-control" required>
      </div>
      
      <div class="form-group">
        <label for="startingPrice">Starting Price:</label>
        <input type="number" id="startingPrice" v-model="startingPrice" class="form-control" required>
      </div>
      
      <div class="form-group">
        <label for="biddingDays">Bidding Days:</label>
        <input type="number" id="biddingDays" v-model="biddingDays" class="form-control" required>
      </div>
      
      <button type="submit" class="btn btn-primary">Create Auction</button>
    </form>
  </div>
</template>

<script>
import { createBookAuction } from '../../service/index.js'; 

export default {
  data() {
    return {
      imageUrl: '',
      bookName: '',
      bookAuthor: '',
      startingPrice: '',
      biddingDays: ''
    };
  },
  methods: {
    async createBookAuction() {
    try {
      await createBookAuction({
        imageUrl: this.imageUrl,
        bookName: this.bookName,
        bookAuthor: this.bookAuthor,
        startingPrice: this.startingPrice,
        biddingDays: this.biddingDays
      });
      alert('Auction created successfully');
      this.$router.push('/');
    } catch (error) {
      alert('Error creating auction: ' + error.message);
    }
  }
  }
};
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
