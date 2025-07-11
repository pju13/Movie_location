import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Footer";
import { Body } from "../Components/Body";
import { useStore } from "../Components/context/FilmProvider";

export const Success: React.FC = () => {
    const { session_id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const deleteAllFilmsToRent = useStore((state) => state.deleteAllFilmsToRent);

    useEffect(() => {  
        if (session_id) {
            // Si un ID de session est présent dans l'URL, le paiement est considéré comme un succès.
            console.log('Paiement réussi pour la session :', session_id);
            // Ici, vous videriez normalement le panier de l'utilisateur.
            deleteAllFilmsToRent();
            setLoading(false);
        } else {
            // Si aucun ID n'est trouvé, affichez une erreur.
            setError("ID de session manquant. Impossible de vérifier le statut du paiement.");
            setLoading(false);
        }
    }, [session_id, navigate, deleteAllFilmsToRent]);

    // Affiche un message de chargement pendant la vérification.
    if (loading) {
        return <div className="flex justify-center items-center h-screen">Vérification du paiement...</div>;
    }
    
    // Affiche un message d'erreur si quelque chose s'est mal passé.
    if (error) {
        return (
            <div className="max-w-md mx-auto mt-10 text-center p-6 bg-red-100 text-red-700 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Erreur de Paiement</h2>
                <p>{error}</p>
                <Link to="/" className="text-blue-500 hover:underline mt-4 inline-block">Retour à l'accueil</Link>
            </div>
        );
    }

    return (
        <Body>
            <Navbar />
                <div className="flex flex-col items-center sm:w-[800px] m-auto mt-3">
                    <div className="breadcrumbs text-sm">
                        <ul>
                            <li><Link to="/">Home</Link></li>
                        </ul>
                    </div>
                    
                    <h1 className="text-3xl font-bold mb-4">Merci pour votre commande !</h1>
                    <p>Votre paiement a été traité avec succès.</p>
                    <p>Vous pouvez maintenant accéder à vos films.</p>
                    <Link to="/" className="mt-6 inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                        Continuer la navigation
                    </Link>
                </div>
            <Footer />
        </Body>
    );
}
