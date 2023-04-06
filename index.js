// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// app.use(express.json());
// const db =
//   "mongodb+srv://j_shreyal:1234567890@cluster0.p5q24yr.mongodb.net/cipherdb?retryWrites=true&w=majority";
// const userRouter = require("./routes/userRoutes");

// mongoose.connect(db,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// }).then(() => {console.log("connection successful")}).catch((err) => {console.log(err)});


// // app.use(cors());

// app.get("/", (req, res) => {
//     res.send("Hello World");
// })
// app.use("/user", userRouter);
// app.listen(5000, () => {
//   console.log("server started on port 5000");
// });

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

//to serve images to public
app.use(express.static("public"));

//mongoose mongoDb connection
mongoose.set("strictQuery", true);
const connectDb = function () {
  return mongoose.connect(process.env.MONGO_URL, (error) => {
    if (error) {
      console.error(
        `Failed to connect to mongo on startup - retrying in 5 sec\n${error}`
      );
      setTimeout(connectDb, 5000);
    }
  });
};

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("disconnected", () => {
  console.log("Lost MongoDB connection Retrying...");
});

connectDb();

//middleware
app.use(express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors("http://localhost:3000"));

//routes
app.use("/user", userRoutes);


app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
