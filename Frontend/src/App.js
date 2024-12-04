import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import LibrarianDashboard from './components/LibrarianDashboard';
import UserDashboard from './components/UserDashboard';
import { EmailProvider } from '../src/components/EmailContext';

function App() {
  return (
    <EmailProvider>
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/librarian" element={<LibrarianDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </Router>
    </EmailProvider>
  );
}

export default App;