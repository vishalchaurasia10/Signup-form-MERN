import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import {Routes,Route} from "react-router-dom";
import axiosInstance from "./axiosInstance";
import {Toaster} from "react-hot-toast";
import { UserContextProvider } from '../context/userContext';
import './App.css'
import Dashboard from './Pages/Dashboard';


// axios.defaults.baseUrl = 'http://localhost:8000';
// axios.defaults.withCredentials = true


function App() {

  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position='bottom-right' toastOptions={{duration:2000}} />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/Register' element={<Register />}/>
        <Route path='/Login' element={<Login />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
      </Routes>
      </UserContextProvider>
  )
}

export default App
