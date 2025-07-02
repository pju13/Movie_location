import { create, StateCreator } from "zustand";
import { StoreGestionFilms } from "../../types/types";
import { persist, createJSONStorage } from "zustand/middleware";

const createStore: StateCreator<StoreGestionFilms> = ((set, get) => ({
    // --- 1. État initial (State) ---
    searchTitle: '',
    affichageFormatListe: false,
    films: [],
    rentFilms: [],
    user: null,

    // --- 2. Actions (les méthodes pour modifier l'état) ---
    // Met à jour le titre de la recherche
    updateSearchTitle: (query) => set({ searchTitle: query }),

    // Ajoute une liste de films à la liste principale (par ex. depuis une API)
    addFilms: (newFilms) => set(() => ({ films: newFilms })),

    // Ajoute un film à la liste des films loués (le panier)
    updateFilmsRent: (filmToRent) => set((state) => {
        // On vérifie directement sur l'état passé par `set`
        if (get().rentFilms.some(film => film.id === filmToRent.id)) {
            return state; // Le film est déjà là, on ne change rien
        }

        set(state => ({
            films: state.films.map(film =>
                film.id === filmToRent.id ? {...film, rent: !film.rent} : film)}))

        // Sinon, on l'ajoute
        return { rentFilms: [...state.rentFilms, filmToRent] };
    }),

    // Supprimer un des films à louer
    deleteByIdFilmToRent: (id) => {
        const FilmsALouerCopy = get().rentFilms.filter(film => film.id !== id);
        set(() => ({ rentFilms: [...FilmsALouerCopy]}));
    },

    // Supprimer entièrement la liste des films loués
    deleteAllFilmsToRent: () => set(() => ({ rentFilms: []})),

    isRent: (id) => {
        return get().rentFilms.some(film => film.id === id);
    },

    setUser: (user) => {
        set(() => ({user : user}));
    },

    // Définit si on doit afficher la liste ou une autre vue
    updateAffichageListe: (type) => set({affichageFormatListe: type}),
}));

export const useStore = create(
    persist(createStore,
    {
      // Options de configuration pour la persistance
      name: 'panier-storage', // Le nom de l'item dans le localStorage
      storage: createJSONStorage(() => localStorage), // (Recommandé) ou sessionStorage
    }));
