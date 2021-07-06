/**
 * @files 入口文件
 * @author yanghuning
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from './store';
import App from 'views/Home';

import './styles/reset.css';
import './styles/global.css';
import './styles/balance.css';

ReactDOM.render(
    <Provider store={ Store }>
        <App/>
    </Provider>,
    document.getElementById('root')
);