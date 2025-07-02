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
    rent: boolean;
}

export type User = {
    name: string;
    email: string;
    username: string;
}

export type StoreGestionFilms = {
    searchTitle: string;
    affichageFormatListe: boolean;
    films: Film[];
    rentFilms: Film[]; 
    user: User | null;
    updateSearchTitle: (query: string) => void;
    addFilms: (newFilms: Film[]) => void;      
    updateFilmsRent: (filmToRent: Film) => void;    
    deleteByIdFilmToRent: (id: number) => void;
    deleteAllFilmsToRent: () => void;
    isRent: (id: number) => boolean;
    setUser: (user: User | undefined) => void;
    updateAffichageListe: (type: boolean) => void;
};

export type MovieCardProps = {
    film: Film;
}

export type BodyProps = {
    children: ReactNode;
}
