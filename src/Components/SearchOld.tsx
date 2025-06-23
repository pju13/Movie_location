import { useContext } from "react";
import { ThemeContext } from "./context/FilmProvider";


export const Search: React.FC = () => {
    const { search, setSearch, rentFilms } = useContext(ThemeContext);

    const nbFilmsLoue = rentFilms?.length;

    return (
        <div className="w-[90%] bg-gray-200">
            <div className="text-center w-full mt-10 mb-5"> 
                <label className="input bg-amber-50">
                    <svg className="h-[1em] opacity-50 text-gray-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                    <input 
                        type="search" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input input-lg text-gray-800" 
                        placeholder="Rechercher un film..." 
                    />
                </label>
                <label htmlFor="my-drawer" className="btn btn-primary drawer-button ml-5">{rentFilms?.length > 0 ? `Mon panier a ${nbFilmsLoue} film(s)` : 'Mon panier est vide'}</label>
            </div>
        </div>
    );
}
