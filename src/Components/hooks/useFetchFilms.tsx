
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export const useFetchFilms = () => {
    const apiKey = '3d1cb94d909aab088231f5af899dffdc';
    const { data, error, isLoading } = useSWR(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`, fetcher)
 
    //console.log(data?.results);

    return {
      films: data?.results,
      isLoading,
      isError: error
    }
}
