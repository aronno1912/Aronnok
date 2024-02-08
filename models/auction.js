const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const auctionProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        description: {
            type: String,
            trim: true,
            required: true,
            maxlength: 2000
        },
        photo: {
            type: String
        },
        isSold: {
            type: Boolean,
            default: false // Set default to false, assuming the product is not sold by default
        },
        highestBidder: {
            type: ObjectId,
            ref: "User" // Adjust based on your user schema
        },
        currentBid: {
            type: Number,
            default: 0
        },
        bids: [
            {
                bidder: {
                    type: ObjectId,
                    ref: "User"
                },
                bidAmount: {
                    type: Number
                },
                timestamp: {
                    type: Date,
                    default: Date.now
                }
            }
        ]
    },
    { timestamps: true }
);

const auctionSchema = new mongoose.Schema(
    {
        // Add other fields related to the auction
        name: {
            type: String,
            trim: true,
            // required: true,
            maxlength: 100
        },
        date:
        {
            type: Date,
        },
        startTime: {
            type: Date,
            required: true
        },
        endTime: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            default: "upcoming",
            enum: ["upcoming", "ongoing", "completed"],
        },
        auctionProducts: [
            {
                type: ObjectId,
                ref: "AuctionProduct"
            }
        ]
    },
    { timestamps: true }
);

// Function to update auction status based on current time
const updateAuctionStatus = async function () {
    const currentTime = new Date();
    // console.log(currentTime);
    try {
        const auctions = await Auction.find({
            status: 'upcoming',
            startTime: { $gte: currentTime }
        });

        auctions.forEach(async (auction) => {
            auction.status = 'ongoing';
            await auction.save();
        });

        const completedAuctions = await Auction.find({
            status: 'ongoing',
            endTime: { $lte: currentTime },
        });

        completedAuctions.forEach(async (auction) => {
            auction.status = 'completed';
            await auction.save();
        });
    } catch (error) {
        console.error('Error updating auction status:', error);
    }
};

// Schedule the function to run every minute
setInterval(updateAuctionStatus, 60000);

const AuctionProduct = mongoose.model('AuctionProduct', auctionProductSchema);
const Auction = mongoose.model('Auction', auctionSchema);

module.exports = { AuctionProduct, Auction };
