import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import diaryStyle from './myDiary.less';

import { addDiaryData, updateDiaryData, getDiaryData, removeDiaryData, uploadFileImage } from 'store/actionCreators';

import {
    Form, Button, TextArea, ActionSheet, Modal, ImageUploader, Dialog, Mask,
    List as AntList, PullToRefresh, InfiniteScroll, Toast, Grid, Image
} from 'antd-mobile';

import { UnorderedListOutline, SetOutline, SmileOutline, CloseCircleFill } from 'antd-mobile-icons';
import { sleep } from 'antd-mobile/es/utils/sleep';


class myDiary extends Component {

    constructor (props) {
        super(props);

        this.formRef = React.createRef();
        this.updFile = React.createRef();

        this.state = {
            fileList: [
                // { url: 'https://www.snrthn.com/files/202207/1657905093146_981556.png' },
                // { url: 'https://www.snrthn.com/files/202207/1657905093146_981556.png' },
                // { url: 'https://www.snrthn.com/files/202207/1657905093146_981556.png' },
                // { url: 'https://www.snrthn.com/files/202207/1657905093146_981556.png' },
                // { url: 'https://www.snrthn.com/files/202207/1657905093146_981556.png' }
            ],
            maxCount: 9,
            showImgMask: false,
            uploadLoading: false,
            curImgUrl: '',
            curInfo: {},
            isUpdate: false,
            saveLoading: false,
            listLoading: false,
            showActionSheet: false,
            hasMore: true,
            pageNumber: 1,
            pageSize: 10,
            actionsList: [
                { text: '编辑', key: 'edit', description: '编辑当前日记' },
                { text: '删除', key: 'dele', description: '删除后不可恢复', danger: true }
            ]
        }
    }

    componentDidMount () {
        this.queryDiaryHandle(true);
    }

    render () {

        let { diaryList } = this.props;
        let { fileList, maxCount, curInfo, hasMore, saveLoading, showActionSheet, actionsList, isUpdate, showImgMask, curImgUrl } = this.state;

        return (
            <div className={ diaryStyle['my-diary'] }>
                
                <div className={ diaryStyle['form-data'] }>

                    <Form
                        layout='horizontal'
                        ref={ this.formRef }                        
                        onFinish={(formData) => { this.submitHandle(formData) }}
                        footer={
                            <Button block type='submit' color='primary' loading={ saveLoading } loadingText="请稍候…">
                                { isUpdate ? '更新' : '发布' }
                            </Button>
                        }
                    >
                        <Form.Item name='content' rules={[{ required: true, message: '内容不能为空' }]}>
                            <TextArea
                                placeholder='请输入你想说的…'
                                className={ diaryStyle['form-textarea'] }
                                maxLength={ 500 }
                                rows={ 2 }
                                showCount
                            />
                        </Form.Item>

                        <Form.Item>

                            <Grid columns={ 3 } gap={ 8 }>
                                {
                                    fileList.map((file, index) => {
                                        return (
                                            <Grid.Item className={ diaryStyle['img-grid-wrap'] } key={ index }>
                                                <Image src={ file.url } width={ 100 } height={ 100 } fit='contain' onClick={ (event) => { this.showImgMaskHandle(event, file) } } />
                                                <CloseCircleFill className={ diaryStyle['remove-img'] } color="#ff4400" onClick={ () => { this.removeImgHandle(index) } } />
                                            </Grid.Item>
                                        )
                                    })
                                }
                                {
                                    fileList.length < maxCount &&
                                    <Grid.Item>
                                        <input
                                            multiple
                                            type="file"
                                            accept="image/*"
                                            ref={ this.updFile }
                                            style={{ display: 'none' }}
                                            onChange={ (e) => { this.changeFileHandle(e.target.files) } }
                                        />
                                        <span className={ diaryStyle['upd-btn'] } onClick={ () => { this.clickUpdBtnHandle() } }>+</span>  
                                    </Grid.Item>
                                }
                            </Grid>
                                
                        </Form.Item>

                    </Form>
                    
                </div>

                <div className={ diaryStyle['data-list'] }>

                    <PullToRefresh renderText={ (status) => { return this.renderTextHandle(status) } } onRefresh={ async () => { await this.refreshHandle() } }>
                    
                        <AntList>{ diaryList.map(item => {
                            return (
                                <AntList.Item
                                    key={item.id}
                                    onClick={ ()=> { this.clickItemHandle(item) } }
                                >
                                    <div className={ diaryStyle['list-item-content'] }>{ item.content }</div>
                                    {
                                        item.url &&
                                        <Grid columns={ 3 } gap={ 8 } className={ diaryStyle['list-item-image'] }>
                                            {
                                                JSON.parse(item.url).map((url, index) => {
                                                    return (
                                                        <Grid.Item className={ diaryStyle['img-grid-wrap'] } key={ index }>
                                                            <Image src={ url } width={ 90 } height={ 90 } fit='scale-down' onClick={ (event) => { this.showImgMaskHandle(event, { url }) } } />
                                                        </Grid.Item>
                                                    )
                                                })
                                            }
                                        </Grid>

                                    }
                                    <div className={ diaryStyle['list-item-date'] }>{ item.create_time }</div>
                                </AntList.Item>
                            )
                        }) }</AntList>

                        <InfiniteScroll threshold={ 300 } loadMore={ async () => { await this.loadMoreHandle() } } hasMore={ hasMore } />

                    </PullToRefresh>
                    
                </div>

                <Mask visible={ showImgMask } onMaskClick={ () => this.closeImgMaskHandle() }>
                    <div className={ diaryStyle['mask-img-wrap'] }>
                        <Image src={ curImgUrl } />
                    </div>
                </Mask>

                <ActionSheet
                    visible={ showActionSheet }
                    actions={ actionsList }
                    onAction={ (action) => this.clickActionHandle(action) }
                    onClose={ () => this.toggleSheetHandle(false) }
                />

            </div>
        )
    }

