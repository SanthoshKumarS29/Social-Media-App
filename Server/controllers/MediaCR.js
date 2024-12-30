import { MediaItems } from "../models/PostSM.js";


// Get all Post
export const getItems = async (req, res) => {
    try{
        const posts = await MediaItems.find();
        return res.json(posts)
    } catch (error) {
        return res.status(500).json({ error : 'post doesn get check your code once'});
    }
};


// Create Post 
export const createItems = async (req, res) => {
    try {
        const { title, content } = req.body;
        const file = req.file ? req.file.filename : undefined;

        if (!title || !content) {
            return res.status(400),json({ error : 'Title and Content are Required Fields'});
        }

        const post = new MediaItems({ title, content, file});
        await post.save();
        return res.status(201).json(post);
    } catch (error) {
        console.error('Error creating Post:',error);
        return res.status(500).json({ error : 'Internal server error'});
    }
};

// Like a Post
export const likeItems = async (req,res) => {
    try {
        const postId = req.params.postId; //Req.params is an object that contains parameter values parsed from a URL path such as "/users/:id" or "/products/:productId" 
        const post = await MediaItems.findById(postId);

        if(!post) {
            return res.status(404).json({ error: 'Post Not Found'});
        }

        post.likes +=1;
        await post.save();

        return res.json(post);
    } catch (error) {
        console.error('Error Liking Post:', error);
        return res.status(500).json({ error: 'Internal Server error'})
    }
};

// Add a Comment to a post
export const itemComments = async (req,res) => {
    try {
        const postId = req.params.postId;
        const { text } = req.body;
        const post = await MediaItems.findById(postId)

        if(!post) {
            return res.status(404).json({ error : 'Post not Found '});
        }

        post.comment.push({ text });
        await post.save();

        return res.json(post);
    } catch (error) {
        console.error('Error adding comment:', error);
        return res.status(500).json({ error : 'Internal server error'});
    }
};

//Delete a Post
export const deletePost = async (req,res) => {
    const {postId} = req.params;
    try {
        const post = await MediaItems.findByIdAndDelete(postId)

        if(!post){
            return res.status(404).json({ message:'post has missing'})
        }
        return res.status(200).json({
            message:'Delete Successfully'
        })
    } catch (error) {
        return res.status(400).json({
            err: error.message
        })
    }
}
 