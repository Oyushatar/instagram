const Route = require("express");
const useRouter = Route();
const userModel = require("../models/userSchema");
const commentModel = require("../models/commentSchema");
const postModel = require("../models/postSchema");

useRouter.post("/signup", async (req, res) => {
  try {
    const body = req.body;
    const { password } = body;
    const response = await userModel.create(body);
    console.log("done");
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

useRouter.get("/posts", async (req, res) => {
  const posts = await postModel.find();
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

useRouter.post("/comments", async (req, res) => {
  const { userId, postId, comment } = req.body;

  const newComment = await commentModel.create({
    postId: postId,
    comment: comment,
    userId: userId,
  });

  const updated = await postModel.findByIdAndUpdate(
    postId,
    {
      $push: {
        comments: newComment._id,
      },
    },
    { new: true }
  );

  res.send(newComment._id);
});
module.exports = useRouter;
