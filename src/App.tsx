import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { FilmProvider } from './Components/context/FilmProvider'
import { Accueil } from './Pages/Accueil'
import { Profile } from './Pages/Profile';
import { DetailsFilm } from './Pages/DetailsFilm';

export default function App() {
  return (
    <Router>
      <FilmProvider>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/film/:id" element={<DetailsFilm />} />
        </Routes>
      </FilmProvider>
    </Router>
  )
}
