import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';
import '../public/style.css';

//import '.style.css'; // Adjust the path as needed
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Link to="/signup">JOIN/SIGN IN</Link>
      <Link to="/login">LOGIN</Link>
      <Link to="/profile">PROFILE</Link>
    </BrowserRouter>
  );
}

export default App;

