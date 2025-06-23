import React, { useState } from "react";
import { FilmContextProps, FilmProviderProps, Film, User } from "../../types/types";

export const ThemeContext = React.createContext<FilmContextProps | undefined>(undefined);

export const FilmProvider: React.FC<FilmProviderProps> = ({ children }) => {
    const [search, setSearch] = useState('');
    const [affichageListe, setAffichageListe] = useState(false);
    const [films, setFilms] = useState<Film[]>([]);
    const [rentFilms, setRentFilms] = useState<Film[]>([]);
    const [user, setUser] = useState<User>();

    const handleRent = (film: Film) => {
        const filmNew = {
            id: film.id,
            release_date: film.release_date,
            original_title: film.original_title,
            poster_path: film.poster_path,
            vote_average: film.vote_average,
            overview: film.overview,
            adult: film.adult
        };

        setRentFilms((prevFilms) => [...prevFilms, filmNew]);
    }

    const handleSupprimerRent = (id: number) => {
        const FilmsALouerCopy = rentFilms.filter(loc => loc.id !== id);

        setRentFilms(FilmsALouerCopy);
    }

    const handleFilmLocate = (id: number) => {
        return rentFilms.some((film) => film.id === id);    
    }

    const handleSearchFilmById = (id: number) => {
        return films.find((film) => film.id === id);    
    }

    return (
        <ThemeContext.Provider value={{ 
            search, setSearch, 
            films, setFilms, 
            rentFilms, setterRent: handleRent,
            deleteFilm: handleSupprimerRent,
            isLocate: handleFilmLocate,
            user, setUser,
            handleSearchFilmById,
            setRentFilms,
            affichageListe, setAffichageListe
        }}>
          {children}
        </ThemeContext.Provider>
    );
};
