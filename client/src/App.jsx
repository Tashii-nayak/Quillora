import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Explore from './pages/Explore';
import Read from './pages/Read';
import GenrePage from './pages/GenrePage';
import PostDetail from './pages/PostDetail';
import Write from './pages/Write';
import Chatrooms from './pages/Chatrooms';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/read/post/:id" element={<PostDetail />} />
        <Route path="/read/:genre" element={<GenrePage />} />
        <Route path="/read" element={<Read />} />
        <Route path="/write" element={<Write />} />
        <Route path="/chatrooms" element={<Chatrooms />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

