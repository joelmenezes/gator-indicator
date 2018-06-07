import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MapComponent from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MapComponent />, document.getElementById('root'));
registerServiceWorker();
