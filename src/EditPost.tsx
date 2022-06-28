import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { post } from './App';
import type { label } from './App';
import { useState } from 'react';

interface EditPostProps {
    posts: post[],
    handleSubmitForm: (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLDivElement, MouseEvent>) => Promise<void>,
    handleEdit: (id: number, labels: label[]) => Promise<void>,
    editTitle: string,
    setEditTitle: React.Dispatch<React.SetStateAction<string>>,
    editBody: string,
    setEditBody: React.Dispatch<React.SetStateAction<string>>,
    allLabels: label[],
    selectedLabelsEp: label[],
    setSelectedLabelsEp: React.Dispatch<React.SetStateAction<label[]>>,
    newLabel: string,
    setNewLabel: React.Dispatch<React.SetStateAction<string>>
};

const EditPost = ({ posts, handleSubmitForm, handleEdit, editTitle, setEditTitle, editBody, setEditBody, allLabels, selectedLabelsEp, setSelectedLabelsEp, newLabel, setNewLabel }: EditPostProps) => {
    const { id } = useParams();
    const thepost = posts.find((post: post) => (post.id).toString() === id);
    const [b, setB] = useState(false);

    useEffect(() => {
        if(thepost) {
            setSelectedLabelsEp(thepost.labels);
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
                        <div className="pt-6 text-m">Selected labels:</div>
                        { selectedLabelsEp.length
                            ?
                            <div className="flex flex-row flex-wrap border-4 border-emerald-500 my-2">
                                {selectedLabelsEp.map(label => <div onClick={(e) => setSelectedLabelsEp(selectedLabelsEp.filter(labele => labele.id !== label.id))} className="bg-orange-200 mx-3 my-1 px-2 rounded-full cursor-pointer hover:bg-orange-300">{label.name}</div>)}
                            </div>
                            :
                            <></>
                        } 

                        <div className="text-m">All labels:</div>

                        { allLabels.filter(labele => !(selectedLabelsEp.some(l => l.id === labele.id))).length
                            ?
                            <div className="flex flex-row flex-wrap border-4 border-indigo-200">
                                {allLabels.filter(labele => !(selectedLabelsEp.some(l => l.id === labele.id)))
                                .map(label => <div onClick={(e) => setSelectedLabelsEp([...selectedLabelsEp, label])} className="bg-orange-200 mx-3 my-1 px-2 rounded-full cursor-pointer hover:bg-orange-300">{label.name}</div>)}
                            </div>
                            :
                            <></>
                        }
                        { b
                            ?
                            <div className="border flex flex-row py-1 mt-2">
                                <input placeholder="New label name:" type="text" className="w-full pl-1" value={newLabel} onChange={(e) => setNewLabel(e.target.value)}/>
                                <div onClick={(e) => setB(false)} className="bg-red-500 cursor-pointer rounded-full hover:bg-red-600 active:bg-red-700 px-2 mx-2">Cancel</div>
                                <div onClick={(e) => {setB(false); handleSubmitForm(e);}} className="bg-green-500 cursor-pointer rounded-full hover:bg-green-600 active:bg-green-700 px-2 mx-2">Submit</div>
                            </div>
                            :
                            <div onClick={(e) => setB(true)} className="p-1 mt-2 cursor-pointer text-center bg-lime-500 rounded-full hover:bg-lime-600 active:bg-lime-700">Create new label</div>
                        }
                        <div className="pt-6 text-xl">Post body</div>
                        <textarea
                            className="w-full rounded border-2 border-slate-500 h-80 pl-1"
                            value={editBody}
                            placeholder="body goes here"
                            required
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type="submit" className="rounded-full bg-indigo-600 p-1 w-full mt-2 hover:bg-indigo-700 active:bg-indigo-800" onClick={() => thepost ? handleEdit(thepost.id, thepost.labels) : Error('error!')}>Save Changes</button>
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