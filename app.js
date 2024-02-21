require("dotenv").config();
var express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
var app = express();

app.use(cors());
app.use(cookieParser());

app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`);
})


const mongoose = require('mongoose');
// const uri = "mongodb+srv://aronnok:aronnok@cluster0.yufjo2r.mongodb.net/aronnok?retryWrites=true&w=majority";
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
// ===========================================================
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const authRoute = require('./routes/auth');
app.use('/api', authRoute);
const userRoutes = require("./routes/user");
app.use("/api", userRoutes);
const productRoutes = require("./routes/product");
app.use("/api", productRoutes);
const categoryRoutes = require("./routes/category");
app.use("/api", categoryRoutes);
const paymentRoutes = require("./routes/payment");
app.use("/api", paymentRoutes);
const favouritesRoutes = require("./routes/favourites");
app.use("/api", favouritesRoutes);
const wishlistRoutes = require("./routes/wishlist");
app.use("/api", wishlistRoutes);
const cartRoutes = require("./routes/cart");
app.use("/api", cartRoutes);
const orderRoutes = require("./routes/order");
app.use("/api", orderRoutes);
const auctionRoutes = require("./routes/auction");
app.use("/api", auctionRoutes);
const notificationRoutes = require("./routes/notification");
app.use("/api", notificationRoutes);
const sellRoutes = require("./routes/sell");
app.use("/api", sellRoutes);

// const Multer = require('multer');
// const { google } = require('googleapis');
// const fs = require("fs");
// const multer = Multer({
//   storage: Multer.diskStorage({
//     destination: function (req, file, callback) {
//       let uploadDir = ''; // Initialize upload directory

//       // Check if req.body contains an upload directory
//       if (req.body.uploadDir) {
//         uploadDir = req.body.uploadDir;
//       } else {
//         // If no upload directory is specified, use a default directory
//         uploadDir = 'C:/Users/HP/Pictures/Saved Pictures';
//       }

//       // Set the destination path
//       callback(null, uploadDir);
//     },
//     filename: function (req, file, callback) {
//       callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
//     },
//   }),
//   limits: {
//     fileSize: 5 * 1024 * 1024,
//   },
// });

// const authenticateGoogle = () => {
//   const auth = new google.auth.GoogleAuth({
//     keyFile: `${__dirname}/aronnok-66e5b11f8e7a.json`,
//     scopes: "https://www.googleapis.com/auth/drive",
//   });
//   return auth;
// };

// const uploadToGoogleDrive = async (file, auth) => {
//   const fileMetadata = {
//     name: file.originalname,
//     parents: ["1pC3rLbP4Q1mrn8vCAAKvNX5Ck3Q0t6aj"], // Change it according to your desired parent folder id
//   };

//   const media = {
//     mimeType: file.mimetype,
//     body: fs.createReadStream(file.path),
//   };

//   const driveService = google.drive({ version: "v3", auth });

//   const response = await driveService.files.create({
//     requestBody: fileMetadata,
//     media: media,
//     fields: "id",
//   });
//   return response;
// };

// const deleteFile = (filePath) => {
//   fs.unlink(filePath, () => {
//     console.log("file deleted");
//   });
// };

// app.post("/upload-file-to-google-drive", multer.single("file"), async (req, res, next) => {
//   try {
//     console.log("nope");
//     if (!req.file) {
//       res.status(400).send("No file uploaded.");
//       return;
//     }
//     console.log("atleast");
//     const auth = authenticateGoogle();
//     const response = await uploadToGoogleDrive(req.file, auth);
//     // deleteFile(req.file.path);
//     res.status(200).json({ response });
//   } catch (err) {
//     console.log(err);
// }
// });