import React from 'react';
import type { label } from './App';
import { FiDelete } from 'react-icons/fi';

interface SidebarLabelProps {
    label: label,
    selectedLabels: label[],
    setSelectedLabels: React.Dispatch<React.SetStateAction<label[]>>,
    handleDeleteLabel: (labele: label) => Promise<void>
}

const SidebarLabel = ({ label, selectedLabels, setSelectedLabels, handleDeleteLabel }:SidebarLabelProps ) => {
    return (
        <>
            { selectedLabels.includes(label) ?
                <div onClick={(e) => setSelectedLabels(selectedLabels.filter(nl => nl.id !== label.id))} className="flex flex-row items-center border-2 border-sky-800 rounded my-2 mx-1 bg-emerald-300 cursor-pointer w-full">
                    <div className="break-words w-5/6">{`${label.name} (${label.quantity})`}</div>
                    <div className="text-2xl cursor-pointer w-1/6" onClick={(e) => {handleDeleteLabel(label); e.stopPropagation();}}> <FiDelete /> </div> 
                </div>
                :
                <div onClick={(e) => setSelectedLabels([...selectedLabels, label])} className="flex flex-row items-center border-2 border-sky-800 rounded my-2 mx-1 hover:bg-emerald-200 cursor-pointer w-full">
                    <div className="break-words w-5/6">{`${label.name} (${label.quantity})`}</div>
                    <div className="text-2xl cursor-pointer w-1/6" onClick={(e) => {handleDeleteLabel(label); e.stopPropagation();}}> <FiDelete /> </div>
                </div>
            }        
        </>
   )
};

export default SidebarLabel;