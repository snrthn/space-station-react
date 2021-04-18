/**
 * @files 入口文件
 * @author yanghuning
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from 'views/Home';

import './styles/reset.css';
import './styles/global.css';

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);