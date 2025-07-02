import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Accueil } from './pages/Accueil';
import { Profile } from './pages/Profile';
import { DetailsFilm } from './pages/DetailsFilm';
import { Success } from './pages/Success';
import { Cart } from './pages/Cart';

export default function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/film/:id" element={<DetailsFilm />} />
          <Route path="/success/:session_id" element={<Success />} />
        </Routes>
    </Router>
  )
}
