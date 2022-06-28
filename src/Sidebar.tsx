import React from 'react';
import LabelList from './LabelList';
import type { label } from './App';

interface SidebarProps {
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

const SideBar = ({ allLabels, newLabel, setNewLabel, handleSubmitForm, newLabelState, setNewLabelState, selectedLabels, setSelectedLabels, handleDeleteLabel }: SidebarProps) => {
    return (
        <div className="w-1/4 absolute top-0 right-0 h-full border-4 border-slate-500 overflow-y-auto">
            <div className="m-auto">Sidebar</div>
            <div>
                <LabelList allLabels={allLabels} newLabel={newLabel} setNewLabel={setNewLabel} handleSubmitForm={handleSubmitForm} newLabelState={newLabelState} setNewLabelState={setNewLabelState} selectedLabels={selectedLabels} setSelectedLabels={setSelectedLabels} handleDeleteLabel={handleDeleteLabel} />
            </div>
        </div>
    )

};

export default SideBar;