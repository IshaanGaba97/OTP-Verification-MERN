import './App.css';
import Home from './Home';
import OTPVerification from './OTPVerification';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<OTPVerification />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
