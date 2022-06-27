import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { post } from './App';
import type { label } from './App';

interface EditPostProps {
    posts: post[],
    handleEdit: (id: number) => Promise<void>,
    editTitle: string,
    setEditTitle: React.Dispatch<React.SetStateAction<string>>,
    editBody: string,
    setEditBody: React.Dispatch<React.SetStateAction<string>>,
    allLabels: label[]
};

const EditPost = ({ posts, handleEdit, editTitle, setEditTitle, editBody, setEditBody, allLabels }: EditPostProps) => {
    const { id } = useParams();
    const thepost = posts.find((post: post) => (post.id).toString() === id);

    useEffect(() => {
        if(thepost) {
            setEditTitle(thepost.title);
            setEditBody(thepost.body);
        }
    }, [thepost, setEditTitle, setEditBody]);

    return (
        <>
            {
                thepost &&
                <div className="w-full px-8">
                    <div className="text-3xl mt-5">Edit post</div>
                    <div className="text-xl pt-6">Labels:</div>
                    <button>Create new label</button>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="pt-6 text-xl">Post title</div>
                        <input 
                            type="text"
                            required
                            placeholder="Title"
                            value={editTitle}
                            className="w-full rounded border-2 border-slate-500 pl-1"
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <div className="pt-6 text-xl">Post body</div>
                        <textarea
                            className="w-full rounded border-2 border-slate-500 h-80 pl-1"
                            value={editBody}
                            placeholder="body goes here"
                            required
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type="submit" className="rounded-full bg-indigo-600 p-1 w-full mt-2 hover:bg-indigo-700 active:bg-indigo-800" onClick={() => thepost ? handleEdit(thepost.id) : Error('error!')}>Save Changes</button>
                    </form>
                </div>
            }
            {
                !thepost &&
                <div className="w-full">
                    <div>Hmm, post was not found.</div>
                    <Link to="/" className="underline">Go home</Link>
                </div>
            }
        </>

    )
};

export default EditPost;