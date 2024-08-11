import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecoverPasswordPage from './components';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth/recover" element={<RecoverPasswordPage />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;