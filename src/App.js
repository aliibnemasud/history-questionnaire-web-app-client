import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import SeeAnswer from './components/Dashboard/SeeAnswer';
import Login from './components/login/Login';
import SignUp from './components/login/SignUp';
import Questions from './components/Questions/Questions';
import Error from './components/Shared/Error';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}></Route>        
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/questions' element={<Questions/>}></Route>
        <Route path='/seeAnswer/:questionId' element={<SeeAnswer/>}></Route>
        <Route path='*' element={<Error/>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
