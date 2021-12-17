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
    let { id, params, vm } = action;
    let retData = null;

    yield queryInterviewList({ params }).then(result => {
        // 结果赋值
        retData = result;
        
        // 更新数据
        if (id) {

            // 在Form表单中运行
            let formData = retData.interview[0];
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
    
            // 结果赋值
            vm.setState({
                loading: false,
                total: retData._results
            })
        }

    })
    
    yield put({
        vm: action.vm,
        id: action.id,
        type: GET_INTERVIEW_DATA,
        data: retData
    })
}


// 新增数据
function * addInterviewInfoHandle (action) {
    let { data, vm } = action;
    let retData = null;

    yield addInterviewInfo({ data }).then(result => {
        // 结果赋值
        retData = result;
        
        // 更新数据
        vm.setState({
            loading: false
        }, () => {
            
            // 跳转页面
            vm.props.history.push('/datalist');
            
        })
    })
    
    yield put({
        vm: action.vm,
        type: ADD_INTERVIEW_DATA,
        data: retData
    })
}


// 更新数据
function * updateInterviewInfoHandle (action) {
    let { id, data, vm } = action;
    let retData = null;

    yield updateInterviewInfo({ id, data }).then(result => {
        // 结果赋值
        retData = result;
        
        // 更新数据
        vm.setState({
            loading: false
        }, () => {
            
            // 跳转页面
            vm.props.history.push('/datalist');

        })

    })
    
    yield put({
        vm: action.vm,
        type: UPDATE_INTERVIEW_DATA,
        data: retData
    })
}


// 删除数据
function * deleteInterviewInfoHandle (action) {
    let { id } = action;
    let retData = null;

    yield deleteInterviewInfo({ id }).then(result => {
        // 结果赋值
        retData = result;

        // 更新数据
        let vm = action.vm;
        vm.props.fetchInterviewDataList(vm);

    })
    
    yield put({
        vm: action.vm,
        type: REMOVE_INTERVIEW_DATA,
        data: retData
    })
}


// 上传文件
function * uploadFileHandleHandle (action) {
    let { vm, updObj, data } = action;
    let retData = null;

    yield uploadFileHandle({ data }).then(result => {
        // 结果赋值
        retData = result;

        // 更新数据
        let url = retData.data.file[0];
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
    })
    
    yield put({
        vm: action.vm,
        type: UPLOAD_FILE_IMAGE,
        data: retData
    })
}


// 文件删除
function * deleteFileHandleHandle (action) {
    let { data } = action;
    let retData = null;

    yield deleteFileHandle({ data }).then(result => {
        // 结果赋值
        retData = result;
    })
    
    yield put({
        vm: action.vm,
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