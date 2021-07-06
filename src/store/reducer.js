
import { GET_BALANCE, RECHARGE_ADD, CONSUME_BUY } from './actionTypes';

let defaultStatus = {
    balance: 0
}

export default function (state = defaultStatus, action) {

    if (action.type === GET_BALANCE) {
        var newState = JSON.parse(JSON.stringify(state));
        newState.balance = action.amt;
        return newState;
    } else if (action.type === RECHARGE_ADD) {
        var newState = JSON.parse(JSON.stringify(state));
        newState.balance = action.amt;
        return newState;
    } else if (action.type === CONSUME_BUY) {
        var newState = JSON.parse(JSON.stringify(state));
        newState.balance = action.amt;
        return newState;
    }

    return state;
}