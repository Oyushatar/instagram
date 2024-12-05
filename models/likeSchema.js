const { Schema, mongoose } = require("mongoose");

const likeSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
  postId: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
});

const likeModel = mongoose.model("posts", likeSchema);
module.exports = likeModel;
