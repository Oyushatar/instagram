const Router = require("express");
const commentRouter = Router();
const commentModel = require("../models/commentSchema");
const postModel = require("../models/postSchema");
const userModel = require("../models/userSchema");

commentRouter.post("/comments", async (req, res) => {
  const { userId, postId, comment, profile } = req.body;

  const newComment = await commentModel.create({
    postId: postId,
    comment: comment,
    userId: userId,
    profile: profile,
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

commentRouter.get("/comment/:postId", async (req, res) => {
  const { postId } = req.params;
  s;
  try {
    const comment = await commentModel.find({ postId }).populate("userId");
    res.send(comment);
  } catch (error) {
    res.send(error);
  }
});
module.exports = commentRouter;
