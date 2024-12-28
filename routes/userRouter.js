const Route = require("express");
const useRouter = Route();
const userModel = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const postModel = require("../models/postSchema");
const bcrypt = require("bcrypt");
const authMiddleWare = require("../models/auth-middleWare");

useRouter.post("/signup", authMiddleWare, async (req, res) => {
  const { email, username, password } = req.body;
  const saltRound = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRound);
    const createdUser = await userModel.create({
      email: email,
      username: username,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        userId: createdUser._id,
        username: createdUser.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "72h" }
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

useRouter.get("/posts", async (req, res) => {
  const posts = await postModel.find().populate("userId");
  return res.json(posts);
});

useRouter.get("/user", async (req, res) => {
  try {
    const post = await userModel.find().populate("posts");
    res.status(200).json(post);
  } catch (error) {
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

// useRouter.post("/comments", async (req, res) => {
//   const { userId, postId, comment } = req.body;

//   const newComment = await commentModel.create({
//     postId: postId,
//     comment: comment,
//     userId: userId,
//   });

//   const updated = await postModel.findByIdAndUpdate(
//     postId,
//     {
//       $push: {
//         comments: newComment._id,
//       },
//     },
//     { new: true }
//   );

//   res.send(newComment._id);
// });

useRouter.post("logIn", async (req, res) => {
  const { email, password, username } = req.body;
  const saltRound = 10;
  const hashedPassword = await bcrypt.hash(password, saltRound);
});
module.exports = useRouter;
