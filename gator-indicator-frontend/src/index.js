import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyFancyComponent from './App';
import MapPage from './test';
import MapComponent from './test2';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MapComponent />, document.getElementById('root'));
registerServiceWorker();
