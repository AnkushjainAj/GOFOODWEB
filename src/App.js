import './App.css';
import Home from './screens/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './screens/Login';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';

// Import Bootstrap CSS and JS
import 'bootstrap/dist/css/bootstrap.min.css'; // Regular bootstrap (if not using dark mode)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// If you want to use the dark theme, ensure the path is correct for your setup:
// import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createuser" element={<Signup />} />
            <Route path="/myOrder" element={<MyOrder />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
