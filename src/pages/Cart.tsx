import React from "react";

import { Footer } from '../Components/Footer'
import { Body } from '../Components/Body'
import { Navbar } from '../Components/Navbar';
import { Panier } from "../Components/Panier";

export const Cart: React.FC = () => {
    return (
        <Body>
            <Navbar />
            <Panier />
            <Footer />
        </Body>
    )
}
