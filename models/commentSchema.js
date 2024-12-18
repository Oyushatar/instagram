const { profile } = require("console");
const { Schema, mongoose } = require("mongoose");

const commentSchema = new Schema({
  postId: { type: Schema.ObjectId, ref: "posts" },
  comment: { type: String },
  userId: { type: Schema.ObjectId, required: true, ref: "users" },
  profileImage: { type: Schema.ObjectId, required: true, ref: "users" },
  userName: { type: Schema.ObjectId, required: true, ref: "users" },
});

const commentModel = mongoose.model("comment", commentSchema);
module.exports = commentModel;
