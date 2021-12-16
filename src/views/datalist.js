import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import zhCN from 'antd/es/locale/zh_CN';

import { Row, Col, Table, ConfigProvider, Pagination, Space, Button, Popconfirm, Input, message } from 'antd';

import { queryInterviewList, deleteInterviewInfo } from 'api/interview';

import { getInterviewData, removeInterviewData, deleteFileImage } from 'store/actionCreators';

import 'styles/datalist.less';

class Datalist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            columns: [
                {
                    title: 'ID',
                    width: '80px',
                    dataIndex: 'id'
                },
                {
                    title: '姓名',
                    width: '100px',
                    dataIndex: 'name'
                },
                {
                    title: '公司名称',
                    width: '240px',
                    dataIndex: 'company',
                    ellipsis: true
                },
                {
                    title: '公司地址',
                    width: '300px',
                    dataIndex: 'address',
                    ellipsis: true
                },
                {
                    title: '附件',
                    width: '100px',
                    dataIndex: 'interview_img',
                    render: (text, row) => (
                        <Space size="middle">
                            <Button type="link" onClick={ () => { this.showImageHandle(text, row) } }>查看</Button>
                        </Space>
                    )
                },
                {
                    title: '到访时间',
                    width: '200px',
                    dataIndex: 'interview_data',
                    ellipsis: true
                },
                {
                    title: '评价',
                    dataIndex: 'description',
                    ellipsis: true
                },
                {
                    title: '操作',
                    width: '200px',
                    render: (row) => (
                        <Space size="middle">
                            <Button type="primary" onClick={ () => { this.editHandle(row) }}>编辑</Button>
                            <Popconfirm
                                    title="确定要删除吗"
                                    cancelText="取消"
                                    okText="确定"
                                    onConfirm={ () => { this.removeHandle(row) } }
                                >
                                <Button type="primary" danger>删除</Button>
                            </Popconfirm>
                        </Space>
                    )
                }
            ],
            searchKey: '',
            loading: true,
            pageSize: 10,
            pageNum: 1,
            total: 0
        }
    }

    componentDidMount () {
        this.props.fetchInterviewDataList(this);
    }

    render() {
        const { selectedRowKeys, searchKey, columns, pageNum, total, loading } = this.state;

        const { dataList } = this.props;

        const rowSelection = {
            selectedRowKeys,
            onChange: (selVal) => {
                this.onSelectChange(selVal);
            },
            selections: [
                Table.SELECTION_ALL,
                Table.SELECTION_INVERT,
                Table.SELECTION_NONE,
                {
                    key: 'odd',
                    text: '选择奇数行',
                    onSelect: changableRowKeys => {
                        let newSelectedRowKeys = [];
                        newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                            if (index % 2 !== 0) {
                                return false;
                            }
                            return true;
                        });
                        this.setState({ selectedRowKeys: newSelectedRowKeys });
                    },
                },
                {
                    key: 'even',
                    text: '选择偶数行',
                    onSelect: changableRowKeys => {
                        let newSelectedRowKeys = [];
                        newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                            if (index % 2 !== 0) {
                                return true;
                            }
                            return false;
                        });
                        this.setState({ selectedRowKeys: newSelectedRowKeys });
                    }
                }
            ]
        };

        return (
            <div className="app-datalist">

                <Row>
                    <Col span={6} style={{ height: '40px', textAlign: 'left', paddingLeft: '0.5em' }}>
                        <Popconfirm
                                title="确定要删除所选内容吗"
                                cancelText="取消"
                                okText="确定"
                                onConfirm={ () => { this.removeHandlePitch() } }
                            >
                            <Button type="primary" danger>批量删除</Button>
                        </Popconfirm>
                    </Col>
                    <Col span={12}></Col>
                    <Col span={6} style={{ height: '40px', textAlign: 'right', paddingRight: '0.5em' }}>
                        <Input.Search placeholder="请输入关键字" enterButton="搜索" maxLength="16" defaultValue={ searchKey } onSearch={ (val) => { this.searchHandle(val, true) }} />
                    </Col>
                </Row>

                <ConfigProvider locale={zhCN}>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={dataList} loading={loading} pagination={false} />
                </ConfigProvider>

                <Pagination style={{ margin: '16px 8px', textAlign: 'right' }} current={pageNum} total={total} showSizeChanger={false} onChange={ (page, size) => { this.changeClickHandle(page, size) } } />

            </div>
        )
    }

    // 获取数据列表
    fetchDataList () {

        let { pageSize, pageNum, searchKey } = this.state;

        if (searchKey.trim()) {

            this.searchHandle(searchKey.trim());

            return;
        }

        // 发起网络请求
        
        // queryInterviewList({
        //     params: {
        //         transform: '1',
        //         order: 'id,desc',
        //         page: pageNum + ',' + pageSize
        //     }
        // }).then(res => {
        //     let list = res.interview.map(item => {
        //         item.key = item.id;
        //         return item;
        //     })
            
        //     this.setState({
        //         dataList: list,
        //         total: res._results,
        //         loading: false
        //     })
        // })
    }

    // 点击跳转页码
    changeClickHandle (page, size) {
        this.setState({
            pageSize: size,
            pageNum: page
        }, () => {
            // this.fetchDataList();
            this.props.fetchInterviewDataList(this);
        })
    }

    // 点击查看图片
    showImageHandle (text, row) {
        if (!text) {
            message.warning('还没有上传图片');
            return;
        }
        window.open(text, '_blank');
    }

    // 选择复选框
    onSelectChange (selectedRowKeys) {
        this.setState({ selectedRowKeys });
    };

    // 跳转到编辑页面
    editHandle (row) {
        this.props.history.push('/addto?id=' + row.id);
    }

    // 单条删除
    removeHandle (row) {
        // 发起网络请求
        this.props.deleteInterviewDataItem(this, row.id);

        // 删除资源
        let url = row.interview_img;
        let filePath = url.split('/files/')[1];
        if (filePath) {
            this.props.deleteInterviewImageFile(this, filePath);
        }

        // deleteInterviewInfo({
        //     id: row.id
        // }).then(res => {
        //     message.success('删除成功');
        //     this.fetchDataList();
        // })
    }

    // 批量删除
    removeHandlePitch () {

        let { selectedRowKeys } = this.state;

        if (!selectedRowKeys.length) {
            message.warning('请选择删除内容');
            return;
        }

        // 发起网络请求
        this.props.deleteInterviewDataItem(this, selectedRowKeys.join(','));

        // 收集并删除图片      
        let fileUrl = this.props.dataList.filter(item => {
            let imgUrl = item.interview_img;
            let isPath = imgUrl.split('/files/')[1];
            return imgUrl && isPath && (selectedRowKeys.indexOf(item.id) !== -1);
        }).map(item => {
            if (selectedRowKeys.indexOf(item.id) !== -1) {
                return item.interview_img.split('/files/')[1];
            }
        })
        if (fileUrl.length) {
            this.props.deleteInterviewImageFile(this, fileUrl.join(','));
        }

        // deleteInterviewInfo({
        //     id: this.state.selectedRowKeys.join(',')
        // }).then(res => {
        //     message.success('删除成功');
        //     this.fetchDataList();
        // })
    }

    // 点击搜索
    searchHandle (val, isFirst) {

        // if (!val.trim()) {

        //     this.setState({
        //         searchKey: '',
        //         pageSize: 10,
        //         pageNum: 1
        //     }, () => {
        //         this.props.fetchInterviewDataList(this);
        //     })

        //     return;
        // }

        this.setState({
            loading: true,
            searchKey: val,
            pageSize: 10,
            pageNum: isFirst ? 1 : this.state.pageNum
        }, () => {

            let { pageSize, pageNum } = this.state;

            // 发起网络请求
            this.props.fetchInterviewDataList(this);

            // queryInterviewList({
            //     params: {
            //         transform: '1',
            //         order: 'id,desc',
            //         filter: 'name,cs,' + val,
            //         page: pageNum + ',' + pageSize
            //     }
            // }).then(res => {
            //     let list = res.interview.map(item => {
            //         item.key = item.id;
            //         return item;
            //     })
                
            //     this.setState({
            //         dataList: list,
            //         total: res._results,
            //         loading: false
            //     })
            // })

        })
    }
}

function mapStateToProps(state) {
    return {
        dataList: state.dataList
    };
}

function mapDispatchToActions(dispatch) {
    return {
        // 查询
        fetchInterviewDataList (vm) {
            let { pageSize, pageNum, searchKey } = vm.state;

            if (!vm.state.loading) {                
                vm.setState({
                    loading: true
                })
            }

            if (!searchKey.trim()) {                
                dispatch(getInterviewData({
                    vm,
                    params: {
                        transform: '1',
                        order: 'id,desc',
                        page: pageNum + ',' + pageSize
                    }
                }))
            } else {
                dispatch(getInterviewData({
                    vm,
                    params: {
                        transform: '1',
                        order: 'id,desc',
                        filter: 'name,cs,' + searchKey.trim(),
                        page: pageNum + ',' + pageSize
                    }
                }))
            }
        },
        // 删除数据
        deleteInterviewDataItem (vm, ids) {
            dispatch(removeInterviewData({
                vm,
                id: ids
            }))
        },
        // 删除附件
        deleteInterviewImageFile (vm, filepath) {
            dispatch(deleteFileImage({
                vm,
                data: {
                    filepath
                }
            }))
        }
    };
}

export default connect(mapStateToProps, mapDispatchToActions)(withRouter(Datalist));