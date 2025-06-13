import React from 'react';
import { Outlet } from '@tanstack/react-router';

const App = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Rick and Morty Characters</h1>
    <Outlet />
  </div>
);

export default App;