import { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import withLayout from './components/layout/withLayout';
import './App.css';

const Home = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/About'));
const FaqPage = lazy(() => import('./pages/Faq'));

/* Auth Pages */
const UserNamePage = lazy(() => import('./pages/auth/Username'));
const PasswordPage = lazy(() => import('./pages/auth/Password'));
const RegisterPage = lazy(() => import('./pages/auth/Register'));
const ProfilePage = lazy(() => import('./pages/auth/Profile'));
const RecoveryPage = lazy(() => import('./pages/auth/Recovery'));
const ResetPage = lazy(() => import('./pages/auth/Reset'));

/* Page Not Found */
const PageNotFoundPage = lazy(() => import('./components/pageNotFound'));

function App() {
  return (
    <Box>
      <Router>
        <Routes>
          <Route element={withLayout(Home)()} path="/" />
          <Route element={withLayout(AboutPage)()} path="/about" />
          <Route element={withLayout(FaqPage)()} path="/faq" />

          { /*Auth Routes*/ }
          <Route element={withLayout(UserNamePage)()} path="/login" />
          <Route element={withLayout(PasswordPage)()} path="/password" />
          <Route element={withLayout(RegisterPage)()} path="/register" />
          <Route element={withLayout(ProfilePage)()} path="/profile" />
          <Route element={withLayout(RecoveryPage)()} path="/recovery" />
          <Route element={withLayout(ResetPage)()} path="/reset" />

          { /*404 Page Not Found*/ }
          <Route element={withLayout(PageNotFoundPage)()} path="*" />

        </Routes>
      </Router>
    </Box>
  );
}

export default App;
