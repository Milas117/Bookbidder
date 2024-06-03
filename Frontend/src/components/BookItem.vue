<template>
    <div class="book">
      <div class="book-container">
        <img :src="book.image" :alt="book.title" class="book-image" />
        <div class="book-details">
          <h2>{{ book.title }}</h2>
          <p>{{ book.author }}</p>
          <p>Starting Bid: {{ book.startingBid }} €</p>
          <p v-if="book.highestBid !== undefined && book.highestBid > book.startingBid">Highest bid: {{ displayBid(book) }}by {{ book.bookBidder }} </p>
          <p v-else>This book has not received any bids yet.</p>
          <p v-if="book.status === 'in_progress'">Bid ends in: {{ formatEndDate(book.endDate) }}</p>
          <p class="expired-book" v-else>Bidding time for this book has ended!</p>
          <p>Published by: {{ book.sellerName }}</p>
          <div v-if="book.status === 'in_progress'">
            <input type="number" style="margin-bottom:10px" v-model="bidAmount" placeholder="Enter your bid amount" />
            <button class="bid-button" @click="placeBidNow(book.auctionId, bidAmount)">Bid Now</button>
          </div>
          <p v-if="book.status === 'ended' && book.highestBid !==0 " class="purchased-book">The book was purchased by: {{ book.bookBidder }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { placeBid } from '../../service/index.js'; 
  
  export default {
    props: {
      book: Object,
    },
    setup(props) {
      const bidAmount = ref(null);
      const formatEndDate = (endDate) => {
        const date = new Date(endDate);
        const formattedDate = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        const hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${formattedDate}, at ${hours}:${minutes}`;
      };
  
      const displayBid = (book) => {
        return book.highestBid > book.startingBid ? `${book.highestBid} €` : `${book.startingBid} €`;
      };
  
      const placeBidNow = async (auctionId, bidAmount) => {
        try {
          const integer64BidAmount = parseInt(bidAmount);
          console.log('auction id: ', auctionId);
          console.log("integer amount: ", auctionId, integer64BidAmount)
          await placeBid(auctionId, integer64BidAmount);
  
          window.location.reload();
        } catch (error) {
          console.error('Error placing bid:', error.message);
        }
      };
  
      return {
        bidAmount,
        formatEndDate,
        displayBid,
        placeBidNow,
      };
    }
  };
  </script>
  
  <style scoped>
  .main-section {
    padding-left: 50px;
    padding-right: 50px;
  }
  .description-section {
    text-align: center;
  }
  .welcome-text {
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
  .expired-book {
    color: red;
  }
  .purchased-book {
    color: green;
  }
  </style>