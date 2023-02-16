import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import SignUp from './components/login/SignUp';


function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Login/>}></Route>        
        <Route path='/signup' element={<SignUp/>}></Route>


      </Routes>
      
    </div>
  );
}

export default App;
