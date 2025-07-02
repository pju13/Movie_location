import React from 'react';
import { BodyProps } from '../types/types';

export const Body: React.FC<BodyProps> = ({ children }) => {
    return (
        <div className="flex flex-col items-center justify-center bg-[#fffce6] text-gray-900">
            {children}
        </div>
    )
}
