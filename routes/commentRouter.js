const Router = require("express");
const commentRouter = Route();

commentRouter.post("/comments", async (req, res) => {
  const { profileImage, userId, postId, comment, userName } = req.body;

  const newComment = await commentModel.create({
    postId: postId,
    comment: comment,
    userId: userId,
    profile: profile,
    userName: userName,
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
    const comment = await userModel.find().populate("comments");
    res.status(200).json(comment);
  } catch (error) {
    res.send(error);
  }
});
module.exports = commentRouter;
