import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const CreatePost = () => {
    const [post, setPost] = useState({
        title:'',
        content: '',
        file: null,
    });

    const handleChange = (e) => {
        const { name, value} = e.target;
        setPost({ ...post,[name]: value});
    };

    const handleFileChange = (e) => {
        setPost({ ...post, file: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title',post.title);
        formData.append('content',post.content);
        formData.append('file',post.file);
        try {
           const response = await axios.post('http://localhost:1000/api/posts', formData)
           console.log(response.data);
           setPost({
                title:'',
                content: '',
                file: null,
            })
        } catch (error) {
            console.error('error creating Post;',error)
        }
    };

  return (
    <div>
        <div className='border-2 max-w-2xl mx-auto my-10'>
            <h2 className='py-6  font-bold text-xl text-center'>Create A Post</h2>
            <div className='p-6'>
                <form onSubmit={handleSubmit} className='space-y-7'>
                    <div>
                        <label htmlFor="title" className='block text-base font-medium text-gray-700 mb-1'>Title</label>
                        <input type="text" name="title" id="title" placeholder='Title' value={post.title} onChange={handleChange} className='mt-1 w-full border border-gray-400 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-pink-500 sm:text-sm'/>
                    </div>
                    <div>
                        <label htmlFor="content" className='block text-base font-medium text-gray-700 mb-1'>Content</label>
                        <textarea name="content" id="content" row={4} placeholder='content' value={post.content} onChange={handleChange} className='mt-1 w-full border border-gray-400 rounded-md shadow-sm px-3 py-2  focus:outline-none focus:ring-2 focus:ring-pink-500 sm:text-sm'/>
                    </div>
                    <div>
                        <label htmlFor="File" className='block text-base font-medium text-gray-700 mb-1'>Upload Your File</label>
                        <input type="file" name="file" id="file" onChange={handleFileChange}  className='border-2 px-2 py-4'/>
                    </div>
                    <div>
                        <button type='submit' className='px-4 py-2 font-bold rounded-lg w-full border-2 border-pink-600 hover:bg-pink-600 duration-200 hover:text-white'>Post</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default CreatePost