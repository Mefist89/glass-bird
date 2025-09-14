import './App.css';
import Menu from './components/Menu';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Tests from './pages/Tests';
import Contact from './pages/Contact';
import Login from './pages/Login';
import About from './pages/About';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<div className="content"><h1>Welcome to Glass Bird!</h1></div>} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
