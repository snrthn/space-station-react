import { 
    GET_INTERVIEW_DATA,
    ADD_INTERVIEW_DATA,
    UPDATE_INTERVIEW_DATA,
    REMOVE_INTERVIEW_DATA,
    UPLOAD_FILE_IMAGE,
    DELETE_FILE_IMAGE,
    UPDATE_TIPS
} from './actionTypes';

let defaultStatus = {
    // 是否显示提示
    showTips: true,
    tipsContent: '个人疫情期间锻炼工具正在开发中……',
}

export default function (state = defaultStatus, action) {
    if (action.type === GET_INTERVIEW_DATA) {        
        let newState = JSON.parse(JSON.stringify(state));
        return newState;
    } else if (action.type === ADD_INTERVIEW_DATA) {
        let newState = JSON.parse(JSON.stringify(state));
        return newState;
    } else if (action.type === UPDATE_INTERVIEW_DATA) {
        let newState = JSON.parse(JSON.stringify(state));
        return newState;
    } else if (action.type === REMOVE_INTERVIEW_DATA) {
        let newState = JSON.parse(JSON.stringify(state));
        return newState;
    } else if (action.type === UPLOAD_FILE_IMAGE) {
        let newState = JSON.parse(JSON.stringify(state));
        return newState;
    } else if (action.type === DELETE_FILE_IMAGE) {
        let newState = JSON.parse(JSON.stringify(state));
        return newState;
    } else if (action.type === UPDATE_TIPS) {        
        let newState = JSON.parse(JSON.stringify(state));
        for (let key in action.data) {
            newState[key] = action.data[key];
        }
        return newState;
    }
    return state;
}