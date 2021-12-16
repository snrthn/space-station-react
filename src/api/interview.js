/**
 * @files 业务相关请求
 * @author yanghuning
 * @date 2021-12-07
 */

import request from './request';

/**
 * 查询
 */
export let queryInterviewList = (options = {}) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'edu/api.php/interview',
            method: 'get',
            params: options.params || {},
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
        })
    })
}

/**
 * 新增
 */
export let addInterviewInfo = (options = {}) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'edu/api.php/interview',
            method: 'post',
            params: options.params || {},
            data: options.data || {},
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
        })
    })
}

/**
 * 修改
 */
export let updateInterviewInfo = (options = {}) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'edu/api.php/interview/' + options.id,
            method: 'put',
            params: options.params || {},
            data: options.data || {},
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
        })
    })
}

/**
 * 删除
 */
export let deleteInterviewInfo = (options = {}) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'edu/api.php/interview/' + options.id,
            method: 'delete',
            params: options.params || {},
            data: options.data || {},
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
        })
    })
}

/**
 * 上传
 */
export let uploadFileHandle = (options = {}) => {
    return new Promise((resolve, reject) => {
        let formData = new FormData();
        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }
        request({
            url: 'upload',
            method: 'post',
            params: options.params || {},
            data: formData,
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
        })
    })
}

/**
 * 删除文件
 */
export let deleteFileHandle = (options = {}) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'upload/delete',
            method: 'post',
            params: options.params || {},
            data: options.data || {},
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            }
        })
    })
}