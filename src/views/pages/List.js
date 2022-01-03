import React, { Component, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { getExerciseData, updateExerciseData } from 'store/actionCreators';

import { List as AntList, Collapse, PullToRefresh, InfiniteScroll, Toast } from 'antd-mobile';
// import { Action, SwipeActionRef } from 'antd-mobile/es/components/swipe-action';

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
            maskData: {}
        }
    }

    render () {
        let { exerciseList } = this.props;
        let { hasMore, showDialog, maskData } = this.state;
        
        return (
            <div className="app-list">

                <PullToRefresh renderText={ (status) => { return this.renderTextHandle(status) } } onRefresh={ async () => { await this.refreshHandle() } }>
                
                    <AntList>{ exerciseList.map(item => {
                        return (<AntList.Item
                        clickable
                        key={item.id}
                        title={item.userName}
                        description={item.dateTime}
                        style={{ '--adm-color-weak': '#333333' }}
                        prefix={<UnorderedListOutline fontSize={30} />}
                        onClick={()=>{ this.clickItemHandle(item) }}>

                        </AntList.Item>)
                    }) }</AntList>

                    <InfiniteScroll threshold={ 300 } loadMore={ async () => { await this.loadMoreHandle() } } hasMore={ hasMore } />

                </PullToRefresh>

                <MaskDialog showDialog={ showDialog } title="任务详情" data={ maskData } taskHandle={ (data) => { this.updateTaskHandle(data) } } close={ () => { this.closeMaskDialogHandle() } } />
                
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

    // 点击弹出回调
    clickItemHandle (item) {
        this.setState({
            maskData: item,
            showDialog: true
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
        }
    };
}

export default connect(mapStateToProps, mapDispatchToActions)(withRouter(List));