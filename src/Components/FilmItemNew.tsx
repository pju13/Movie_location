import React from "react";
import { MovieCardProps } from "../types/types";

import { useContext } from "react";
import { ThemeContext } from "./context/FilmProvider";
import { Link } from "react-router-dom";

import './FilmItemNew.css';

function formaterDate(dateStr: string) {
    // Diviser la chaîne de date en composants
    const [annee, mois, jour] = dateStr.split('-');

    // Réorganiser les composants dans le nouveau format
    const nouvelleDate = `${jour}/${mois}/${annee}`;

    return nouvelleDate;
} 

function calculerPourcentage(voteAverage: number) {
    const pourcentage = Number.parseFloat(voteAverage.toString()).toFixed(1); 
    return parseFloat(pourcentage) * 10;
}

export const FilmItemNew: React.FC<MovieCardProps> = ({ film }) => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useContext must be used within a ThemeContext.Provider");
    }
    const { setterRent, user } = context;

    const url = `https://image.tmdb.org/t/p/w200/${film.poster_path}`;
    const date = formaterDate(film.release_date);
    const pourcentage = calculerPourcentage(film.vote_average);

    const cPour = pourcentage <= 50 ? 'bg-red-600' : pourcentage < 80 ? 'bg-yellow-600' : 'bg-green-600';
    const bPour = pourcentage <= 50 ? 'border-red-600' : pourcentage < 80 ? 'border-yellow-600' : 'border-green-600';

    const urlDetail = `/film/${film.id}`;

    return (
        <div className="game">
            <div className="front">
                <Link to={urlDetail}><img className="thumbnail" src={url} alt={film.original_title} /></Link>

                <div className={`radial-progress ${cPour} text-primary-content ${bPour} border-4 w-12 h-12 absolute -top-3 left-0`}
                    style={{"--value":pourcentage, "--size": "10rem", "--thickness": "2px"}} aria-valuenow={pourcentage} role="progressbar">
                    {pourcentage}%
                </div>

                <h3 className="name">{film.original_title}</h3>
                <div className="stats">
                    <p className="viewers">Sortie le {date}</p>
                    <p className="viewers">Français</p>
                </div>
            </div>        
            <div className="back">
                <div className="streaming-info">
                    <p className="game-stat">559k<span>Watching</span></p>
                    <p className="game-stat">25.8k<span>streams</span></p>
                </div>            
                <div>
                    <Link to={urlDetail} className="btn btn-primary p-0.5">En savoir +</Link>
                    {user ?       
                    <button className="btn cursor-pointer p-0.5 ml-2"
                        onClick={() => setterRent(film)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                        Louer
                    </button> : null}   
                </div>              
            </div>
            <div className="background"></div>        
        </div>
    )
}
