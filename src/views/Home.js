import React, { Component, useRef } from 'react';
import { connect } from 'react-redux';

import { NoticeBar, Space, Swiper, Toast, Empty, ErrorBlock, Result, CapsuleTabs, Collapse, FloatingBubble } from 'antd-mobile';
import { MessageFill } from 'antd-mobile-icons';
import SwiperRef from 'antd-mobile/es/components/swiper';

import {
    Form,
    Input,
    Button,
    Dialog,
    TextArea,
    DatePicker,
    Selector,
    Slider,
    Stepper,
  } from 'antd-mobile'

import 'styles/home.less';
import styles from './demo1.less';

import 'utils/demo';

class Home extends Component {

    constructor (props) {
        super(props);

        this.state = {
            pickerVisible: false
        }
    }

    render () {

        const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac']

        const items = colors.map((color, index) => (
            <Swiper.Item key={index}>
                <div
                    className={styles.content}
                    style={{ background: color }}
                    onClick={() => {
                        Toast.show(`你点击了卡片 ${index + 1}`)
                    }}
                >
                {index + 1}
                </div>
            </Swiper.Item>
        ))

        const ref = useRef<SwiperRef>(null);

        const onFinish = (values) => {
            Dialog.alert({
              content: JSON.stringify(values),
            })
        }

        // const [pickerVisible, setPickerVisible] = useState(false);

        return (
            <div className="app-home">
                
                <Space block direction='vertical'>
                    <NoticeBar content='提示' color='error' />
                </Space>

                <Space direction='vertical' block>
                    <Swiper allowTouchMove={true} ref={ref} loop>
                        {items}
                    </Swiper>
                </Space>

                <Collapse accordion>
                    <Collapse.Panel key='1' title='第一项'>
                        <Result status='success' title="操作成功" />
                    </Collapse.Panel>
                    <Collapse.Panel key='2' title='第二项'>
                        <ErrorBlock status='default' />
                    </Collapse.Panel>
                    <Collapse.Panel key='3' title='第三项'>
                        <Empty/>
                    </Collapse.Panel>
                </Collapse>

                <CapsuleTabs>
                    <CapsuleTabs.Tab title='水果' key='fruits'>
                        菠萝
                    </CapsuleTabs.Tab>
                    <CapsuleTabs.Tab title='蔬菜' key='vegetables'>
                        西红柿
                    </CapsuleTabs.Tab>
                    <CapsuleTabs.Tab title='动物' key='animals'>
                        蚂蚁
                    </CapsuleTabs.Tab>
                </CapsuleTabs>

                <Form
                    onFinish={onFinish}
                    footer={
                        <Button block type='submit' color='primary'>
                            提交
                        </Button>
                    }
                    >
                    <Form.Item
                        name='姓名'
                        label='姓名'
                        rules={[{ required: true, message: '姓名不能为空' }]}
                    >
                        <Input placeholder='请输入姓名' />
                    </Form.Item>
                    <Form.Item name='address' label='地址'>
                        <Input placeholder='请输入地址' />
                    </Form.Item>
                    <Form.Item
                        name='birthday'
                        label='生日'
                        trigger='onConfirm'
                        onClick={() => {
                            // setPickerVisible(true)
                            this.setState({
                                pickerVisible: true
                            })
                        }}
                    >
                        <DatePicker
                            // visible={pickerVisible}
                            onClose={() => {
                                // setPickerVisible(true)
                                this.setState({
                                    pickerVisible: false
                                })
                            }}
                        >
                            {value =>
                                value ? dayjs(value).format('YYYY-MM-DD') : '请选择日期'
                            }
                        </DatePicker>
                    </Form.Item>
                    <Form.Item name='favoriteFruits' label='喜爱的水果'>
                        <Selector
                        columns={3}
                        multiple
                        options={[
                            { label: '苹果', value: 'apple' },
                            { label: '橘子', value: 'orange' },
                            { label: '香蕉', value: 'banana' },
                        ]}
                        />
                    </Form.Item>
                    <Form.Item name='slider-demo' label='滑块选择'>
                        <Slider ticks step={10} />
                    </Form.Item>
                    <Form.Item name='stepper-demo' label='数量'>
                        <Stepper />
                    </Form.Item>
                    <Form.Item name='disabledField' label='禁用' disabled>
                        <Input placeholder='禁止输入' />
                    </Form.Item>
                </Form>


                <FloatingBubble
                    style={{
                        '--initial-position-bottom': '24px',
                        '--initial-position-right': '24px',
                        // '--edge-distance': '24px',
                    }}
                >
                    <MessageFill fontSize={32} />
                </FloatingBubble>
                
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {};
}

function mapDispatchToActions () {
    return {};
}

export default connect(mapStateToProps, mapDispatchToActions)(Home);