
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const useFetchFilms = () => {
    const apiKey = '3d1cb94d909aab088231f5af899dffdc';
    const { data, error, isLoading } = useSWR(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`, fetcher)
 
    //console.log(data?.results);

    // 1. On vérifie si les données sont arrivées et si `results` est bien un tableau
    /*const filmsModifies = Array.isArray(data?.results) 
        ? data.results.map(film => ({
            // 2. On copie toutes les propriétés originales du film
            ...film, 
            // 3. On ajoute notre nouvelle propriété
            rent: false 
          }))
        : []; // Si pas de données, on retourne un tableau vide

    console.log(filmsModifies);*/

    return {
      filmsApi: data?.results,
      isLoading,
      isError: error
    }
}
