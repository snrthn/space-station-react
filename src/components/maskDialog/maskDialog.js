import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { Mask, Button, Tag, Image } from 'antd-mobile';

import { CloseOutline, SmileOutline, UserOutline } from 'antd-mobile-icons';

import dialogStyle from './maskdialog.less';


class MaskDialog extends Component {

    constructor (props) {
        super(props);

        this.state = {
            cupIcon: require('assets/images/cup.png')
        }
    }

    render () {
        let { showDialog, title, data } = this.props;
        let { cupIcon } = this.state;

        return (
            <div >
                <Mask visible={ showDialog }>

                    <div className={ dialogStyle['mask-dialog'] }>

                        <div className={ dialogStyle['title'] }>
                            { title }
                            <CloseOutline className={ dialogStyle['close-icon'] } onClick={() => { this.closeHandle() }} />
                        </div>

                        <div className={ dialogStyle['type-list'] }>

                            <div className={ dialogStyle['type-item'] }>
                                <div>
                                    <UserOutline className={ dialogStyle['item-icon'] } fontSize={ 18 } color="#3388ff" />
                                    { data.userName } - { data.dateTime }
                                </div>
                                <div></div>
                            </div>

                            <div className={ dialogStyle['type-item'] }>
                                <div><SmileOutline className={ dialogStyle['item-icon'] } fontSize={ 18 } color="#3388ff" />当前体重：{ data.bodyWeight }Kg</div>
                                <div>{ data.bodyWeight < 45 ? <Tag color='warning'>偏瘦</Tag> : (data.bodyWeight > 80 ? <Tag color='warning'>偏胖</Tag> : <Tag color='#87d068'>正常</Tag>) }</div>
                            </div>

                            {
                                data.typeList && JSON.parse(data.typeList).map((item, index) => {
                                    return (<div className={ dialogStyle['type-item'] }  key={ index }>

                                        <div>                                            
                                            <SmileOutline className={ dialogStyle['item-icon'] } fontSize={ 18 } color="#3388ff" />
                                            { item.type }：{ item.amount + item.unit }
                                            { (item.type === '定量喝水' && item.unit === '杯') && <span className={ dialogStyle['cups-list'] }>{ new Array(item.status).fill(1).map((item, index) => {
                                                return ( <Image className={ dialogStyle['cup-icon'] } key={ index } src={ cupIcon } width={ 18 } height={ 18 } fit="cover" /> );
                                            }) } </span> }
                                        </div>

                                        {
                                            (item.type === '定量喝水' && item.unit === '杯') ?
                                            <div>{ item.status < item.amount ? <Button color="warning" size="mini" onClick={() => { this.taskHandle(item, index) }}>待办</Button> : <Tag color="#87d068">完成</Tag> }</div> :
                                            <div>{ item.status === 0 ? <Button color="warning" size="mini" onClick={() => { this.taskHandle(item, index) }}>待办</Button> : <Tag color="#87d068">完成</Tag> }</div>
                                        }

                                    </div>);
                                })
                            }
                            
                        </div>

                    </div>

                </Mask>
            </div>
        )
    }

    closeHandle () {
        this.props.close();
    }

    taskHandle (item, index) {
        let tempData = JSON.parse(JSON.stringify(this.props.data));
        let tempTypeList = JSON.parse(tempData.typeList);
        let tempItem = JSON.parse(JSON.stringify(item));
        if (tempItem.type === '定量喝水' && tempItem.unit === '杯') {
            tempItem.status++;
        } else {
            tempItem.status = 1;
        }
        tempTypeList.splice(index, 1, tempItem);
        tempData.typeList = JSON.stringify(tempTypeList);
        
        this.props.taskHandle(tempData);
    }
}

export default withRouter(MaskDialog);