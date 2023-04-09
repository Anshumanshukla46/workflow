import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import WorkflowListPage from './components/WorkflowListPage';
import WorkflowDesignerPage from './components/WorkflowDesignerPage';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WorkflowListPage />} />
        <Route path="/workflow/:id" element={<WorkflowDesignerPage />} />
      </Routes>
    </Router>
  );
}