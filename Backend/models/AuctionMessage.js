const mongoose = require('mongoose');

const auctionMessageSchema = new mongoose.Schema({
    sellerEmail: { type: String, required: true },
    auctionId: { type: String, required: true },
    bookName: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AuctionMessage', auctionMessageSchema);