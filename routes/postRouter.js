const Route = require("express");
const postModel = require("../models/postSchema")
const postRouter = Route();
const userModel = require('../models/userSchema')

postRouter.post("/post" , async(req, res) =>{
    try{
        const {description , postImage , userId} = req.body;
        const createPost = await postModel.create({
            description,
            postImage,
            userId
        });
        res.send(createPost)
        await userModel.findByIdAndUpdate(userId , {
            $push: {
                post: createPost._id
            },
        })
        
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

module.exports = postRouter;
// post = {
//     caption,
//     userId
// }  = Post Model => create