import React from 'react';
import type { label } from './App';

interface LabelProps {
    allLabels: label[];
};

const Label = ({ allLabels }: LabelProps) => {
    return (
        <div>Label</div>
    )
}

export default Label;