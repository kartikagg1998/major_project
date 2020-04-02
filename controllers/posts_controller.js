const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){

    try{
       await Post.create({
            content: req.body.content, 
            user: req.user._id
        });
    
        req.flash('succes','Post created successfully');
        return res.redirect('back');

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
        }

}


module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if(post.user == req.user.id){
            post.remove();
    
          await Comment.deleteMany({post: req.params.id});

          req.flash('succes','Post deleted successfully');
          return res.redirect('back');
    
        }else{
            req.flash('error','Not Authorized to delete');
           return res.redirect('back');
        }

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
        }


}