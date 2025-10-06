import { AuthProvider } from './context/AuthContext';
import GlassBirdHome from './pages/HomePage';
import PythonCoursePage from './pages/PythonCoursePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <Routes>
          <Route path="/" element={<GlassBirdHome />} />
          <Route path="/python-course" element={<PythonCoursePage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;