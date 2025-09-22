import './App.css';
import Sidebar from './components/Sidebar';
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
import { useState, useEffect } from 'react';

const AppContent: React.FC = () => {
  // const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  useEffect(() => {
    const handleToggleSidebar = () => {
      toggleSidebar();
    };

    window.addEventListener('toggle-sidebar', handleToggleSidebar);
    return () => window.removeEventListener('toggle-sidebar', handleToggleSidebar);
  }, [sidebarCollapsed]);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <div style={{
        flex: 1,
        marginLeft: sidebarCollapsed ? '60px' : '250px',
        transition: 'margin-left 0.3s ease',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ flex: 1, padding: '20px' }}>
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
        </div>
        <Footer />
      </div>
    </div>
  );
};

function App() {
 return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
