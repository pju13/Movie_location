import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { FilmProvider } from './Components/context/FilmProvider'
import { Accueil } from './pages/Accueil';
import { Profile } from './pages/Profile';
import { DetailsFilm } from './pages/DetailsFilm';

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
