import React, { useEffect } from "react";
import { FilmCard } from "./FilmCard";
import { useFetchFilms } from "./hooks/useFetchFilms";
import { Film } from "../types/types";
import { FilmRow } from "./FilmRow";
import { useStore } from "./context/FilmProvider";

export const FilmList: React.FC = () => {
    const { filmsApi, isError, isLoading } = useFetchFilms();

    const filmsEnAffiches = useStore((state) => state.films);
    const addFilms = useStore((state) => state.addFilms);
    const searchTitle = useStore((state) => state.searchTitle);
    const affichageFormatListe = useStore((state) => state.affichageFormatListe);

    useEffect(() => {
        addFilms(filmsApi);
    }, [filmsApi, addFilms]);

    if (isLoading) return <div>Chargement...</div>;
    if (isError) return <div>Erreur lors du chargement des films !!</div>;

    const filmsAAfficher = filmsEnAffiches?.map((film: Film) => {
        //if (!isRent(film.id)) {
            if (searchTitle !== '' && film.original_title.toLowerCase().indexOf(searchTitle.toLowerCase()) !== -1) {
                return affichageFormatListe ? <FilmRow key={film.id} film={film} />
                : <FilmCard key={film.id} film={film} />
            } 
            if (searchTitle === '') {
                return affichageFormatListe ? <FilmRow key={film.id} film={film} />
                : <FilmCard key={film.id} film={film} />
            }
        //}
    }); 

    const classNameItem = !affichageFormatListe ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-3" : "";

    return (
        <>
            <div className="mt-5 mb-3">
                <h1 className="font-bold italic border-t-4 border-indigo-500">Toujours à l'affiche</h1>
            </div>
            <div className={`${classNameItem}`}>
                {!affichageFormatListe ? 
                    filmsAAfficher :
                    <ul className="list bg-base-100 rounded-box shadow-md">{filmsAAfficher}</ul>
                }          
            </div>
        </>
    );
}
