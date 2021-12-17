import { 
    GET_INTERVIEW_DATA,
    ADD_INTERVIEW_DATA,
    UPDATE_INTERVIEW_DATA,
    REMOVE_INTERVIEW_DATA,
    UPLOAD_FILE_IMAGE,
    DELETE_FILE_IMAGE
} from './actionTypes';

let defaultStatus = {
    // 列表数据
    dataList: []
}

export default function (state = defaultStatus, action) {
    
    let { id, data } = action;

    if (action.type === GET_INTERVIEW_DATA) {
        
        let newState = JSON.parse(JSON.stringify(state));

        if (!id) {
            // 更新页面数据
            newState.dataList = data.interview.map(item => {
                item.key = item.id;
                return item;
            });
        }

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
    }
    return state;
}