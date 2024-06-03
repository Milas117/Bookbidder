const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    auctionId: { type: String, required: true },
    imageUrl: { type: String, required: true },
    bookName: { type: String, required: true },
    bookAuthor: { type: String, required: true },
    sellerName: { type: String, required: true },
    sellerEmail: { type: String, required: true },
    startingPrice: { type: Number, required: true },
    highestBid: { type: Number, default: 0 }, 
    biddingEndDate: { type: Date, required: true },
    publishedDate: { type: Date, default: Date.now },
    bookBidder: { type: String, default: null },
    status: { type: String, default: 'in_progress' } 
});

module.exports = mongoose.model('Auction', auctionSchema);