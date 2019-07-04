import React from 'react'
import ReactDom from 'react-dom'
import {Row, Col, Select, Input, Button, Tag} from 'antd'
import axios from 'axios'

const {Option} = Select

function ListItem(props) {
    return (
        <Col span={3} style={{textAlign: 'center'}}><Tag style={{fontSize: '30px', lineHeight: '40px'}}>
            {props.user.name}</Tag></Col>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            currentAward: '一等奖',
            num: 1
        }
        this.changeValue = this.changeValue.bind(this)
        this.lottery = this.lottery.bind(this)
        this.inputNum = this.inputNum.bind(this)
    }

    inputNum(e) {
        this.setState({
            num: e.target.value
        })
    }

    lottery() {
        axios.post("http://localhost:8080/lottery_war/api/lottery", {
            awards: this.state.currentAward,
            num: this.state.num
        }).then((resp) => {
            this.setState({
                users: resp.data
            })
        })
    }

    changeValue(value) {
        this.setState({
            currentAward: value
        })
    }

    render() {
        var lists = []
        for (let i = 0; i < this.state.users.length;) {
            let list = []
            for (let j = 0; j < 3 && i < this.state.users.length; j++, i++) {
                list[list.length] = this.state.users[i]
            }
            lists[lists.length] = list
        }
        const listItems = lists.map(function (list, index) {
            let lis = list.map(li => (
                <ListItem key={li.number} user={li}/>
            ))
            return (
                <Row key={index} type={'flex'} justify={'center'} style={{marginTop: '15px'}}>
                    {lis}
                </Row>
            )
        })
        return (
            <div>
                <Row type={'flex'} justify={'center'} gutter={16}>
                    <Col span={2}>
                        <div style={{fontSize: 16}}>
                            奖项
                        </div>
                    </Col>
                    <Col span={2}>
                        <div style={{fontSize: 16}}>
                            人数
                        </div>
                    </Col>
                    <Col span={1}></Col>
                </Row>
                <Row type={"flex"} align={'middle'} justify={'center'} gutter={16}>
                    <Col span={2}>
                        <Select defaultValue={'一等奖'} style={{width: "100%"}} onChange={this.changeValue}>
                            <Option value={'一等奖'}>一等奖</Option>
                            <Option value={'二等奖'}>二等奖</Option>
                        </Select>
                    </Col>
                    <Col span={2}>
                        <Input placeholder={'人数'} defaultValue={1} onChange={this.inputNum.bind(this)}/>
                    </Col>
                    <Col span={1}>
                        <Button type={"primary"} onClick={this.lottery}>抽奖</Button>
                    </Col>
                </Row>
                {listItems}
            </div>
        )
    }
}

ReactDom.render(
    <App/>,
    document.getElementById('root')
)