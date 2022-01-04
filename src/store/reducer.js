import { 
    GET_EXERCISE_DATA,
    ADD_EXERCISE_DATA,
    UPDATE_EXERCISE_DATA,
    REMOVE_EXERCISE_DATA,
    UPLOAD_FILE_IMAGE,
    DELETE_FILE_IMAGE,
    GET_TIPS_CONTENT,
    UPDATE_TIPS
} from './actionTypes';

let defaultStatus = {
    // 是否显示提示
    showTips: false,
    tipsContent: '',

    // 数据列表
    exerciseList: []
}

export default function (state = defaultStatus, action) {
    if (action.type === GET_EXERCISE_DATA) {        
        let newState = JSON.parse(JSON.stringify(state));

        if (action.isFirst) {
            newState.exerciseList = action.data.ex_recoder;
        } else {
            newState.exerciseList.push(...action.data.ex_recoder);
        }

        if (newState.exerciseList.length >= action.data._results) {
            action.vm.setState({
                loading: false,
                hasMore: false
            })
        }
        
        return newState;
    } else if (action.type === ADD_EXERCISE_DATA) {
        let newState = JSON.parse(JSON.stringify(state));
        return newState;
    } else if (action.type === UPDATE_EXERCISE_DATA) {
        let newState = JSON.parse(JSON.stringify(state));

        if (action.task) {

            action.vm.setState({
                maskData: action.data
            })

            let curIndex = null;
            action.data.id = action.id;
            newState.exerciseList.map((item, index) => {
                if (item.id === action.id) {
                    curIndex = index;
                }
            })
    
            if (curIndex !== null) {
                newState.exerciseList.splice(curIndex, 1, action.data);
            }
        }

        return newState;
    } else if (action.type === REMOVE_EXERCISE_DATA) {
        let newState = JSON.parse(JSON.stringify(state));
        let curIndex = null;

        newState.exerciseList.map((item, index) => {
            console.log(item.id, action.id);
            if (item.id === action.id) {
                curIndex = index;
            }
        })

        if (curIndex !== null) {
            newState.exerciseList.splice(curIndex, 1);
        }

        return newState;
    } else if (action.type === UPLOAD_FILE_IMAGE) {
        let newState = JSON.parse(JSON.stringify(state));
        return newState;
    } else if (action.type === DELETE_FILE_IMAGE) {
        let newState = JSON.parse(JSON.stringify(state));
        return newState;
    } else if (action.type === GET_TIPS_CONTENT) {
        let newState = JSON.parse(JSON.stringify(state));
        newState.showTips = !!action.data.show;
        newState.tipsContent = action.data.message;
        return newState;
    } else if (action.type === UPDATE_TIPS) {
        let newState = JSON.parse(JSON.stringify(state));
        newState.showTips = !!action.data.show;
        newState.tipsContent = action.data.message;
        return newState;
    }
    return state;
}