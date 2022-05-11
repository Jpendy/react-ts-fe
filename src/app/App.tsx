import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet
} from 'react-router-dom';
import HomePage from '../components/homePage/HomePage';
import AuthForm from '../components/authForm/AuthForm';
import AuthProvider, { useActiveUser } from '../providers/AuthProvider';
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

            {/* Example of how to use protected route below */}
            <Route element={<RequireAuth />} >
              {/* All protected routes would go here together like the commented out routes below */}
              {/* <Route path='/' element={<ProtectedComponent />} /> */}
              {/* <Route path='/' element={<AnotherProtectedComponent />} /> */}
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

// This component is used for auth protected routes example of use above
function RequireAuth() {
  let activeUser = useActiveUser();
  let location = useLocation();
  if (!activeUser) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return <Outlet />;
}

export default App;
