// src/App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n'; // Internationalization setup
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Farmers from './pages/Farmers';
import Footer from './components/Footer';
import { Suspense } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import Login from './pages/Login';
import Register from './pages/Register';

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
                <Route path="/products" element={<Products />} />
                <Route path="/farmers" element={<Farmers />} />
                <Route path="/login" element={<Login/>}/>
               <Route path="/register" element={<Register/>}/>
                
            
                
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