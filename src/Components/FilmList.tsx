import React, { useContext, useEffect } from "react";
import { FilmItemNew } from "./FilmItemNew";
import { ThemeContext } from "./context/FilmProvider";
import { FetchFilms } from "./api/FetchFilms";
import { Film } from "../types/types";
import { FilmRow } from "./FilmRow";

export const FilmList: React.FC = () => {
    const { films, isError, isLoading } = FetchFilms();

    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useContext must be used within a ThemeContext.Provider");
    }
    const { search, isLocate, setFilms, affichageListe } = context;

    useEffect(() => {
        setFilms(films);
    }, [films, setFilms]);

    if (isLoading) return <div>Chargement...</div>;
    if (isError) return <div>Erreur lors du chargement des films !!</div>;

    const filmsAAfficher = films?.map((film: Film) => {
        if (!isLocate(film.id)) {
            if (search !== '' && film.original_title.toLowerCase().indexOf(search.toLowerCase()) !== -1) {
                return affichageListe ? <FilmRow key={film.id} film={film} />
                : <FilmItemNew key={film.id} film={film} />
            } 
            if (search === '') {
                return affichageListe ? <FilmRow key={film.id} film={film} />
                : <FilmItemNew key={film.id} film={film} />
            }
        }
    }); 

    const classNameItem = !affichageListe ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-3" : "";

    return (
        <>
            <div className="mt-5 mb-3">
                <h1 className="font-bold italic border-t-4 border-base-100">Toujours à l'affiche</h1>
            </div>
            <div className={`${classNameItem}`}>
                {!affichageListe ? 
                    filmsAAfficher :
                    <ul className="list bg-base-100 rounded-box shadow-md">{filmsAAfficher}</ul>
                }          
            </div>
        </>
    );
}
