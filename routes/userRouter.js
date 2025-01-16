const Route = require("express");
const useRouter = Route();
const userModel = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const postModel = require("../models/postSchema");
const bcrypt = require("bcrypt");
const authMiddleWare = require("../models/auth-middleWare");

useRouter.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;
  const saltRound = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRound);
    const createdUser = await userModel.create({
      email,
      username,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        userId: createdUser._id,
        username: createdUser.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "9999h" }
    );

    console.log({
      userId: createdUser._id,
      username: createdUser.username,
    });
    res.json({
      user: createdUser,
      token,
    });
  } catch (error) {
    res.send({ message: `something went wrong ${error}` });
  }
});

useRouter.get("/user", async (req, res) => {
  try {
    const post = await userModel.find().populate("posts");
    res.status(200).json(post);
  } catch (error) {
    res.send(error);
  }
});
useRouter.get("/getOneUser", async (req, res) => {
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

useRouter.post("/follow", async (req, res) => {
  try {
    const { follewedUserId, follewingUserId } = req.body;
    await userModel.findByIdAndUpdate(follewingUserId, {
      $addToSet: {
        followers: follewedUserId,
      },
    });
    await userModel.findByIdAndUpdate(follewedUserId, {
      $addToSet: {
        following: follewingUserId,
      },
    });
    res.status(200).send(req.body);
  } catch (error) {
    throw new Error(error);
  }
});

useRouter.post("logIn", async (req, res) => {
  const { email, password, username } = req.body;
  const saltRound = 10;
  const hashedPassword = await bcrypt.hash(password, saltRound);
});
module.exports = useRouter;
