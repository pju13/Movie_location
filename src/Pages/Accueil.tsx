import React from 'react';

import { FilmList } from '../Components/FilmList'
import { Footer } from '../Components/Footer'
import { Body } from '../Components/Body'
import { Navbar } from '../Components/Navbar';

export const Accueil: React.FC = () => {
    return (
        <Body>
            <Navbar />
            <FilmList />
            <Footer />
        </Body>
    );

}
