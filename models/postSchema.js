const { Schema, mongoose } = require("mongoose");

const postSchema = new Schema({
  description: { type: String, required: true },
  postImage: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
  comments: [{ type: mongoose.Types.ObjectId, ref: "comments" }],
});

const postModel = mongoose.model("posts", postSchema);
module.exports = postModel;
