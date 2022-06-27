import React from 'react';

interface NewPostProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    title: string,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    body: string,
    setBody: React.Dispatch<React.SetStateAction<string>>
};

const NewPost = ({ handleSubmit, title, setTitle, body, setBody }: NewPostProps) => {
    return (
        <div className="w-full px-8">
            <div className="text-3xl mt-5">Create a new post</div>
            <form onSubmit={handleSubmit}>
                <div className="pt-6 text-xl">Post title</div>
                <input 
                    type="text"
                    required
                    placeholder="Title"
                    value={title}
                    className="w-full rounded border-2 border-slate-500 pl-1"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="pt-6 text-xl">Post body</div>
                <textarea
                    className="w-full rounded border-2 border-slate-500 h-80 pl-1"
                    value={body}
                    placeholder="body goes here"
                    required
                    onChange={(e) => setBody(e.target.value)}
                />
                <button type="submit" className="rounded-full bg-sky-500 p-1 w-full mt-2 hover:bg-sky-700 active:bg-sky-900">Create</button>
            </form>
        </div>
    )
};

export default NewPost;