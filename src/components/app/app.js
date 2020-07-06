import React from 'react';
import 'antd/dist/antd.css'
import './app.css';

import MoviesList from '../movies-list';

function App() {
  return (
    <div className="app">
      <MoviesList/>
    </div>
  );
}

export default App;
