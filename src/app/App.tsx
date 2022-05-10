import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import HomePage from '../components/homePage/HomePage';
import Login from '../components/login/Login';
import Signup from '../components/signup/Signup';
import AuthProvider from '../providers/AuthProvider';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
