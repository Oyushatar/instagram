const Route = require("express");
const postModel = require("../models/postSchema");
const postRouter = Route();
const userModel = require("../models/userSchema");

postRouter.post("/post", async (req, res) => {
  try {
    const { description, postImage, userId, profileImage, likes } = req.body;
    const createPost = await postModel.create({
      description,
      postImage,
      userId,
      likes,
    });
    res.send(createPost);
    await userModel.findByIdAndUpdate(userId, {
      $push: {
        post: createPost._id,
      },
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

postRouter.get("/posts", async (req, res) => {
  const posts = await postModel
    .find()
    .populate("userId", "profileImage username");
  return res.json(posts);
});

module.exports = postRouter;
