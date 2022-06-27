import React from 'react';
import type { post } from './App';
import { Link } from 'react-router-dom';

interface PostProps {
    post: post,
    key: number
};

const Post = ({ post, key }: PostProps) => {
    return (
        <div className="border-4 border-slate-400 w-full p-1.5">
            <Link to={`post/${post.id}`}>
                <div className="font-bold text-xl">{post.title}</div>
                <div>{post.date}</div>
            </Link>
            <div>Labels:</div>
            <div className="pt-3">{post.body.length <= 30 ? post.body : `${post.body.slice(0, 30)}...`}</div>
        </div>
    )
};

export default Post;