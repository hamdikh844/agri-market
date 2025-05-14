// src/App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n'; // Internationalization setup
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDashboard from './pages/ProductDashboard';
import Farmers from './pages/Farmers';
import Footer from './components/Footer';
import { Suspense } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import Login from './pages/Login';
import Register from './pages/Register';
import FruitProductPage from './pages/FruitProductPage';
import MachineryProductPage from './pages/MachineryProductPage';
import VegetableProductPage from './pages/VegetableProductPage';
import GrainProductPage from './pages/GrainProductPage';
import DairyProductPage from './pages/DairyProductPage';


function App() {
  return (
    <Router>
  
      <Suspense fallback={<LoadingSpinner />}>
        <div className="d-flex flex-column min-vh-100">
          <Navbar />
          
          
          <main className="flex-grow-1 py-4">
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ProductDashboard" element={<ProductDashboard />} />
                <Route path="/farmers" element={<Farmers />} />
                <Route path="/login" element={<Login/>}/>
               <Route path="/register" element={<Register/>}/>
               <Route path="/products/create/fruit" element={<FruitProductPage />} />
        <Route path="/products/create/machinery" element={<MachineryProductPage />} />
        <Route path="/products/create/vegetables" element={<VegetableProductPage />} />
        <Route path="/products/create/grains" element={<GrainProductPage />} />
        <Route path="/products/create/dairy" element={<DairyProductPage />} />

                
            
                
              </Routes>
            </div>
          </main>
          
          <Footer />
        </div>
      </Suspense>
    </Router>
  );
}

export default App;