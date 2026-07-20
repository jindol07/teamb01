import React, { useState } from 'react';
import Layout from './layout/Layout';
import AppRouter from './router/AppRouter';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {

  return (
      <Router>
        <Layout>
          <AppRouter />
        </Layout>
      </Router>
  );
}

export default App;
