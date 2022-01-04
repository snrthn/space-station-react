/**
 * @files react-saga
 * @author yanghuning
 * @date 2021-07-08
 */

import { put, takeEvery } from 'redux-saga/effects';

import { Toast } from 'antd-mobile';

import { 
    GET_EXERCISE_DATA,
    GET_EXERCISE_DATA_SAGA,
    ADD_EXERCISE_DATA,
    ADD_EXERCISE_DATA_SAGA,
    UPDATE_EXERCISE_DATA,
    UPDATE_EXERCISE_DATA_SAGA,
    REMOVE_EXERCISE_DATA,
    REMOVE_EXERCISE_DATA_SAGA,
    UPLOAD_FILE_IMAGE,
    UPLOAD_FILE_IMAGE_SAGA,
    DELETE_FILE_IMAGE,
    DELETE_FILE_IMAGE_SAGA,
    GET_TIPS_CONTENT,
    GET_TIPS_CONTENT_SAGA,
    UPDATE_TIPS,
    UPDATE_TIPS_SAGA
} from './actionTypes';

import {
    queryExerciseList,
    addExerciseInfo,
    updateExerciseInfo,
    deleteExerciseInfo,
    uploadFileHandle,
    deleteFileHandle,
    queryTipsContentHandle,
    updateTipsContentHandle
} from 'api/exercise';


// 获取数据
function * queryExerciseListHandle (action) {
    let { id, params, vm } = action;
    let retData = null;

    yield queryExerciseList({ params }).then(result => {
        // 结果赋值
        retData = result;

        Toast.clear();
        
        // 更新数据
        if (id) {

            // 在Form表单中运行
            let formData = retData.ex_recoder[0];

            vm.setState({
                formData
            })

            // 把详情更新到页面
            vm.formRef.current.setFieldsValue(formData);

        }

    })
    
    yield put({
        vm: action.vm,
        id: action.id,
        type: GET_EXERCISE_DATA,
        isFirst: action.isFirst,
        data: retData
    })
}


// 新增数据
function * addExerciseInfoHandle (action) {
    let { data, vm } = action;
    let retData = null;

    yield addExerciseInfo({ data }).then(result => {
        // 结果赋值
        retData = result;
        
        // 跳转页面
        vm.props.history.push('/list');
    })
    
    yield put({
        vm: action.vm,
        type: ADD_EXERCISE_DATA,
        data: retData
    })
}


// 更新数据
function * updateExerciseInfoHandle (action) {
    let { id, data, task, vm } = action;
    let retData = null;

    yield updateExerciseInfo({ id, data }).then(result => {

        Toast.clear();

        if (action.task) {
            Toast.show({
                icon: 'success',
                content: '更新成功！'
            })
        } else {            
            // 跳转页面
            vm.props.history.push('/list');
        }

    })
    
    yield put({
        vm,
        type: UPDATE_EXERCISE_DATA,
        id,
        task,
        data
    })
}


// 删除数据
function * deleteExerciseInfoHandle (action) {
    let { id } = action;

    yield deleteExerciseInfo({ id }).then(result => {

        Toast.clear();

        Toast.show({
            icon: 'success',
            content: '删除成功！'
        })

    })
    
    yield put({
        id,
        vm: action.vm,
        type: REMOVE_EXERCISE_DATA
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

        fileList[0].status = 'success';
        fileList[0].name = url.substr(url.lastIndexOf('/') + 1);

        vm.state.formData.exercise_img = url;

        vm.setState({
            formData: vm.state.formData,
            fileList
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


// 读取提示
function * getTipsContentHandle (action) {
    let retData = null;

    yield queryTipsContentHandle().then(result => {
        // 结果赋值
        retData = result;
    })

    yield put({
        type: GET_TIPS_CONTENT,
        data: retData.exmsg[1]
    })
}


// 更新提示
function * editTipsContentHandle (action) {
    let { data, vm } = action;

    yield updateTipsContentHandle({ data }).then(result => {

        // 更新状态
        vm.setState({
            loading: false
        })

        Toast.show({
            icon: 'success',
            content: '更新成功！'
        })

    })

    yield put({
        type: UPDATE_TIPS,
        data
    })
}


function * mySagas () {
    // 获取数据
    yield takeEvery(GET_EXERCISE_DATA_SAGA, queryExerciseListHandle);

    // 新增数据
    yield takeEvery(ADD_EXERCISE_DATA_SAGA, addExerciseInfoHandle);

    // 更新数据
    yield takeEvery(UPDATE_EXERCISE_DATA_SAGA, updateExerciseInfoHandle);

    // 删除数据
    yield takeEvery(REMOVE_EXERCISE_DATA_SAGA, deleteExerciseInfoHandle);

    // 上传文件
    yield takeEvery(UPLOAD_FILE_IMAGE_SAGA, uploadFileHandleHandle);

    // 文件删除
    yield takeEvery(DELETE_FILE_IMAGE_SAGA, deleteFileHandleHandle);

    // 读取提示
    yield takeEvery(GET_TIPS_CONTENT_SAGA, getTipsContentHandle);

    // 更新提示
    yield takeEvery(UPDATE_TIPS_SAGA, editTipsContentHandle);
}


export default mySagas;