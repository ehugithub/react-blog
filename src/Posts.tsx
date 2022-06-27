import React from 'react';
import type { post } from './App'
import Post from './Post';

interface PostsProps {
    posts: post[]
};

const Posts = ({ posts }: PostsProps) => {
    return (
        <div className="border-8 border-red-800 overflow-y-auto w-full h-full">
            {posts.map((post) => <Post post={post} key={post.id}/>)}
        </div>
    )
};

export default Posts;