    formatTimeHandle (n) {
        let d = new Date(n);

        let year = String(d.getFullYear());
        let month = String(d.getMonth() + 1).padStart(2, '0');
        let date = String(d.getDate()).padStart(2, '0');
        let hour = String(d.getHours()).padStart(2, '0');
        let minute = String(d.getMinutes()).padStart(2, '0');
        let second = String(d.getSeconds()).padStart(2, '0');
        let currShowDateTime = year + '-' + month + '-' + date + '' + ' ' + hour + ':' + minute + ':' + second;

        return currShowDateTime;
    }

    clickUpdBtnHandle () {
        this.updFile.current.click();
    }

    changeFileHandle (files) {
        let { maxCount } = this.state;
        let tempFiles = Array.from(files);
        let fileList = this.state.fileList;
        let selAllCount = tempFiles.length + fileList.length;

        if (selAllCount > maxCount) {
            console.log(maxCount - fileList.length)
            tempFiles.splice(maxCount - fileList.length);

            Toast.show({
                content: `最多选${maxCount}张，你先了${selAllCount}张`,
                maskClickable: false
            })
        }

        tempFiles.forEach((file) => {
            fileList.push({
                file,
                key: file.lastModified,
                name: file.name,
                type: file.type,
                url: URL.createObjectURL(file)
            });

        });

        this.setState({
            fileList
        })

        this.uploadFileHandle(tempFiles);
    }

    uploadFileHandle (files) {
        console.log(files);

        this.props.uploadImages({
            data: files,
            vm: this
        })
    }

    showImgMaskHandle (event, file) {
        event.stopPropagation();
        this.setState({
            curImgUrl: file.url,
            showImgMask: true
        })
    }

    closeImgMaskHandle () {
        this.setState({
            curImgUrl: '',
            showImgMask: false
        })
    }

    removeImgHandle (index) {
        let fileList = this.state.fileList;

        fileList.splice(index, 1);

        this.setState({
            fileList
        })
    }

