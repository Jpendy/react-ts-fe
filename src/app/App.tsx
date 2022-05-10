import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import HomePage from '../components/homePage/HomePage';
import AuthForm from '../components/authForm/AuthForm';
import AuthProvider from '../providers/AuthProvider';
import Header from '../components/header/Header';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<AuthForm type='login' />} />
            <Route path='/signup' element={<AuthForm type='signup' />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
