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
    try {
        // Move auctions from 'upcoming' to 'ongoing' when start time is less than or equal to current time and end time is greater than current time
        const upcomingAuctionsToOngoing = await Auction.find({
            status: 'upcoming',
            startTime: { $lte: currentTime },
            endTime: { $gt: currentTime }
        });

        // console.log("upcoming to ongoing");
        // console.log(upcomingAuctionsToOngoing);

        upcomingAuctionsToOngoing.forEach(async (auction) => {
            auction.status = 'ongoing';
            await auction.save();
        });

        // Move auctions from 'ongoing' to 'completed' when end time is less than or equal to current time
        const ongoingAuctionsToCompleted = await Auction.find({
            status: 'ongoing',
            endTime: { $lte: currentTime },
        });

        // console.log("ongoing to completed");
        // console.log(ongoingAuctionsToCompleted);

        ongoingAuctionsToCompleted.forEach(async (auction) => {
            auction.status = 'completed';
            await auction.save();
        });

        // Move auctions from 'pending' to 'upcoming' when start time is greater than current time
        const pendingAuctionsToUpcoming = await Auction.find({
            // status: 'pending',
            startTime: { $gt: currentTime }
        });

        // console.log("pending to upcoming");
        // console.log(pendingAuctionsToUpcoming);

        pendingAuctionsToUpcoming.forEach(async (auction) => {
            auction.status = 'upcoming';
            await auction.save();
        });
    } catch (error) {
        console.error('Error updating auction status:', error);
    }
};


// Schedule the function to run every minute
setInterval(updateAuctionStatus, 10000);

const AuctionProduct = mongoose.model('AuctionProduct', auctionProductSchema);
const Auction = mongoose.model('Auction', auctionSchema);

module.exports = { AuctionProduct, Auction };
