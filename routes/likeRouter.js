const Route = require("express");
const likeModel = require("../models/likeSchema");
const postModel = require("../models/postSchema");
const likeRouter = Route();

likeRouter.post("likes", async (req, res) => {
  const { userId, postId } = req.body;
  try {
    const newlike = await likeModel.create({
      userId,
      postId,
    });
    const newPopulatedLike = await likeModel.findById(userId).populate({
      path: "likes",
      populate: {
        path: "userId",
        select: "userName profileImage",
      },
    });
    res.send(comment);
    await postModel.findByIdAndUpdate(postId, {
      $addToSet: {
        likes: newPopulatedLike,
      },
    });
    res.send("working");
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});
