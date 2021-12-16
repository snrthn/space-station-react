/**
 * @files react-saga
 * @author yanghuning
 * @date 2021-07-08
 */

import { put, takeEvery } from 'redux-saga/effects';

import { 
    GET_INTERVIEW_DATA,
    GET_INTERVIEW_DATA_SAGA,
    ADD_INTERVIEW_DATA,
    ADD_INTERVIEW_DATA_SAGA,
    UPDATE_INTERVIEW_DATA,
    UPDATE_INTERVIEW_DATA_SAGA,
    REMOVE_INTERVIEW_DATA,
    REMOVE_INTERVIEW_DATA_SAGA,
    UPLOAD_FILE_IMAGE,
    UPLOAD_FILE_IMAGE_SAGA,
    DELETE_FILE_IMAGE,
    DELETE_FILE_IMAGE_SAGA
} from './actionTypes';

import {
    queryInterviewList,
    addInterviewInfo,
    updateInterviewInfo,
    deleteInterviewInfo,
    uploadFileHandle,
    deleteFileHandle
} from 'api/interview';


// 获取数据
function * queryInterviewListHandle (action) {
    let retData = null;

    yield queryInterviewList({
        params: action.params
    }).then(result => {

        let vm = action.vm;

        if (action.id) {
            let formData = result.interview[0];
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
            vm.formRef.current.setFieldsValue(formData);
        } else {
            // 移除页面中的 Loading
            vm.setState({
                loading: false,
                total: result._results
            })
        }

        // 将请求结果赋值并返回
        retData = result;
    })
    
    yield put({
        type: GET_INTERVIEW_DATA,
        data: retData
    })
}


// 新增数据
function * addInterviewInfoHandle (action) {
    let retData = null;

    yield addInterviewInfo({
        data: action.data
    }).then(result => {

        // 跳转页面
        let vm = action.vm;
        vm.props.history.push('/datalist');

        retData = result;
    })
    
    yield put({
        type: ADD_INTERVIEW_DATA,
        data: retData
    })
}


// 更新数据
function * updateInterviewInfoHandle (action) {
    let retData = null;
    

    yield updateInterviewInfo({
        id: action.id,
        data: action.data
    }).then(result => {

        // 跳转页面
        let vm = action.vm;
        vm.props.history.push('/datalist');

        retData = result;
    })
    
    yield put({
        type: UPDATE_INTERVIEW_DATA,
        data: retData
    })
}


// 删除数据
function * deleteInterviewInfoHandle (action) {
    let retData = null;

    yield deleteInterviewInfo({
        id: action.id
    }).then(result => {

        // 重新拉取数据
        let vm = action.vm;
        vm.props.fetchInterviewDataList(vm);

        retData = result;
    })
    
    yield put({
        type: REMOVE_INTERVIEW_DATA,
        data: retData
    })
}


// 上传文件
function * uploadFileHandleHandle (action) {
    let retData = null;

    yield uploadFileHandle(action).then(result => {

        // 更新页面数据
        let vm = action.vm;
        let url = result.data.file[0];
        let fileList = vm.state.fileList;
        fileList.push({
            uid: action.updObj.file.uid,
            name: action.updObj.file.name,
            thumbUrl: url,
            url
        })

        vm.state.formData.interview_img = url;
        vm.setState({
            formData: vm.state.formData
        });

        retData = result;
    })
    
    yield put({
        type: UPLOAD_FILE_IMAGE,
        data: retData
    })
}


// 文件删除
function * deleteFileHandleHandle (action) {
    let retData = null;

    yield deleteFileHandle(action).then(result => {
        retData = result;
    })
    
    yield put({
        type: DELETE_FILE_IMAGE,
        data: retData
    })
}


function * mySagas () {
    // 获取数据
    yield takeEvery(GET_INTERVIEW_DATA_SAGA, queryInterviewListHandle);

    // 新增数据
    yield takeEvery(ADD_INTERVIEW_DATA_SAGA, addInterviewInfoHandle);

    // 更新数据
    yield takeEvery(UPDATE_INTERVIEW_DATA_SAGA, updateInterviewInfoHandle);

    // 删除数据
    yield takeEvery(REMOVE_INTERVIEW_DATA_SAGA, deleteInterviewInfoHandle);

    // 上传文件
    yield takeEvery(UPLOAD_FILE_IMAGE_SAGA, uploadFileHandleHandle);

    // 文件删除
    yield takeEvery(DELETE_FILE_IMAGE_SAGA, deleteFileHandleHandle);
}


export default mySagas;