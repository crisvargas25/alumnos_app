import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Breadcrumbs from './components/Breadcrumbs';
import Login from './components/Login';
import StudentList from './components/StudentList';
import Messages from './pages/Messages';
import ErrorPage from './components/ErrorPage';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Breadcrumbs />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/404" element={<ErrorPage code={404} message="Page Not Found" />} />
          <Route path="/500" element={<ErrorPage code={500} message="Server Error" />} />
          <Route path="*" element={<ErrorPage code={404} message="Page Not Found" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;