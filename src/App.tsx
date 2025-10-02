import { AuthProvider } from './context/AuthContext';
import GlassBirdHome from './pages/HomePage';

function App() {
  return (
    <AuthProvider>
      <GlassBirdHome />
    </AuthProvider>
  );
}

export default App;