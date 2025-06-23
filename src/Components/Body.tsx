import React from 'react';
import { Panier } from "./Panier"
import { BodyProps } from '../types/types';

export const Body: React.FC<BodyProps> = ({ children }) => {
    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <div className="flex flex-col items-center justify-center bg-[#fffce6] text-gray-900">
                    {children}
                </div>
            </div>
            <div className="drawer-side z-50">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu text-white bg-gray-800 min-h-full w-80 p-4">
                    <li><b>Panier</b></li>
                    <Panier />
                </ul>
            </div>        
        </div>
    )
}
