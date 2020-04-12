const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.toggleLike = async function(req, res){
    try{

        // likes/toggle/?id=abcdef&type=Post
        let likeable;
        let deleted = false;

        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // check if the like is already there
        let existingLike = await Like.findOne({
            likebale: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        })

        // if a like already exist -> delete it
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();
            deleted = true;
        }else{
            // else make a new like
            let newLike = await Like.create({
                user: req.query._id,
                likeable: req.query.type
            });
            // where does this like comes from
            likeable.likes.push(like);
        }


    }catch(err){
        console.log(err);
        return res.json(500, {
            message: 'Internal Server Error'
        })
    }
}