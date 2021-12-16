import { 
    GET_INTERVIEW_DATA,
    ADD_INTERVIEW_DATA,
    UPDATE_INTERVIEW_DATA,
    REMOVE_INTERVIEW_DATA,
    UPLOAD_FILE_IMAGE,
    DELETE_FILE_IMAGE
} from './actionTypes';

let defaultStatus = {
    dataList: []
}

export default function (state = defaultStatus, action) {
    
    let { vm, data } = action;

    if (action.type === GET_INTERVIEW_DATA) {
        
        let newState = JSON.parse(JSON.stringify(state));

        let { id } = action;

        if (id) {

            // 在Form表单中运行
            let formData = data.interview[0];
            let fileList = vm.state.fileList;

            fileList.push({
                uid: -1,
                name: formData.interview_img.substr(formData.interview_img.lastIndexOf('/') + 1),
                thumbUrl: formData.interview_img,
                url: formData.interview_img
            })

            vm.setState({
                formData
            })

            // 把详情更新到页面
            vm.formRef.current.setFieldsValue(formData);

        } else {
    
            // 更新页面数据
            vm.setState({
                loading: false,
                total: data._results
            })
    
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

        // 更新页面数据
        let { updObj } = action;

        let url = data.data.file[0];
        let fileList = vm.state.fileList;

        fileList.push({
            uid: updObj.file.uid,
            name: updObj.file.name,
            thumbUrl: url,
            url
        })

        vm.state.formData.interview_img = url;

        vm.setState({
            formData: vm.state.formData
        });

        return newState;
    } else if (action.type === DELETE_FILE_IMAGE) {
        let newState = JSON.parse(JSON.stringify(state));        
        return newState;
    }
    return state;
}