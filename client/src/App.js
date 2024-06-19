import { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import withLayout from './components/layout/withLayout';
import './App.css';

const Home = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/About'));
const FaqPage = lazy(() => import('./pages/Faq'));

function App() {
  return (
    <Box>
      <Router>
        <Routes>
          <Route element={withLayout(Home)()} path="/" />
          <Route element={withLayout(AboutPage)()} path="/about-us" />
          <Route element={withLayout(FaqPage)()} path="/faq" />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
