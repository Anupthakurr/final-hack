// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SignUp from './components/SignUp';
import Home from './components/Home';
import SignIn from './components/SignIn';
import ChatBot from './components/ChatBot';
import Consultation from './components/Consultation';
import About from './components/About';
import HealthDashboard from './components/HealthDashboard';
import HealthForm from './components/HealthForm';
import Profile from './components/Profile';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/about' element={<About />} />
        <Route path='/consultation' element={<Consultation />} />
        <Route path='/chatBot' element={<ChatBot />} />
        <Route path='/dashboard' element={<HealthDashboard />} />
        <Route path='/prediction' element={<HealthForm />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </Layout>
  );
}

export default App;
