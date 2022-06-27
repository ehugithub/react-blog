import React from 'react';
import type { label } from './App';

interface SidebarLabelProps {
    label: label,
    selectedLabels: label[],
    setSelectedLabels: React.Dispatch<React.SetStateAction<label[]>>
}

const SidebarLabel = ({ label, selectedLabels, setSelectedLabels }:SidebarLabelProps ) => {
    return (
        <>
            { selectedLabels.includes(label) ?
                <div onClick={(e) => setSelectedLabels(selectedLabels.filter(nl => nl.id !== label.id))} className="break-words border-2 border-sky-800 rounded my-2 mx-1 bg-emerald-300 cursor-pointer">{`${label.name} (${label.quantity})`}</div>
                :
                <div onClick={(e) => setSelectedLabels([...selectedLabels, label])} className="break-words border-2 border-sky-800 rounded my-2 mx-1 hover:bg-emerald-200 cursor-pointer">{`${label.name} (${label.quantity})`}</div>
            }        
        </>
   )
};

export default SidebarLabel;