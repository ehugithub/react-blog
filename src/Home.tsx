import React from 'react';
import type { post, label } from './App';
import Posts from './Posts';
import Sidebar from './Sidebar';


interface HomeProps {
    posts: post[],
    allLabels: label[],
    newLabel: string,
    setNewLabel: React.Dispatch<React.SetStateAction<string>>,
    handleSubmitForm: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
    newLabelState: boolean,
    setNewLabelState: React.Dispatch<React.SetStateAction<boolean>>,
    selectedLabels: label[],
    setSelectedLabels: React.Dispatch<React.SetStateAction<label[]>>
};

const Home = ({ posts, allLabels, newLabel, setNewLabel, handleSubmitForm, newLabelState, setNewLabelState, selectedLabels, setSelectedLabels }: HomeProps) => {
    return (
        <div className="flex border-8 border-indigo-400 w-full overflow-y-auto relative h-full">
            <div className="w-3/4">
                {posts.length ? <Posts posts={posts} /> : <div className="mt-9">No post matches the search criteria</div>}
            </div>
            <div>
                <Sidebar allLabels={allLabels} newLabel={newLabel} setNewLabel={setNewLabel} handleSubmitForm={handleSubmitForm} newLabelState={newLabelState} setNewLabelState={setNewLabelState} selectedLabels={selectedLabels} setSelectedLabels={setSelectedLabels} />
            </div>
        </div>
    )
};

export default Home;