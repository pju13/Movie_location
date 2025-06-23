import React from "react";
import { MovieCardProps } from "../types/types";

import { useContext } from "react";
import { ThemeContext } from "./context/FilmProvider";
import { Link } from "react-router-dom";

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

export const FilmItem: React.FC<MovieCardProps> = ({ film }) => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useContext must be used within a ThemeContext.Provider");
    }
    const { setterRent, user } = context;

    const url = `https://image.tmdb.org/t/p/w200/${film.poster_path}`;
    const date = formaterDate(film.release_date);
    const pourcentage = calculerPourcentage(film.vote_average);

    const urlDetail = `/film/${film.id}`;

    return (
        <div className="card w-50 bg-white shadow-xl hover:shadow-lg">
            <figure>
                <Link to={urlDetail}>
                    <img
                    className="transition delay-100 duration-300 ease-in-out hover:scale-125"
                    src={url}
                    alt={film.original_title} />                
                </Link>                    
            </figure>
            <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="text-amber-600">{film.overview}</p>
                <div className="modal-action">
                    <form method="dialog">
                    <button className="btn">Close</button>
                    </form>
                </div>
            </div>
            </dialog> 
            <div className="card-body relative">
                <div className="radial-progress bg-gray-800 text-primary-content border-gray-800 border-4 w-10 h-10 absolute -top-3 left-1"
                    style={{"--value":pourcentage, "--size": "12rem", "--thickness": "2px"}} aria-valuenow={pourcentage} role="progressbar">
                    {pourcentage}%
                </div>  
                {user ?       
                <button className="btn btn-warning absolute -top-3 right-1 cursor-pointer"
                    onClick={() => setterRent(film)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                    Louer
                </button> : null}                     
                
                <h2 className="card-title mt-3">{film.original_title}</h2>
                <p>Date de sortie : {date}</p>            
            </div>
        </div>
    )
}
