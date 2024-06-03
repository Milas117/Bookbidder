const Auction = require('../models/Auction');
const AuctionMessage = require('../models/AuctionMessage');

const saveAuctionMessage = async (sellerEmail, auctionId, bookName, message) => {
    try {
        let existingMessage = await AuctionMessage.findOne({ auctionId });

        if (existingMessage) {
            existingMessage.message = message;
            existingMessage.createdAt = new Date(); 
            await existingMessage.save();
        } else {
            const auctionMessage = new AuctionMessage({
                sellerEmail,
                auctionId,
                bookName,
                message,
                createdAt: new Date()
            });

            await auctionMessage.save();
        }
    } catch (error) {
        console.error('Error saving/updating auction message:', error);
    }
};

const updateAuctionStatuses = async () => {
    try {
        const now = new Date();

        const endedAuctions = await Auction.find({ biddingEndDate: { $lt: now }, status: 'ended' });

        for (const auction of endedAuctions) {
            let message;
            if (auction.bookBidder) {
                message = `Auction has ended, your book has been sold to ${auction.bookBidder}. Contact the user via email.`;
            } else {
                message = 'No user has bid on your book. You can put it on auction again.';
            }
            await saveAuctionMessage(auction.sellerEmail, auction.auctionId, auction.bookName, message);
        }

        await Auction.updateMany(
            { biddingEndDate: { $lt: now }, status: 'in_progress' },
            { $set: { status: 'ended' } }
        );

        await Auction.updateMany(
            { biddingEndDate: { $gte: now }, status: { $ne: 'in_progress' } },
            { $set: { status: 'in_progress' } }
        );

        console.log('Auction statuses updated');
    } catch (error) {
        console.error('Error updating auction statuses:', error);
    }
};

module.exports = {
    saveAuctionMessage,
    updateAuctionStatuses
};
