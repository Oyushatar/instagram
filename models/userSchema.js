const {Schema , mongoose} = require("mongoose");

const userSchema = new Schema({
    username : {type: String , required : true},
    password : {type: String , required : true},
    email : {type: String , required : true},
    profile : {type: String},
    posts : [{type : Schema.ObjectId , ref: "posts"}],
    followers : [{type : Schema.ObjectId, ref: "users"}],
    following : [{type : Schema.ObjectId, ref: "users"}],
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;