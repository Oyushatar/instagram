const express = require("express");
const useRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const likeRouter = require("./routes/likeRouter");
const userModel = require("./models/userSchema");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const cors = require("cors");
const commentRouter = require("./routes/commentRouter");
app.use(cors());
app.use(express.json());

const database = async () => {
  try {
    const base = await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB success");
  } catch (error) {
    console.log(error);
  }
};
database();

app.get("/getOneUser", async (req, res) => {
  try {
    const userId = req.body.userId;
    const populatedUser = await userModel
      .findById(userId)
      .populate("post follow following");
    res.send(populatedUser);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.use(likeRouter);
app.use(useRouter);
app.use(postRouter);
app.use(commentRouter);

app.listen(8080, console.log("running on port 8080"));
