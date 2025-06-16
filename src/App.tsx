import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/HomePage/home-page'
import DetailPage from './pages/DetailPage/detail-page';
import FavouritePage from './pages/FavouritePage/favourite-page';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photo/:id" element={<DetailPage />} />
          <Route path="/favourite" element={<FavouritePage/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
