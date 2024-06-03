const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const cors = require('cors');
const User = require('./models/User');
const Auction = require('./models/Auction');
const AuctionMessage = require('./models/AuctionMessage');
const { authenticateToken, createToken } = require('./utils/auth'); 
const { saveAuctionMessage, updateAuctionStatuses } = require('./utils/auction'); 

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const { v4: uuidv4 } = require('uuid');

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

app.get('/health', async (req, res) => {
    try {
        await mongoose.connection.db.admin().ping();
        res.status(200).send('MongoDB connection is successful');
    } catch (error) {
        res.status(500).send('MongoDB connection is not successful');
    }
});

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        email,
        password: hashedPassword
    });

    try {
        await user.save();

      
        const token = createToken(user, '5h'); 

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = createToken(user); 

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                email: user.email,
                name: user.username 
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
});

app.post('/createBookAuction', authenticateToken, async (req, res) => {
    const { imageUrl, bookName, bookAuthor, startingPrice, biddingDays } = req.body;
    const seller = await User.findById(req.user.id);

    if (!seller) {
        return res.status(404).json({ message: 'Seller not found' });
    }

    const biddingEndDate = new Date();
    biddingEndDate.setDate(biddingEndDate.getDate() + biddingDays);

    const auctionId = uuidv4().replace(/-/g, '').substr(0, 15);

    const auction = new Auction({
        auctionId, 
        imageUrl,
        bookName,
        bookAuthor,
        sellerName: seller.username,
        sellerEmail: seller.email,
        startingPrice,
        biddingEndDate,
        publishedDate: new Date()
    });

    try {
        await auction.save();
        res.status(201).json({ message: 'Auction created successfully', auction });
    } catch (error) {
        res.status(500).json({ message: 'Error creating auction', error });
    }
});

app.post('/bid/:auctionId', authenticateToken, async (req, res) => {
    const { auctionId } = req.params;
    const { bidAmount } = req.body;
    
    try {
        const auction = await Auction.findOne({ auctionId: auctionId });
        if (!auction) {
            return res.status(404).json({ message: 'Auction not found' });
        }
        
        if (new Date() > new Date(auction.biddingEndDate)) {
            return res.status(400).json({ message: 'Auction has ended' });
        }

        if (bidAmount <= auction.startingPrice || bidAmount <= auction.highestBid) {
            return res.status(400).json({ message: 'Bid amount must be higher than the current highest bid and starting price' });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (auction.sellerEmail === user.email) {
            return res.status(400).json({ message: "You can't bid on your own auction" });
        }

        auction.highestBid = bidAmount;
        auction.bidderId = user._id;
        auction.bidderName = user.username;
        auction.bookBidder = user.email;
        
        await auction.save();

        res.status(200).json({ message: 'Bid placed successfully', auction });
    } catch (error) {
        res.status(500).json({ message: 'Error placing bid', error });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users' });
    }
});

app.get('/auctions', async (req, res) => {
    try {
        const auctions = await Auction.find();
        res.status(200).json(auctions);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving auctions', error });
    }
});

app.get('/messages', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const messages = await AuctionMessage.find({ sellerEmail: user.email });

        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/userAuctions', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const messages = await Auction.find({ sellerEmail: user.email });

        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    updateAuctionStatuses();
    setInterval(updateAuctionStatuses, 60000);
    console.log(`Server is running at http://localhost:${PORT}`);
});
