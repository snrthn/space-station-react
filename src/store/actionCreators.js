import {
    GET_DIARY_DATA_SAGA,
    ADD_DIARY_DATA_SAGA,
    UPDATE_DIARY_DATA_SAGA,
    REMOVE_DIARY_DATA_SAGA,
    GET_EXERCISE_DATA_SAGA,
    ADD_EXERCISE_DATA_SAGA,
    UPDATE_EXERCISE_DATA_SAGA,
    REMOVE_EXERCISE_DATA_SAGA,
    UPLOAD_FILE_IMAGE_SAGA,
    DELETE_FILE_IMAGE_SAGA,
    GET_TIPS_CONTENT_SAGA,
    UPDATE_TIPS_SAGA
} from './actionTypes';

export const getDiaryData = function (options) {
    return {
        type: GET_DIARY_DATA_SAGA,
        params: options.params,
        isFirst: options.isFirst,
        id: options.id,
        vm: options.vm
    }
};

export const addDiaryData = function (options) {
    return {
        type: ADD_DIARY_DATA_SAGA,
        data: options.data,
        vm: options.vm
    }
};

export const updateDiaryData = function (options) {
    return {
        type: UPDATE_DIARY_DATA_SAGA,
        data: options.data,
        id: options.id,
        task: options.task,
        vm: options.vm
    }
};

export const removeDiaryData = function (options) {
    return {
        type: REMOVE_DIARY_DATA_SAGA,
        id: options.id,
        vm: options.vm
    }
};

export const getExerciseData = function (options) {
    return {
        type: GET_EXERCISE_DATA_SAGA,
        params: options.params,
        isFirst: options.isFirst,
        id: options.id,
        vm: options.vm
    }
};

export const addExerciseData = function (options) {
    return {
        type: ADD_EXERCISE_DATA_SAGA,
        data: options.data,
        vm: options.vm
    }
};

export const updateExerciseData = function (options) {
    return {
        type: UPDATE_EXERCISE_DATA_SAGA,
        data: options.data,
        id: options.id,
        task: options.task,
        vm: options.vm
    }
};

export const removeExerciseData = function (options) {
    return {
        type: REMOVE_EXERCISE_DATA_SAGA,
        id: options.id,
        vm: options.vm
    }
};

export const uploadFileImage = function (options) {
    return {
        type: UPLOAD_FILE_IMAGE_SAGA,
        data: options.data,
        vm: options.vm
    }
};

export const deleteFileImage = function (options) {
    return {
        type: DELETE_FILE_IMAGE_SAGA,
        data: options.data,
        vm: options.vm
    }
};

export const getTipsContentHandle = function (options) {
    return {
        type: GET_TIPS_CONTENT_SAGA,
        data: options
    }
};

export const updateTipsHandle = function (options) {
    return {
        type: UPDATE_TIPS_SAGA,
        data: {            
            message: options.message,
            show: options.show
        },
        vm: options.vm
    }
};