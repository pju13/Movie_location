import React from "react";
import { Search } from "./Search";
import { useUser } from "./hooks/useUser";
import { Film } from "../types/types";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useStore } from "./context/FilmProvider";

export const Navbar: React.FC = () => {
    const setUser = useStore((state) => state.setUser);
    const deleteAllFilmsToRent = useStore((state) => state.deleteAllFilmsToRent);
    const rentFilms = useStore((state) => state.rentFilms);
    const user = useStore((state) => state.user);

    const { data, isLoading, isError } = useUser();
    const navigate = useNavigate();

    if (isError) return <div>Erreur lors de la récupération des données</div>;
    if (isLoading) return <div>Chargement...</div>;

    const handleClickLogin = () => {
        setUser(data);
    };

    const handleClickLogout = () => {
        setUser(undefined);
        deleteAllFilmsToRent();
        navigate('/');
    };

    const nbFilmsLoue = rentFilms?.length;
    const TotalAPayer = nbFilmsLoue * 2;

    const filmsLouer = Array.isArray(rentFilms) ? rentFilms?.map((film: Film) => {
        const url = `https://image.tmdb.org/t/p/w200/${film.poster_path}`;
        return (
            <div key={film.id.toString()} className="avatar">
                <div className="w-12">
                <img src={url} />
                </div>
            </div>
        );
    }) : null;

    return (
        <div className="navbar sticky top-0 z-40 bg-amber-300 shadow-sm">
            <div className="flex-1">
                <Link to='/'>
                    <img
                    className="inline-block"
                    src="public/logo-international-white.svg"
                    alt="logo rent" />
                </Link>
                <div 
                    className="text-amber-400 bg-gray-800 md:text-xl max-md:text-sm shadow-lg shadow-amber-800 border-2 border-dotted inline-block rounded-xl md:ml-10 max-md:ml-1 md:p-2 max-md:p-0 rotate-15">
                    2€ la location
                </div>
            </div>
            <div className="flex-none">
                <Search />
                {user ?
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle mr-3">
                        <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
                        <span className="badge badge-sm indicator-item">{nbFilmsLoue}</span>
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-gray-800 z-1 mt-3 w-52 text-gray-50 shadow">
                        <div className="card-body">
                            <span className="text-lg font-bold">{nbFilmsLoue} films à louer</span>

                            <div className="avatar-group -space-x-6">
                                {filmsLouer}
                            </div>

                            <span className="text-gray-50 text-lg font-bold">Total à payer: {TotalAPayer}€</span>
                            <div className="card-actions">
                                <Link to="/cart" className="btn btn-warning btn-block">🎥 Mon panier</Link>
                            </div>
                        </div>
                    </div>
                </div> : null}
                {user ? 
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-gray-800 rounded-box z-1 mt-3 w-52 p-2 shadow text-gray-50">
                            <li>
                                <p className="justify-between font-medium">
                                    Bonjour {user.name}
                                </p>
                            </li>
                            <li><Link to="/profile">Modifier Profil</Link></li>
                            <li>
                                <a onClick={() => handleClickLogout()}>Se déconnecter</a>
                            </li>
                        </ul>
                    </div>
                : <button 
                        className="btn bg-gray-800 text-white"
                        onClick={() => handleClickLogin()}
                        >Se connecter
                 </button>}
            </div>
        </div>
    );
}
