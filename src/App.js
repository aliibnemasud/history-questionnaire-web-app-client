import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import SeeAnswer from './components/Dashboard/SeeAnswer';
import Login from './components/login/Login';
import SignUp from './components/login/SignUp';
import Questions from './components/Questions/Questions';
import Error from './components/Shared/Error';
import { ToastContainer} from 'react-toastify';
import Answers from './components/Answers/Answers';
import Thanks from './components/Shared/Thanks';
import SiblingsForm from './components/Questions/SiblingsForm';
import NarrativeResponse from './components/Answers/NarrativeResponse';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}></Route>        
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/questions' element={<Questions/>}></Route>
        <Route path='/siblings' element={<SiblingsForm/>}></Route>
        <Route path='/siblings' element={<SiblingsForm/>}></Route>
        
        <Route path='/narrative/:questionId' element={<NarrativeResponse/>}></Route>
        <Route path='/thanks/:submittedQuestionId' element={<Thanks/>}></Route>

        <Route path='/seeAnswer/:questionId' element={<SeeAnswer/>}></Route>

        <Route path='/answers/:questionId' element={<Answers/>}></Route>


        <Route path='*' element={<Error/>}></Route>
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;
