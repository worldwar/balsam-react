import { BrowserRouter } from 'react-router-dom'
require('./main.css');
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx'

ReactDOM.render(<BrowserRouter>
        <App />
    </BrowserRouter>, document.getElementById('app'));
