import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Application from './Application';

//pull in aws mobile resrouces
import Amplify from 'aws-amplify';
import configuration from './aws-exports';

//configure amplify to awsmobile
Amplify.configure(configuration);


ReactDOM.render( < Application / > , document.getElementById('root'));