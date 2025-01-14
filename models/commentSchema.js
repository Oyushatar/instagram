const { profile } = require("console");
const { Schema, mongoose } = require("mongoose");

const commentSchema = new Schema({
  postId: { type: mongoose.Types.ObjectId, ref: "posts" },
  comment: { type: String },
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
  profile: { type: mongoose.Types.ObjectId, ref: "users" },
});

const commentModel = mongoose.model("comment", commentSchema);
module.exports = commentModel;
