import { 
    GET_INTERVIEW_DATA_SAGA,
    ADD_INTERVIEW_DATA_SAGA,
    UPDATE_INTERVIEW_DATA_SAGA,
    REMOVE_INTERVIEW_DATA_SAGA,
    UPLOAD_FILE_IMAGE_SAGA,
    DELETE_FILE_IMAGE_SAGA
} from './actionTypes';


export const getInterviewData = function (options) {
    return {
        type: GET_INTERVIEW_DATA_SAGA,
        params: options.params,
        id: options.id,
        vm: options.vm
    }
};

export const addInterviewData = function (options) {
    return {
        type: ADD_INTERVIEW_DATA_SAGA,
        data: options.data,
        vm: options.vm
    }
};

export const updateInterviewData = function (options) {
    return {
        type: UPDATE_INTERVIEW_DATA_SAGA,
        data: options.data,
        id: options.id,
        vm: options.vm
    }
};

export const removeInterviewData = function (options) {
    return {
        type: REMOVE_INTERVIEW_DATA_SAGA,
        id: options.id,
        vm: options.vm
    }
};

export const uploadFileImage = function (options) {
    return {
        type: UPLOAD_FILE_IMAGE_SAGA,
        data: options.data,
        updObj: options.updObj,
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