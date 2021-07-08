import { GET_BALANCE_SAGA, RECHARGE_ADD_SAGA, CONSUME_BUY_SAGA } from './actionTypes';

export const getBalance = function () {
    return {
        type: GET_BALANCE_SAGA
    }
};

export const RechargeAdd = function (ele) {
    return {
        type: RECHARGE_ADD_SAGA,
        ele
    }
};

export const ConsumeBuy = function (ele) {
    return {
        type: CONSUME_BUY_SAGA,
        ele
    }
};