    submitHandle (form) {

        let { uploadLoading, saveLoading } = this.state;

        if (uploadLoading) {
            Toast.show({
                content: `图片正在上传中，请稍候…`,
                maskClickable: false
            })
            return;
        }

        if (saveLoading) {
            Toast.show({
                content: `正在提交中，请稍候…`,
                maskClickable: false
            })
            return;
        }

        form.url = JSON.stringify(this.state.fileList.map(item => item.url));

        this.setState({
            saveLoading: true
        })

        let submitData = {
            create_time: this.formatTimeHandle(new Date() * 1),
            ...form
        }

        if (this.state.curInfo.id) {
            this.props.updateDiaryItem({
                id: this.state.curInfo.id,
                data: submitData,
                vm: this
            })
        } else {
            this.props.addDiaryList({
                data: submitData,
                vm: this
            })
        }
    }

    renderTextHandle (status) {
        let statusList = {
            pulling: '用力拉',
            canRelease: '放开我',
            refreshing: '玩命加载中...',
            complete: '加载完事'
        }
        return <div>{ statusList[status] }</div>
    }

    // 下拉刷新回调
    async refreshHandle () {
        this.setState({
            listLoading: true,
            pageNumber: 1
        }, () => {
            this.queryDiaryHandle(true);
        })

        await sleep(500);
    }

    // 加载更多回调
    async loadMoreHandle () {
        console.log(this.state.hasMore)
        if (!this.state.hasMore) return;

        this.queryDiaryHandle(false);

        await sleep(1000);
    }

    // 获取日记
    queryDiaryHandle (isFirst) {

        if (isFirst) {
            this.setState({
                pageNumber: 1
            })
        }

        this.props.queryDiaryList({
            vm: this,
            isFirst: !!isFirst,
            params: {
                transform: '1',
                order: 'id,desc',
                page: (isFirst ? this.state.pageNumber : ++this.state.pageNumber) + ',' + this.state.pageSize
            }
        })
    }

    // 打开、关闭 sheet 列表
    toggleSheetHandle (tag) {
        this.setState({
            showActionSheet: tag
        })
    }

    // 点击弹出回调
    clickItemHandle (item) {
        this.setState({
            curInfo: item
        }, () => {
            this.toggleSheetHandle(true);
        })
    }

    // 关闭弹窗回调
    closeMaskDialogHandle () {
        this.setState({
            showDialog: false
        })
    }

    // 点击列表菜单事件
    clickActionHandle (action) {
        let { key } = action;
        switch(key) {
            case 'edit':
                this.editCurDiaryInfo();
                break;
            case 'dele':
                this.deleteInfoHandle();
                break;
        }

        this.toggleSheetHandle(false);
    }

    // 编辑当前任务
    editCurDiaryInfo () {
        this.setState({
            isUpdate: true,
            fileList: this.state.curInfo.url ? JSON.parse(this.state.curInfo.url).map(item =>  { return { url: item } } ) : []
        })
        this.formRef.current.setFieldsValue(this.state.curInfo);
    }

    // 删除数据
    deleteInfoHandle () {
        Modal.confirm({
            title: '删除提示',
            content: '确定要删除吗？',
            actions: [],
            onConfirm: () => {

                Toast.show({
                    icon: 'loading',
                    content: '处理中…',
                    maskClickable: false,
                    duration: 0
                })

                this.props.deleteDiaryItem({
                    id: this.state.curInfo.id,
                    vm: this
                })
            }
        })
    }
}

function mapStateToProps (state) {
    return {
        diaryList: state.diaryList
    };
}

function mapDispatchToActions (dispatch) {
    return {
        addDiaryList (options) {
            dispatch(addDiaryData(options));
        },
        updateDiaryItem (options) {
            dispatch(updateDiaryData(options));
        },
        queryDiaryList (options) {
            dispatch(getDiaryData(options));
        },
        deleteDiaryItem (options) {
            dispatch(removeDiaryData(options));
        },
        uploadImages (options) {
            dispatch(uploadFileImage(options));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToActions)(withRouter(myDiary));