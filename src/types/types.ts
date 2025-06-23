import { ReactNode } from "react";

export type FilmProviderProps = {
    children: ReactNode;
}

export type Film = {
    id: number;
    release_date: string;
    original_title: string;
    poster_path: string;
    vote_average: number;
    overview: string;
    adult: boolean;
}

export type User = {
    name: string;
    email: string;
    username: string;
}

export type FilmContextProps = {
    search: string;
    setSearch: (query: string) => void;
    films: Film[];
    setFilms: (films: Film[]) => void;      
    rentFilms: Film[]; 
    setterRent: (films: Film) => void;    
    deleteFilm: (id: number) => void;
    handleSearchFilmById: (id: number) => void;
    isLocate: (id: number) => boolean;
    user: User | undefined;
    setUser: (user: User | undefined) => void;
    setRentFilms: (films: Film[]) => void;  
    affichageListe: boolean;
    setAffichageListe: (type: boolean) => void;
}

export type MovieCardProps = {
    film: Film;
}

export type BodyProps = {
    children: ReactNode;
  }
