import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { Form, Input, Button, Upload, Row, Col } from 'antd';
import { UserOutlined, HomeOutlined, MonitorOutlined, FieldTimeOutlined, MessageOutlined } from '@ant-design/icons';

import ImgPreView from 'components/imgpreview';

// import { queryInterviewList, addInterviewInfo, updateInterviewInfo, uploadFileHandle } from 'api/interview';

import { getInterviewData, addInterviewData, updateInterviewData, uploadFileImage, deleteFileImage } from 'store/actionCreators';

import 'styles/addto.less';


class Addto extends Component {

    constructor (props) {

        super(props);

        this.state = {
            formData: {
                name: '',
                company: '',
                address: '',
                interview_data: '',
                description: '',
                interview_img: ''
            },
            curId: '',
            showModal: false,
            loading: false,
            fileList: [],

            showMask: false,
            curImgSrc: ''
        }

        this.formRef = React.createRef();
    }

    componentDidMount () {
        let parObj = {};
        let paramStr = this.props.location.search.substr(1);
        let parArr = paramStr.split('&');
        parArr.map(item => {
            let key = item.split('=')[0];
            let val = item.split('=')[1];
            parObj[key] = val;
        })
        if (parObj.id) {
            this.setState({
                curId: parObj.id
            })
            this.props.queryInterviewDataItemById(this, parObj.id);
            // this.fetchFormData(parObj.id);
        }
    }

    render () {

        let { showMask, curImgSrc } = this.state;

        return (
            <div className="app-addto">

                <Row>
                    <Col span={8}></Col>
                    <Col span={8} style={{textAlign: 'center'}}>调查小表单</Col>
                    <Col span={8}></Col>
                </Row>
                
                <Form
                    name="normal_login"
                    className="login-form"
                    ref={ this.formRef }
                    initialValues={ this.state.formData }
                    onFinish={ (formData) => { this.onFinish(formData) } }
                >

                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: '请输入您的姓名' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入姓名" />
                    </Form.Item>

                    <Form.Item
                        name="company"
                        rules={[{ required: true, message: '请输入公司名称' }]}
                    >
                        <Input prefix={<HomeOutlined className="site-form-item-icon" />} placeholder="请输入公司" />
                    </Form.Item>

                    <Form.Item
                        name="address"
                        rules={[{ required: true, message: '请输入公司地址' }]}
                    >
                        <Input prefix={<MonitorOutlined className="site-form-item-icon" />} placeholder="请输入地址" />
                    </Form.Item>

                    <Form.Item
                        name="interview_data"
                        rules={[{ required: true, message: '请输入访问时间' }]}
                    >
                        <Input prefix={<FieldTimeOutlined className="site-form-item-icon" />} placeholder="请输入时间" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        rules={[{ required: true, message: '请输入评价信息' }]}
                    >
                        <Input.TextArea prefix={<MessageOutlined className="site-form-item-icon" />} autoSize={{ minRows: 3, maxRows: 6 }} size="large" placeholder="请输入评价" />
                    </Form.Item>

                    <Form.Item
                        name="interview_img"
                        rules={[{ required: true, message: '请上传图片附件' }]}
                    >
                        <Upload
                            action="#"
                            accept=".jpg,.jpeg,.png"
                            listType="picture"
                            fileList={ this.state.fileList }
                            customRequest={ (fileObj) => { this.uploadHandle(fileObj) } }
                            onPreview={ (fileObj) => { this.handlePreview(fileObj) } }
                            onRemove={ (fileObj) => { this.onRemove(fileObj) } }
                        >
                            { this.state.fileList.length < 1 && '+ 上传图片' }
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={ this.state.loading } className="login-form-button">
                            点击提交
                        </Button>
                    </Form.Item>

                </Form>

                { showMask ? <ImgPreView src={ curImgSrc } closeHandle={ () => { this.closeMskHandle() } } /> : '' }

            </div>
        )
    }

