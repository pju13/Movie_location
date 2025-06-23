import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import { Body } from "../Components/Body";
import { ThemeContext } from "../Components/context/FilmProvider";
import { Film } from "../types/types";

export const DetailsFilm: React.FC = () => {
    const { id } = useParams();
    const [filmDetails, setFilmDetails] = useState<Film>();
    const [displayBtnLouer, setDisplayBtnLouer] = useState(true);
    const { user, films, setterRent, rentFilms } = useContext(ThemeContext);

    const url = `https://image.tmdb.org/t/p/w200/${filmDetails?.poster_path}`;

    useEffect(() => {
        if (id) {
            setFilmDetails(films?.find((film: Film) => film.id == parseInt(id)));
        }        
        if (id && rentFilms) {
            setDisplayBtnLouer(!(rentFilms?.find((film: Film) => film.id == parseInt(id))));
            console.log(rentFilms);
        }
    }, [id, films, rentFilms, setterRent]);

    return (
        <Body>
            <Navbar />

            <div className="flex flex-col items-center sm:w-[800px] m-auto mt-3">
                <div className="breadcrumbs text-sm">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li>Détails du film</li>
                    </ul>
                </div>

                {filmDetails ? 
                    <div className="flex flex-col items-center mt-5">
                        <h1 className="font-bold mb-3">{filmDetails.original_title}</h1>
                        <div className="flex sm:flex-row max-sm:flex-col items-center">
                            <figure>
                                    <img
                                    className="rounded-lg"
                                    src={url}
                                    alt={filmDetails.original_title} />                               
                            </figure>     
                            <div className="ml-2">
                                <p>{filmDetails.release_date}, <span className="font-bold">{filmDetails.adult ? "Pour adulte" : "Tout public"}</span></p>
                                <div className="flex flex-col p-2 border-1 rounded-lg">
                                    <span className="font-extralight">Public</span>
                                    <div className="rating">
                                        <div className="mask mask-star bg-orange-400" aria-label="1 star"></div>
                                        <div className="mask mask-star bg-orange-400" aria-label="2 star"></div>
                                        <div className="mask mask-star bg-orange-400" aria-label="3 star" aria-current="true"></div>
                                        <div className="mask mask-star bg-orange-400" aria-label="4 star"></div>
                                        <div className="mask mask-star bg-orange-400" aria-label="5 star"></div>
                                    </div>
                                </div>
                                {user && displayBtnLouer === true ?
                                <button className="btn btn-warning cursor-pointer mt-2"
                                    onClick={() => setterRent(filmDetails)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                                    Louer
                                </button> : null}
                            </div>
                        </div>    
                        <div className="flex flex-col mt-3">
                            <p className="font-bold border-amber-500 border-l-4 pl-2">Synopsis</p>
                            <p className="mt-2 mb-15">{filmDetails.overview}</p>
                        </div>
                    </div> 
                : null}
            </div>

            <Footer />
        </Body>
    )
}
