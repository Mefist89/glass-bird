import './App.css';
import Menu from './components/Menu';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Tests from './pages/Tests';
import Contact from './pages/Contact';
import Login from './pages/Login';
import About from './pages/About';
import Register from './pages/Register';
import Python from './pages/Python';
import Network from './pages/Network';
import SQL from './pages/SQL';

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/python" element={<Python />} />
        <Route path="/network" element={<Network />} />
        <Route path="/sql" element={<SQL />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
