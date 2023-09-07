import React, { Component, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { getExerciseData, updateExerciseData, removeExerciseData } from 'store/actionCreators';

import { List as AntList, PullToRefresh, InfiniteScroll, Toast, ActionSheet, Modal } from 'antd-mobile';

import { UnorderedListOutline } from 'antd-mobile-icons';
import { sleep } from 'antd-mobile/es/utils/sleep';

import MaskDialog from 'components/maskDialog/maskDialog';

// import listStyle from 'styles/list.less';

class List extends Component {

    constructor (props) {
        super(props);

        this.state = {
            loading: true,
            hasMore: true,
            pageNumber: 1,
            pageSize: 10,
            showDialog: false,
            maskData: {},
            showActionSheet: false,
            actionsList: [
                { text: '任务', key: 'task', description: '查看处理当前任务' },
                { text: '复制', key: 'copy', description: '复制当前到新任务' },
                { text: '编辑', key: 'edit', description: '编辑当前任务' },
                { text: '删除', key: 'dele', description: '删除后不可恢复', danger: true }
            ]
        }
    }

    render () {
        let { exerciseList } = this.props;
        let { hasMore, showDialog, maskData, actionsList, showActionSheet } = this.state;
        
        return (
            <div className="app-list">

                <PullToRefresh renderText={ (status) => { return this.renderTextHandle(status) } } onRefresh={ async () => { await this.refreshHandle() } }>
                
                    <AntList>{ exerciseList.map(item => {
                        return (
                            <AntList.Item
                                clickable
                                key={item.id}
                                title={item.userName}
                                description={item.dateTime}
                                style={{ '--adm-color-weak': '#333333' }}
                                prefix={<UnorderedListOutline fontSize={30} />}
                                onClick={ ()=> { this.clickItemHandle(item) } }
                            >
                            </AntList.Item>
                        )
                    }) }</AntList>

                    <InfiniteScroll threshold={ 300 } loadMore={ async () => { await this.loadMoreHandle() } } hasMore={ hasMore } />

                </PullToRefresh>

                <MaskDialog showDialog={ showDialog } title="任务详情" data={ maskData } taskHandle={ (data) => { this.updateTaskHandle(data) } } close={ () => { this.closeMaskDialogHandle() } } />

                <ActionSheet
                    visible={ showActionSheet }
                    actions={ actionsList }
                    onAction={ (action) => this.clickActionHandle(action) }
                    onClose={ () => this.toggleSheetHandle(false) }
                />
                
            </div>
        )
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

        Toast.show({
            icon: 'loading',
            content: '加载中…',
            maskClickable: false,
            duration: 0
        })

        this.setState({
            loading: true,
            pageNumber: 1
        }, () => {
            this.props.queryExerciseList({
                vm: this,
                isFirst: true,
                params: {
                    transform: '1',
                    order: 'id,desc',
                    page: this.state.pageNumber + ',' + this.state.pageSize
                }
            })
        })

        await sleep(500);
    }

    // 加载更多回调
    async loadMoreHandle () {
        this.props.queryExerciseList({
            vm: this,
            isFirst: false,
            params: {
                transform: '1',
                order: 'id,desc',
                page: ++this.state.pageNumber + ',' + this.state.pageSize
            }
        })

        await sleep(1000);
    }

    // 点击列表菜单事件
    clickActionHandle (action) {
        let { key } = action;
        switch(key) {
            case 'task':
                this.setState({
                    showDialog: true
                })
                break;
            case 'copy':
                this.copyCurTaskInfo();
                break;
            case 'edit':
                this.editCurTaskInfo();
                break;
            case 'dele':
                this.deleteInfoHandle();
                break;
        }

        this.toggleSheetHandle(false);
    }

    // 复制当前任务
    copyCurTaskInfo () {
        Modal.confirm({
            title: '任务提示',
            content: '当前任务将被复制到一个新任务，确定要执行吗？',
            actions: [],
            onConfirm: () => {
                let formData = JSON.parse(JSON.stringify(this.state.maskData));
                Reflect.deleteProperty(formData, 'id');
                this.props.history.push({
                    pathname: '/task',
                    state: formData,
                    type: 'copy'
                })
            }
        })
    }

    // 编辑当前任务
    editCurTaskInfo () {
        let formData = JSON.parse(JSON.stringify(this.state.maskData));
        this.props.history.push({
            pathname: '/task',
            state: formData,
            type: 'edit'
        })
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

                this.props.deleteExerciseItem({
                    id: this.state.maskData.id,
                    vm: this
                })
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
            maskData: item
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

    // 更新页面任务
    updateTaskHandle (data) {
        Toast.show({
            icon: 'loading',
            content: '处理中…',
            maskClickable: false,
            duration: 0
        })

        let curId = data.id;

        Reflect.deleteProperty(data, 'id');
        
        this.props.updateExerciseItem({
            vm: this,
            id: curId,
            task: true,            
            data
        })
    }

    componentDidMount () {

        Toast.show({
            icon: 'loading',
            content: '加载中…',
            maskClickable: false,
            duration: 0
        })

        this.props.queryExerciseList({
            vm: this,
            isFirst: true,
            params: {
                transform: '1',
                order: 'id,desc',
                page: this.state.pageNumber + ',' + this.state.pageSize
            }
        })
    }
}

function mapStateToProps (state) {
    return {
        exerciseList: state.exerciseList
    };
}

function mapDispatchToActions (dispatch) {
    return {
        queryExerciseList (options) {
            dispatch(getExerciseData(options));
        },
        updateExerciseItem (options) {
            dispatch(updateExerciseData(options));
        },
        deleteExerciseItem (options) {
            dispatch(removeExerciseData(options));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToActions)(withRouter(List));