import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ManagementPage from './pages/ManagementPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/manage" element={<ManagementPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
