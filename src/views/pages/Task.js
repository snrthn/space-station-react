import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import {
    Form,
    Input,
    Button,
    DatePicker,
    Picker,
    Toast
} from 'antd-mobile';

import { AddOutline } from 'antd-mobile-icons';

import { addExerciseData, updateExerciseData } from 'store/actionCreators';

class Task extends Component {

    constructor (props) {
        super(props);

        this.formRef = React.createRef();

        this.state = {
            init: true,
            curId: null,
            loading: false,
            showDatePicker: false,
            showTypePicker: false,
            showUnitPicker: false,
            currShowDateTime: '',
            typeColumns: [
                [
                    { label: '仰卧起坐', value: '仰卧起坐' },
                    { label: '做俯卧撑', value: '做俯卧撑' },
                    { label: '就地起蹲', value: '就地起蹲' },
                    { label: '动感单车', value: '动感单车' },
                    { label: '半起仰卧', value: '半起仰卧' },
                    { label: '原地跑步', value: '原地跑步' },
                    { label: '靠墙站立', value: '靠墙站立' },
                    { label: '定量喝水', value: '定量喝水' }
                ]
            ],
            unitColumns: [
                [
                    { label: '个数', value: '个' },
                    { label: '分钟', value: '分' },
                    { label: '杯数', value: '杯' }
                ]
            ],
            typeList: [
                {
                    type: 'type1',
                    amount: 'amount1',
                    unit: 'unit1',
                    showTypePicker: false,
                    showUnitPicker: false
                }
            ]
        }
    }

    initFormData () {
        let formData = this.props.location.state;
        if (formData) {
            // 处理typeList
            let tempTypeList = JSON.parse(formData.typeList);

            let pageForm = {};

            let typeList = tempTypeList.map((item, index) => {

                pageForm['type' + (index + 1)] = [item['type'] === '抑卧起坐' ? '仰卧起坐' : item['type']];
                pageForm['amount' + (index + 1)] = item['amount'];
                pageForm['unit' + (index + 1)] = [item['unit']];

                return {
                    type: 'type' + (index + 1),
                    amount: 'amount' + (index + 1),
                    unit: 'unit' + (index + 1),
                    showTypePicker: false,
                    showUnitPicker: false
                }
            });

            for (let key in formData) {
                if (key !== 'typeList') {
                    pageForm[key] = formData[key];
                }
            }

            if (!formData.id) {
                pageForm.userName = '';
                pageForm.bodyWeight = '';
            } else {
                this.setState({
                    curId: formData.id
                })
            }

            this.setState({
                typeList
            }, () => {
                pageForm.dateTime = new Date(pageForm.dateTime);
                this.formRef.current.setFieldsValue(pageForm);
                
                // 格式化时间
                if (formData.dateTime) this.formatTimeHandle(new Date(formData.dateTime) * 1);
            })
        }
    }

    componentDidMount () {
        this.initFormData();
    }

    render () {
        let { curId, loading, showDatePicker, currShowDateTime, typeColumns, unitColumns, typeList } = this.state;

        return (
            <div className="app-task">
                
                <Form
                    layout="horizontal"
                    ref={ this.formRef }
                    onFinish={(formData) => { this.submitHandle(formData) }}
                    footer={
                        <Button block type="submit" color="primary" loading={ loading } loadingText="正在提交">
                            { curId ? '立即更新' : '提交计划' }
                        </Button>
                    }
                >

                    <Form.Item
                        name="userName"
                        label="姓名"
                        rules={[{ required: true, message: '姓名不能为空' }]}
                    >
                        <Input placeholder="请输入姓名" />
                    </Form.Item>

                    <Form.Item
                        name="bodyWeight"
                        label="体重"
                        rules={[{ required: true, message: '体重不能为空' }]}
                    >
                        <Input placeholder="请输入体重，单位为Kg" />
                    </Form.Item>

                    <Form.Item
                        name="dateTime"
                        label="日期"
                        trigger="onConfirm"
                        onClick={() => { this.setDatePickerHandle(true) }}
                        rules={[{ required: true, message: '日期不能为空' }]}
                    >
                        <DatePicker
                            visible={ showDatePicker }
                            onClose={() => { this.setDatePickerHandle(false) }}
                        >
                            {
                                value => value ? <span>{ currShowDateTime }</span> : <span style={{ color: '#cccccc' }}>请选择日期</span>
                            }
                        </DatePicker>
                    </Form.Item>

                    { typeList.length && typeList.map((item, index) => {
                            return (

                                <div key={ index }>

                                    <div style={{ display: 'flex', 'justifyContent': 'space-between', padding: '8px 16px 8px', margin: '16px 0px 8px', background: '#f8f8f8' }}>
                                        <span>订制任务{ index + 1 }</span>
                                        <Button color='warning' size="mini" disabled={ typeList.length === 1 } onClick={ () => { this.removeCurItem(index) } }>
                                            删除
                                        </Button>
                                    </div>

                                    <Form.Item
                                        name={ item.type }
                                        label="类别"
                                        trigger="onConfirm"
                                        onClick={() => { this.setItemPickerHandle(true, index) }}
                                        rules={[{ required: true, message: '类别不能为空' }]}
                                    >
                                        <Picker
                                            visible={ item.showTypePicker }
                                            columns={ typeColumns }
                                            onCancel={ () => { this.setItemPickerHandle(false, index) } }
                                            onConfirm={ () => { this.setItemPickerHandle(false, index) } }
                                        >
                                            { items => {
                                                if (items.every(item => item === null)) {
                                                    return <span style={{ color: '#cccccc' }}>请选择类别</span>;
                                                } else {
                                                    return items.map(item => item.label);
                                                }
                                            } }
                                        </Picker>
                                    </Form.Item>

                                    <Form.Item
                                        name={ item.amount }
                                        label="量化"
                                        rules={[{ required: true, message: '锻炼量不能为空' }]}
                                    >
                                        <Input placeholder='请输入锻炼量' />
                                    </Form.Item>

                                    <Form.Item
                                        name={ item.unit }
                                        label="单位"
                                        trigger="onConfirm"
                                        onClick={() => { this.setUnitPickerHandle(true, index) }}
                                        rules={[{ required: true, message: '单位不能为空' }]}
                                    >
                                        <Picker
                                            visible={ item.showUnitPicker }
                                            columns={ unitColumns }
                                            onCancel={ () => { this.setUnitPickerHandle(false, index) } }
                                            onConfirm={ () => { this.setUnitPickerHandle(false, index) } }
                                        >
                                            { items => {
                                                if (items.every(item => item === null)) {
                                                    return <span style={{ color: '#cccccc' }}>请选择类别</span>;
                                                } else {
                                                    return items.map(item => item.label);
                                                }
                                            } }
                                        </Picker>
                                    </Form.Item>

                                </div>

                            )
                        })
                    }

                    <Button style={{ margin: '16px', width: 'calc(100% - 32px)' }} block color='primary' fill='outline' onClick={ () => { this.addTaskHandle() } }>
                        <AddOutline style={{ marginRight: '8px' }} />
                        任务追加
                    </Button>

                </Form>
                
            </div>
        )
    }

