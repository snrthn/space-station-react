/**
 * @files react-saga
 * @author yanghuning
 * @date 2021-07-08
 */

import { put, takeEvery } from 'redux-saga/effects';
import { 
    GET_BALANCE,
    GET_BALANCE_SAGA,
    RECHARGE_ADD,
    RECHARGE_ADD_SAGA,
    CONSUME_BUY,
    CONSUME_BUY_SAGA
} from './actionTypes';

function * getBalanceSaga (action) {
    let retData = null;
    yield new Promise((resolve) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://www.snrthn.com/api/finance/balance', true);
        xhr.send();
        xhr.onload = function () {
            var res = JSON.parse(xhr.responseText);
            resolve(res);
        }
    }).then(res => {
        retData = res;
    });
    
    yield put({
        type: GET_BALANCE,
        amt: retData.data.amt
    });
}

function * RechargeAddSaga (action) {
    let retData = null;
    yield new Promise((resolve) => {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', 'https://www.snrthn.com/api/finance/balance', true);
        xhr.send(JSON.stringify({
            id: 1,
            handle: 1,
            amt: action.ele.value * 1
        }));
        xhr.onload = function () {
            var res = JSON.parse(xhr.responseText);
            resolve(res);
        }
    }).then(res => {
        action.ele.value = '';
        retData = res;
    });

    yield put({
        type: RECHARGE_ADD,
        amt: retData.data.amt
    });
}

function * ConsumeBuySaga (action) {
    let retData = null;
    yield new Promise((resolve) => {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', 'https://www.snrthn.com/api/finance/balance', true);
        xhr.send(JSON.stringify({
            id: 1,
            handle: 0,
            amt: action.ele.value * 1
        }));
        xhr.onload = function () {
            var res = JSON.parse(xhr.responseText);
            resolve(res);
        }
    }).then(res => {
        action.ele.value = '';
        retData = res;
    });

    yield put({
        type: CONSUME_BUY,
        amt: retData.data.amt
    });
}

function * mySagas () {
    // 余额
    yield takeEvery(GET_BALANCE_SAGA, getBalanceSaga);
    // 充值
    yield takeEvery(RECHARGE_ADD_SAGA, RechargeAddSaga);
    // 支付
    yield takeEvery(CONSUME_BUY_SAGA, ConsumeBuySaga);
}

export default mySagas;