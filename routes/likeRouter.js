const Route = require("express");
const postModel = require("../models/postSchema");
const likeRouter = Route();

likeRouter.post("/post/like", async (req, res) => {
  s;
  try {
    const { userId, postId } = req.body;
    likedPostResponse = await postModel.findByIdAndUpdate(postId, {
      $addToSet: {
        likes: userId,
      },
    });
    res.status(200).json(likedPostResponse);
  } catch (error) {
    res.status(500).send(error);
  }
});

likeRouter.get("/getLikes/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const likedUsers = await postModel
      .findById(postId)
      .populate("likes", "profile username");
    res.send(likedUsers.likes);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

likeRouter.post("/post/unlike", async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const unlikedPostResponse = await postModel.findByIdAndUpdate(
      postId,
      {
        $pull: {
          likes: userId,
        },
      },
      { new: true }
    );
    res.status(200).json(unlikedPostResponse);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = likeRouter;
