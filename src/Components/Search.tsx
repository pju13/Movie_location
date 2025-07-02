import { useStore } from "./context/FilmProvider";

export const Search: React.FC = () => {
    const updateAffichageListe = useStore((state) => state.updateAffichageListe);
    const searchTitle = useStore((state) => state.searchTitle);
    const updateSearchTitle = useStore((state) => state.updateSearchTitle);

    const handleAffichage = (e) => {
        updateAffichageListe(e.target.checked);
    }

    return (
        <>
            <label className="swap mr-2">
                {/* this hidden checkbox controls the state */}
                <input type="checkbox" onClick={handleAffichage} />

                {/* volume on icon */}
                <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                <path d="M280-600v-80h560v80H280Zm0 160v-80h560v80H280Zm0 160v-80h560v80H280ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z"/>
                </svg>

                {/* volume off icon */}
                <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                <path d="M120-520v-320h320v320H120Zm0 400v-320h320v320H120Zm400-400v-320h320v320H520Zm0 400v-320h320v320H520Z"/>
                </svg>
            </label>

            <input 
            type="search" 
            value={searchTitle}
            placeholder="Rechercher un film..." 
            onChange={(e) => updateSearchTitle(e.target.value)}
            className="input input-bordered bg-white w-24 md:w-auto mr-2 max-md:hidden" />
        </>
    );
}
