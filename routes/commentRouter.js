const Router = require("express");
const commentRouter = Router();
const commentModel = require("../models/commentSchema");
const postModel = require("../models/postSchema");
const userModel = require("../models/userSchema");

commentRouter.post("/comments", async (req, res) => {
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

commentRouter.get("/comment", async (req, res) => {
  try {
    const comment = await userModel
      .find()
      .populate("comment", "userId", "postId");
    const response = commentModel.create({ userId, postId, comment });
    await postModel.findByIdAndUpdate(postId, {
      $push: {
        comment: response._id,
      },
    });
  } catch (error) {
    res.send(error);
  }
});
module.exports = commentRouter;
