require("dotenv").config();
var express = require('express');
var app = express();
app.listen(process.env.PORT, () => {
  console.log('Server listening on 3000');
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