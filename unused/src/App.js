import './App.css';
import AbsentPage from './page/attend/absent';
import ListPage from './page/attend/list';
import UpdateUser from './page/authentication/change';
import ForgetPassword from './page/authentication/forget';
import LoginPage from './page/authentication/login';
import RegisterPage from './page/authentication/register';
import ResetPasswordPage from './page/authentication/reset';
import Verification from './page/authentication/verify';
import HomePage from './page/home';
import ProtectedRoute from './protected.routes';
import {Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Routes>
          {
            <Route path="/" element={
              <ProtectedRoute>
                <HomePage/>
              </ProtectedRoute>
            }></Route>
          }
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/forget' element={<ForgetPassword/>}/>
          <Route path='/verify/:par' element={<Verification/>}/>
          <Route path='/reset/:par' element={<ResetPasswordPage/>}/>
          <Route path='/update' element={<UpdateUser/>}/>
          <Route path='/absent' element={<AbsentPage/>}/>
          <Route path='/listed' element={<ListPage/>}/>
        </Routes>
    </div>
  );
}

export default App;
