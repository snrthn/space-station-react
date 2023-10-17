/**
 * @files 入口文件
 * @author yanghuning
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from './store';
import App from 'views/index';

import 'styles/reset.css';
import 'styles/global.css';

ReactDOM.render(
    <Provider store={ Store }>
        <App/>
    </Provider>,
    document.getElementById('root')
);