    fetchFormData (id) {

        // 请求网络数据
        // queryInterviewList({
        //     params: {
        //         transform: '1',
        //         order: 'id,desc',
        //         filter: 'id,cs,' + id,
        //         page: '1,1'
        //     }
        // }).then(res => {
        //     let formData = res.interview[0];
        //     let fileList = this.state.fileList;
        //     fileList.push({
        //         uid: -1,
        //         name: formData.interview_img.substr(formData.interview_img.lastIndexOf('/') + 1),
        //         thumbUrl: formData.interview_img,
        //         url: formData.interview_img
        //     })
        //     this.setState({
        //         formData
        //     })
        //     this.formRef.current.setFieldsValue(formData);            
        // })
    }

    onRemove (fileObj) {
        let curIndex = -1;
        this.state.fileList.map((item, index) => {
            if (item.uid === fileObj.uid) {
                curIndex = index;
            }
        })

        if (curIndex >= 0) {
            // 删除图片
            let fileUrl = this.state.fileList[curIndex].url;
            let filePath = fileUrl.split('/files/')[1];
            if (filePath) {
                this.props.deleteInterviewImageFile(this, filePath);
            }

            this.state.fileList.splice(curIndex, 1);
            this.state.formData.interview_img = '';
        }

        this.setState({
            formData: this.state.formData,
            fileList: this.state.fileList
        })

        this.formRef.current.resetFields(['interview_img']);
    }

    uploadHandle (updObj) {

        this.props.uploadInterviewImageFile(this, updObj);

        // uploadFileHandle({
        //     data: {
        //         file: updObj.file
        //     }
        // }).then(res => {
        //     let url = res.data.file[0];
        //     let fileList = this.state.fileList;
        //     fileList.push({
        //         uid: updObj.file.uid,
        //         status: 'uploading',
        //         name: updObj.file.name,
        //         thumbUrl: url,
        //         url
        //     })

        //     this.state.formData.interview_img = url;
        //     this.setState({
        //         formData: this.state.formData
        //     })
        // })
    }

    onFinish (formData) {
        
        let imgUrl = this.state.formData.interview_img;

        this.setState({
            formData: {
                ...formData,
                id: this.state.curId,
                interview_img: imgUrl
            },
            loading: true
        })

        let submitData = this.state.formData;

        if (submitData.id) {

            // 更新信息
            this.props.submitInterviewDataItem(this, submitData.id);

            // updateInterviewInfo({
            //     id: submitData.id,
            //     data: submitData
            // }).then(res => {
            //     message.success('更新完成');
            //     this.props.history.push('/datalist');
            // })

        } else {

            // 新增信息
            this.props.submitInterviewDataItem(this);

            // addInterviewInfo({
            //     data: submitData
            // }).then(res => {
            //     message.success('保存成功');
            //     this.props.history.push('/datalist');
            // })

        }
    }

    // 预览图片
    handlePreview (fileObj) {
        this.setState({
            curImgSrc: fileObj.url,
            showMask: true
        })
    }

    // 关闭预览
    closeMskHandle () {
        this.setState({
            showMask: false
        })
    }
}

function mapStateToProps (state) {
    return {};
}

function mapDispatchToActions (dispatch) {
    return {
        // 提交
        submitInterviewDataItem (vm, id) {
            if (id) {
                // 更新
                dispatch(updateInterviewData({
                    vm,
                    id,
                    data: vm.state.formData
                }))
            } else {
                // 保存
                dispatch(addInterviewData({
                    vm,
                    data: vm.state.formData
                }))
            }
        },
        // 查询
        queryInterviewDataItemById (vm, id) {
            dispatch(getInterviewData({
                vm,
                id,
                params: {
                    transform: '1',
                    order: 'id,desc',
                    filter: 'id,cs,' + id,
                    page: '1,1'
                }
            }))

        },
        // 上传
        uploadInterviewImageFile (vm, updObj) {

            let url = updObj.file[0];
            let fileList = vm.state.fileList;

            fileList.push({
                uid: updObj.file.uid,
                status: 'uploading',
                name: updObj.file.name,
                thumbUrl: url,
                url
            })

            vm.state.formData.interview_img = url;

            vm.setState({
                formData: vm.state.formData,
                fileList
            })

            dispatch(uploadFileImage({
                vm,
                updObj,
                data: {
                    file: updObj.file
                }
            }))
        },
        // 删除
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

export default connect(mapStateToProps, mapDispatchToActions)(withRouter(Addto));