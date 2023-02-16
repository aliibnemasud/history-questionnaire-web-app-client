import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/login/Login';
import SignUp from './components/login/SignUp';
import Questions from './components/Questions/Questions';


function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Login/>}></Route>        
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/questions' element={<Questions/>}></Route>


      </Routes>
      
    </div>
  );
}

export default App;
