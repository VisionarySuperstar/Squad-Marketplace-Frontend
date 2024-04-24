import React from 'react';

import { Label, RangeSlider } from "flowbite-react";

interface IProps {
    setScale: React.Dispatch<React.SetStateAction<number>>,
    scale: number
}

const ViewProgress = ({setScale, scale}: IProps) => {

    return (
        <div className="flex gap-3">
            <div className="text-md ">VIEW</div>
            <RangeSlider value={scale} onChange={(e) => {setScale(Number(e.target.value)); console.log(Math.floor((100 - scale) / 10 + 1))}} className='w-full' sizing="lg" />
        </div>
    );
}

export default ViewProgress;