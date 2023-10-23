import './App.css';
import Home from './Components/Home';
import Registration from './Components/Registration';
import Login from './Components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App bg-subtle">
      <ToastContainer> </ToastContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} > </Route>
          <Route path="/register" element={<Registration />} > </Route>
          <Route path="/home" element={<Home />} > </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
