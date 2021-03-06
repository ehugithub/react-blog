import React from 'react';
import { useParams, Link } from 'react-router-dom';
import type { post } from './App';
import { useNavigate } from 'react-router-dom';

interface PostPageProps {
    handleDelete: (id: number) => void,
    posts: post[];
}


const PostPage = ({ handleDelete, posts }: PostPageProps) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const thepost = posts.find((post: post) => (post.id).toString() === id);

    return (
        <div className="border-8 w-full pl-2 overflow-y-auto">
            {
                thepost &&
                <div>
                    <div className="font-bold text-3xl">{thepost.title}</div>
                    <div className="mt-2">{thepost.date}</div>
                    <div className="mb-6">labels: <div className="flex flex-row flex-wrap">{thepost.labels.map(label => <div className="rounded-full bg-sky-300 mx-2 mb-1 p-1 text-center">{label.name}</div>)}</div></div>
                    <div className="text-center">{thepost.body}</div>
                    <button onClick={(e) => navigate(`/edit/${thepost.id}`)} className="py-3 px-7 mt-5 mb-2 rounded text-m bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700">Edit post</button>
                    <button className="py-3 px-5 rounded ml-1 text-m bg-red-500 hover:bg-red-600 active:bg-red-700" onClick={() => handleDelete(thepost.id)}>Delete post</button>
                </div>
            }
            {
                !thepost &&
                <div>
                    <div>Hmm, post was not found.</div>
                    <Link to="/" className="underline">Go home</Link>
                </div>
            }
        </div>
    )
};

export default PostPage;