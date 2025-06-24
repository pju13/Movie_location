import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useUser () {
    const { data, error, isLoading } = useSWR('https://jsonplaceholder.typicode.com/users/1', fetcher)
    //console.log(data);
    return {
        data: data,
        isLoading,
        isError: error
    }
}
