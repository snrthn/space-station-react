import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import diaryStyle from './myDiary.less';

import { addDiaryData, updateDiaryData, getDiaryData, removeDiaryData } from 'store/actionCreators';

import {
    Form, Button, TextArea, ActionSheet, Modal,
    List as AntList, PullToRefresh, InfiniteScroll, Toast
} from 'antd-mobile';

import { UnorderedListOutline, SetOutline, SmileOutline } from 'antd-mobile-icons';
import { sleep } from 'antd-mobile/es/utils/sleep';

class myDiary extends Component {

    constructor (props) {
        super(props);

        this.formRef = React.createRef();

        this.state = {
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
        let { curInfo, hasMore, saveLoading, showActionSheet, actionsList, isUpdate } = this.state;

        let curId = curInfo.id;

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
                                maxLength={ 500 }
                                rows={ 2 }
                                showCount
                            />
                        </Form.Item>
                    </Form>
                    
                </div>

                <div className={ diaryStyle['data-list'] }>

                    <PullToRefresh renderText={ (status) => { return this.renderTextHandle(status) } } onRefresh={ async () => { await this.refreshHandle() } }>
                    
                        <AntList>{ diaryList.map(item => {
                            return (
                                <AntList.Item
                                    key={item.id}
                                    title={item.content}
                                    description={item.create_time}
                                    style={{ '--adm-color-weak': '#333333' }}
                                    prefix={<SmileOutline fontSize={30} />}
                                    onClick={ ()=> { this.clickItemHandle(item) } }
                                >
                                </AntList.Item>
                            )
                        }) }</AntList>

                        <InfiniteScroll threshold={ 300 } loadMore={ async () => { await this.loadMoreHandle() } } hasMore={ hasMore } />

                    </PullToRefresh>
                    
                </div>

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

    submitHandle (form) {
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
            isUpdate: true
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
        }
    };
}

export default connect(mapStateToProps, mapDispatchToActions)(withRouter(myDiary));