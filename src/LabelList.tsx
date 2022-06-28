import React from 'react';
import type { label } from './App';
import SidebarLabel from './SidebarLabel';
import { useState } from 'react';
import { FcCancel, FcCheckmark } from 'react-icons/fc';
import { appendFileSync } from 'fs';

interface LabelListProps {
    allLabels: label[]
    newLabel: string,
    setNewLabel: React.Dispatch<React.SetStateAction<string>>
    handleSubmitForm: (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLDivElement, MouseEvent>) => Promise<void>
    newLabelState: boolean,
    setNewLabelState: React.Dispatch<React.SetStateAction<boolean>>
    selectedLabels: label[],
    setSelectedLabels: React.Dispatch<React.SetStateAction<label[]>>,
    handleDeleteLabel: (labele: label) => Promise<void>
};

const LabelList = ({ allLabels, newLabel, setNewLabel, handleSubmitForm, newLabelState, setNewLabelState, selectedLabels, setSelectedLabels, handleDeleteLabel }: LabelListProps) => {
    return (
        <div>
            <div>
                {
                    allLabels.length 
                    ?
                    <>
                        { selectedLabels.length
                            ?
                            <>
                                {
                                    <button className="rounded bg-rose-400 px-6 mx-1 my-1" onClick={(e) => setSelectedLabels([])}>Clear selection</button>
                                }
                            </>
                            :
                            <></>
                        }
                        {
                            allLabels.map(label => <SidebarLabel label={label} selectedLabels={selectedLabels} setSelectedLabels={setSelectedLabels} handleDeleteLabel={handleDeleteLabel} />)
                            
                        }
                    </>
                    : <div className="">You have no labels!</div>
                }
            </div>
            { newLabelState ?
                <form className="flex flex-row" onSubmit={(e) => {setNewLabelState(false); handleSubmitForm(e);}}> 
                    <FcCancel className="text-2xl cursor-pointer" onClick={(e) => setNewLabelState(false)} />
                    <input required className="w-full mx-1 focus:outline-none focus:ring focus: border-blue-700" type="text" placeholder="New label name..." value={newLabel} onChange={(e) => setNewLabel(e.target.value)}/>
                    <button type="submit" className="text-2xl" ><FcCheckmark /></button>
                </form> :
                <button onClick={(e) => setNewLabelState(true)}className="rounded bg-amber-400 hover:bg-amber-500 active:bg-amber-600 px-2 ml-5">Create Label</button>
            }
        </div>
    );
};

export default LabelList;