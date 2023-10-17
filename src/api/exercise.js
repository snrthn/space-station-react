/**
 * @files 业务相关请求
 * @author yanghuning
 * @date 2021-12-07
 */

import request from './request';

/**
 * 查询 - 日记
 */
export let queryDiaryList = (options = {}) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'edu/api.php/diary',
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
 * 新增 - 日记
 */
export let addDiaryInfo = (options = {}) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'edu/api.php/diary',
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
 * 修改 - 日记
 */
export let updateDiaryInfo = (options = {}) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'edu/api.php/diary/' + options.id,
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
 * 删除 - 日记
 */
export let deleteDiaryInfo = (options = {}) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'edu/api.php/diary/' + options.id,
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
 * 查询 - 数据
 */
export let queryExerciseList = (options = {}) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'edu/api.php/ex_recoder',
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
 * 新增 - 数据
 */
export let addExerciseInfo = (options = {}) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'edu/api.php/ex_recoder',
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
 * 修改 - 数据
 */
export let updateExerciseInfo = (options = {}) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'edu/api.php/ex_recoder/' + options.id,
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
 * 删除 - 数据
 */
export let deleteExerciseInfo = (options = {}) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'edu/api.php/ex_recoder/' + options.id,
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
 * 读取提示 设置
 */
export let queryTipsContentHandle = (options = {}) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'edu/api.php/exmsg?transform=1',
            method: 'get',
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
 * 更新提示 设置
 */
export let updateTipsContentHandle = (options = {}) => {
    return new Promise((resolve, reject) => {
        request({
            url: 'edu/api.php/exmsg/3',
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
 * 上传文件
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
