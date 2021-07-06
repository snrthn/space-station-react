
import { GET_BALANCE, RECHARGE_ADD, CONSUME_BUY } from './actionTypes';

export const getBalance = function () {
    return function (dispatch) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://www.snrthn.com/api/finance/balance', true);
        xhr.send();
        xhr.onload = function () {
            var res = JSON.parse(xhr.responseText);
            dispatch({
                type: GET_BALANCE,
                amt: res.data.amt
            });
        }
    }
};

export const RechargeAdd = function (amt, ele) {
    return function (dispatch) {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', 'https://www.snrthn.com/api/finance/balance', true);
        xhr.send(JSON.stringify({
            id: 1,
            handle: 1,
            amt
        }));
        xhr.onload = function () {
            var res = JSON.parse(xhr.responseText);
            ele.value = '';
            dispatch({
                type: RECHARGE_ADD,
                amt: res.data.amt
            });
        }
    }
};

export const ConsumeBuy = function (amt, ele) {
    return function (dispatch) {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', 'https://www.snrthn.com/api/finance/balance', true);
        xhr.send(JSON.stringify({
            id: 1,
            handle: 0,
            amt
        }));
        xhr.onload = function () {
            var res = JSON.parse(xhr.responseText);
            ele.value = '';
            dispatch({
                type: CONSUME_BUY,
                amt: res.data.amt
            });
        }
    }
};