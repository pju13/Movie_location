import React from "react";
import { MovieCardProps } from "../types/types";
import { Link } from "react-router-dom";
import { useStore } from "./context/FilmProvider";

function formaterDate(dateStr: string) {
    // Diviser la chaîne de date en composants
    const [annee, mois, jour] = dateStr.split('-');

    // Réorganiser les composants dans le nouveau format
    const nouvelleDate = `${jour}/${mois}/${annee}`;

    return nouvelleDate;
} 

export const FilmRow : React.FC<MovieCardProps> = ({ film }) => {
    const user = useStore((state) => state.user);
    const isRent = useStore((state) => state.isRent);
    const updateFilmsRent = useStore((state) => state.updateFilmsRent);

    const url = `https://image.tmdb.org/t/p/w200/${film.poster_path}`;
    const date = formaterDate(film.release_date);

    const synopsis = film.overview.substring(0, 150) + '...';

    const urlDetail = `/film/${film.id}`;

    return (
        
            <li className="list-row group hover:bg-[#ffe752] duration-400 ease-in-out mb-1">
                <div><img className="group-hover:scale-150 group-hover:rotate-y-25 group-hover:rotate-z-3 duration-400 ease-in-out size-15 rounded-box" src={url}/></div>
                <div className="ml-3">
                    <div>{film.original_title}</div>
                    <div className="text-xs uppercase font-semibold opacity-60">Sortie le {date}, {film.adult ? "Pour adulte" : "Tout public"}</div>
                </div>
                <p className="list-col-wrap text-xs">
                    {synopsis}
                </p>
                <div className="flex md:flex-row max-md:flex-col">
                    <Link to={urlDetail} className="btn btn-primary p-0.5">En savoir +</Link>
                    {user && !isRent(film.id) ?       
                        <button className="btn cursor-pointer p-0.5 ml-2 max-md:mt-1"
                            onClick={() => updateFilmsRent(film)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                            Louer
                        </button> : null} 
                </div>
            </li>
    );
}
