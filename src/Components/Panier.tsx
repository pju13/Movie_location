import { useContext } from "react";
import { ThemeContext } from "./context/FilmProvider";
import { Film } from "../types/types";

export const Panier: React.FC = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useContext must be used within a ThemeContext.Provider");
    }
    const { rentFilms, deleteFilm } = context;

    const nbFilmsLoue = rentFilms?.length;
    const TotalAPayer = nbFilmsLoue * 2;

    const filmsLouer = Array.isArray(rentFilms) ? rentFilms?.map((film: Film) => {
        const url = `https://image.tmdb.org/t/p/w200/${film.poster_path}`;
        return (
            <div key={film.id} className="mt-4">
                <div className="avatar">
                    <div className="w-24 rounded">
                        <img src={url} />
                    </div>
                    <p className="text-xl ml-2">2€</p>
                    <button className="btn btn-dash btn-error ml-8 cursor-pointer" onClick={() => deleteFilm(film.id)}>🗑</button>
                </div>
                <p>{film.original_title}</p>
            </div>
        );
    }) : null;

    const handleClick = async () => {
        console.log("Implémentation Stripe en cours...");
    }

    return (
        <>
            {rentFilms.length !== 0 ? 
            <div>
                <p className="text-white text-xl mt-1 mb-2">{nbFilmsLoue} films à 2€ soit {TotalAPayer}€ à payer</p>
                {filmsLouer} 
            </div>
            : <b className="mt-3 p-3 bg-orange-500 rounded-lg">Rien à louer ?! </b> }

            {rentFilms.length !== 0 ? 
                <button 
                className="btn btn-success mt-10 cursor-pointer"
                onClick={handleClick}
                >Valider mon panier de {TotalAPayer}€</button> : null}
        </>
    )
}