    formatTimeHandle (n, submit) {
        let type = this.props.location.type;
        let formData = this.props.location.state;
        let d = new Date(n);
        let h = new Date();

        if (this.state.init) {
            if (type === 'copy') {
                d = new Date();
                h = new Date();
            } else if (type === 'edit') {
                d = new Date(n);
                h = new Date(formData.dateTime);
            }
        }

        let year = String(d.getFullYear());
        let month = String(d.getMonth() + 1).padStart(2, '0');
        let date = String(d.getDate()).padStart(2, '0');
        let hour = String(h.getHours()).padStart(2, '0');
        let minute = String(h.getMinutes()).padStart(2, '0');
        let second = String(h.getSeconds()).padStart(2, '0');
        let currShowDateTime = year + '-' + month + '-' + date + '' + ' ' + hour + ':' + minute + ':' + second;

        // 更新时间到组件FormData
        if (this.state.init) {
            if (type === 'copy') {
                this.formRef.current.setFieldsValue({ dateTime: new Date(currShowDateTime) });
            } else if (type === 'edit') {
                // this.formRef.current.setFieldsValue({ dateTime: new Date(currShowDateTime) });
            }

            this.setState({
                init: false
            })
        }

        this.setState({
            currShowDateTime
        })

        return submit ? currShowDateTime : new Date(currShowDateTime);
    }

    setDatePickerHandle (tag) {
        this.setState({
            showDatePicker: tag
        })

        if (!tag) {
            let curVal = this.formRef.current.getFieldValue('dateTime');
            if (curVal) this.formatTimeHandle(new Date(this.formRef.current.getFieldValue('dateTime')) * 1);
        }
    }

    setItemPickerHandle (tag, index) {
        let { typeList } = this.state;
        typeList[index]['showTypePicker'] = tag;

        this.setState({
            typeList
        })
    }

    setUnitPickerHandle (tag, index) {
        let { typeList } = this.state;
        typeList[index]['showUnitPicker'] = tag;

        this.setState({
            typeList
        })
    }

    addTaskHandle () {
        let { typeList } = this.state;
        let len = typeList.length + 1;
        typeList.push({
            type: 'type' + len,
            amount: 'amount' + len,
            unit: 'unit' + len
        })

        this.setState({
            typeList
        })
    }

    removeCurItem (index) {        
        let typeList = this.state.typeList;
        
        if (typeList.length === 1) {
            Toast.show({
                icon: 'fail',
                content: '不能删完',
            });
            return;
        }

        typeList.splice(index, 1);

        let len = typeList.length;
        typeList = new Array(len).fill(null).map((item, index) => {
            return {
                type: 'type' + (index + 1),
                amount: 'amount' + (index + 1),
                unit: 'unit' + (index + 1)
            }
        });

        this.setState({
            typeList
        })

    }

    submitHandle () {

        let formData = JSON.parse(JSON.stringify(this.formRef.current.getFieldValue()));
        
        formData.dateTime = this.formatTimeHandle(new Date(formData.dateTime) * 1, true);

        let { typeList } = this.state;

        formData.typeList = typeList.map((item, index) => {

            let typeKey = 'type' + (index + 1);
            let amountKey = 'amount' + (index + 1);
            let unitKey = 'unit' + (index + 1);

            let type = formData['type' + (index + 1)][0];
            let amount = formData['amount' + (index + 1)];
            let unit = formData['unit' + (index + 1)][0];

            Reflect.deleteProperty(formData, typeKey);
            Reflect.deleteProperty(formData, amountKey);
            Reflect.deleteProperty(formData, unitKey);

            return { type, amount, unit, status: 0 };
        })

        this.setState({
            loading: true
        })

        formData.typeList = JSON.stringify(formData.typeList);

        if (this.state.curId) {
            this.props.updateFormdata({
                id: this.state.curId,
                data: formData,
                vm: this
            })
        } else {
            this.props.saveFormData({
                data: formData,
                vm: this
            })
        }
    }
}

function mapStateToProps (state) {
    return {};
}

function mapDispatchToActions (dispatch) {
    return {
        saveFormData (options) {
            dispatch(addExerciseData(options));
        },
        updateFormdata (options) {            
            dispatch(updateExerciseData(options));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToActions)(withRouter(Task));