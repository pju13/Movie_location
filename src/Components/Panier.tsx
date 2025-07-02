import { Film } from "../types/types";
import { loadStripe } from '@stripe/stripe-js';

import '../styles/Panier.css';
import { useStore } from "./context/FilmProvider";
import { Link } from "react-router-dom";

const stripePromise = loadStripe('pk_test_51HsqOtK6sHuLW9WSJYFffkeauXjA4hQHB9RbXuQhd2wK3X0mU28EQhwWMHy3uHkXHrsyyOiPz89zVH3vT9kAFB6J00bW9oAqGZ');

export const Panier: React.FC = () => {
    const rentFilms = useStore((state) => state.rentFilms);
    const deleteByIdFilmToRent = useStore((state) => state.deleteByIdFilmToRent);

    const nbFilmsLoue = rentFilms?.length;
    const TotalAPayer = nbFilmsLoue * 2;

    document.title = TotalAPayer > 0 ? `Mon panier: ${TotalAPayer}€ d'achats` : 'Vidéothèque : Les films à louer';

    const filmsLouer = Array.isArray(rentFilms) ? rentFilms?.map((film: Film) => {
        const url = `https://image.tmdb.org/t/p/w200/${film.poster_path}`;
        return (
            <tr key={film.id}>
                <td className="w-24 rounded">
                    <img src={url} />
                </td>
                <td>
                    <h4>{film.original_title}</h4>
                    <p>{film.overview}</p>
                </td>
                <td className="prix">2€</td>
                <td><button className="btn btn-dash btn-error ml-8 cursor-pointer" onClick={() => deleteByIdFilmToRent(film.id)}>🗑</button></td>
            </tr>
        );
    }) : null;

    const handleClick = async () => {
        const stripe = await stripePromise;

        // Envoyer une requête à votre backend pour créer une session de checkout
        const response = await fetch('http://127.0.0.1:8000/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity: nbFilmsLoue })
        });

        const session = await response.json();

        // Rediriger vers Stripe Checkout
        const result = await stripe?.redirectToCheckout({
            sessionId: session.id,
        });

        if (result?.error) {
            console.error(result.error.message);
        }
    }

    return (
        <>
            {rentFilms.length !== 0 ? 
            <div className="flex gap-2">
                <div className="panier-container flex-1">
                    <h1>Votre Panier</h1>
                    <table className="panier-table">
                        <thead>
                            <tr>
                                <th className="col-image"></th>
                                <th className="col-description"></th>
                                <th className="col-prix">Prix</th>
                                <th className="col-prix">Supp.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filmsLouer}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={2} className="total-label">Total</td>
                                <td className="total-prix">{TotalAPayer}€</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="flex-none h-25 mt-3 bg-white">
                    <h3 className="font-bold">{nbFilmsLoue} articles : {TotalAPayer}€</h3>
                    <button 
                        className="btn btn-success m-3 cursor-pointer"
                        onClick={handleClick}
                        >Passer la commande
                    </button>
                </div>
            </div>
            :  <div className="max-w-md mx-auto mt-10 text-center p-6 bg-red-100 text-red-700 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Votre panier est vide</h2>
                <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">Retour à l'accueil</Link>
            </div>
            }
        </>
    )
}
