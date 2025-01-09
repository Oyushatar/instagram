const Route = require("express");
const postModel = require("../models/postSchema");
const likeRouter = Route();

likeRouter.post("/post/like", async (req, res) => {
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

module.exports = likeRouter;
