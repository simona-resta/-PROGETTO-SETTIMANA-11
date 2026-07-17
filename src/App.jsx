import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import MyNavbar from './components/myNavbar';
import Home from './components/Home';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex">
        <MyNavbar />
        <main className="flex-grow-1 main-content-scroll">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;