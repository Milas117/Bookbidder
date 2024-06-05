<template>
  <div class="main-section">
    <div class="description-section">
      <h1 class="main-text">List of my auctions</h1>
    </div>
    <div class="books">
      <BookItem v-for="book in books" :key="book.id" :book="book" :isMyAuction="true" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchUserAuctions } from '../../service/index.js'; 
import BookItem from '@/components/BookItem.vue'; 

const books = ref([]);

onMounted(async () => {
  try {
    const fetchedAuctions = await fetchUserAuctions();
    books.value = fetchedAuctions.map(auction => ({
      auctionId: auction.auctionId,
      title: auction.bookName,
      author: auction.bookAuthor,
      startingBid: auction.startingPrice,
      highestBid: auction.highestBid,
      bookBidder: auction.bookBidder,
      status: auction.status,
      image: auction.imageUrl,
      endDate: auction.biddingEndDate,
      sellerName: auction.sellerName
    }));
  } catch (error) {
    console.error('Error fetching auctions:', error.message);
  }
});
</script>

<style scoped>
.main-section {
  padding-left: 50px;
  padding-right: 50px;
}
.description-section {
  text-align: center;
}
.main-text {
  font-size: 40px;
}
.books {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1em;
  margin: 0 auto;
  max-width: 1200px;
}
.book {
  border: 1px solid #ccc;
  box-sizing: border-box;
  padding: 1em;
}
.book-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.book-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 1em;
}
.book-details {
  text-align: center;
}
.bid-button {
  display: inline-block;
  padding: 0.5em 1em;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}
.bid-button:hover {
  background-color: #45a049;
}
.bid-button:active {
  background-color: #3e8e41;
}
@media (min-width: 768px) {
  .books {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .books {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
