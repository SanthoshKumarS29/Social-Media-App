import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

const Home = () => {
    const [commentInput, setCommentInput] = useState('');
    const [posts, setPosts] = useState([]); // Initialize with empty array
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('http://localhost:1000/api/posts');
                setPosts(response.data); // Make sure this is an array
                console.log('Posts data:', response.data); // Debug log
            } catch (error) {
                console.error('Error fetching Post', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPost();
    },[]);

    // Handle like
    const handleLike = async (postId) => {
        try {
            const response = await axios.post(`http://localhost:1000/api/posts/like/${postId}`);
            const updatedPosts = posts.map((post) => post._id === postId ? response.data : post);
            setPosts(updatedPosts);
        } catch (error) {
            console.error('Error Liking Post', error);
        }
    };

    // handle Adding a comment
    const handleAddComment = async (postId, commenttext) => {
        try {
            const response = await axios.post(`http://localhost:1000/api/posts/comment/${postId}`, {text: commenttext});
            const updatePost = posts.map((post) => post._id === postId ? response.data : post);
            setPosts(updatePost);
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    // Handle Delete a comment
    const deletePost = async (postId) => {
        try {
            const response = await axios.delete(`http://localhost:1000/api/posts/delete/${postId}`);
            console.log('Post deleted:', response.data);
            alert('Post deleted successfully!');
        } catch (error) {
            console.error('Error deleting post:', error);
            alert(`Failed to delete the post. Error: ${error.response?.data?.message || error.message}`);
        }
    };
    

    if (isLoading) {
        return <div>Loading posts...</div>;
    }

    return (
        <div className='p-6'>
            <h2 className='text-center font-bold text-3xl pb-10'>Recent Post</h2>
            <div className='max-w-md mx-auto flex flex-col gap-5'>
                {posts && posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post._id} className='border-2'>
                            <div className='flex justify-between py-6 px-3 items-center'>
                                <span className='flex items-center gap-1'><IoPersonCircleOutline size={35}/><p className='text-sm font-bold'>{post.title}</p></span>
                                <button onClick={() => deletePost(post._id)}><MdDeleteOutline size={20}/></button>
                            </div>
                            <div className='py-6 px-3 text-sm'>
                                <p>{post.content}</p>
                            </div>

                            {/* Display image or video based on File type */}
                            {post.file && (
                                <div>
                                    {post.file.includes(".mp4") ? (
                                        <video controls>
                                            <source src={`http://localhost:1000/uploads/${post.file}`} type='video/mp4'/>
                                            Your browser does not support the video tag
                                        </video>
                                    ) : (
                                        <img src={`http://localhost:1000/uploads/${post.file}`} alt="Post Media" className='w-full border-2'/>
                                    )}
                                </div>
                            )}

                            <p>Likes: {post.likes || 0}</p>
                            <button onClick={() => handleLike(post._id)}>Like</button>

                            <p>Comments: {post.comment?.length || 0}</p>
                            <ul>
                                {post.comment?.map((comments, index) => (
                                    <li key={index}>{comments.text}</li>
                                ))}
                            </ul>

                            <input 
                                type="text" 
                                placeholder='Add a comment' 
                                onChange={(e) => setCommentInput(e.target.value)} 
                            />
                            <button onClick={() => handleAddComment(post._id, commentInput)}>
                                Add Comment
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No posts available</p>
                )}
            </div>
            <div>
                
            </div>

        </div>
    );
};

export default Home;