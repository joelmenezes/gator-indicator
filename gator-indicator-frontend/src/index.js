import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyFancyComponent from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MyFancyComponent />, document.getElementById('root'));
registerServiceWorker();
