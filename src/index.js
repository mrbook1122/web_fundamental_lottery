import React from 'react'
import ReactDom from 'react-dom'
import {Row, Col, Select, Input, Button, Tag} from 'antd'

const {Option} = Select

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: ['张三', "张三", "张三", "张三",
                '张三', "张三", "张三", "张三",
                '张三', "张三", "张三", "张三",
                '张三', "张三", "张三", "张三", '张三', "张三", "张三", "张三"]
        }
    }

    render() {
        var lists = []
        for (let i = 0; i < this.state.users.length; ) {
            let list = []
            for (let j = 0; j < 3 && i < this.state.users.length; j++, i++) {
                list[list.length] = this.state.users[i]
            }
            lists[lists.length] = list
        }
        console.log(lists)
        const listItems = lists.map(function (list) {
            let lis = list.map(li => (
                <Col span={8}><Tag>{li}</Tag></Col>
            ))
            return (
                <Row>
                    {lis}
                </Row>
            )
        })
        return (
            <div>
                <Row type={"flex"} align="bottom">
                    <Col span={10}>
                        <div style={{fontSize: 16}}>
                            奖项
                        </div>
                        <Select defaultValue={'一等奖'} size={"large"} style={{width: 160}}>
                            <Option value={'一等奖'}>一等奖</Option>
                            <Option value={'二等奖'}>二等奖</Option>
                        </Select>
                    </Col>
                    <Col span={10}>
                        <div style={{fontSize: 16}}>
                            人数
                        </div>
                        <Input placeholder={'人数'} defaultValue={1} size={"large"} style={{width: 160}}/>
                    </Col>
                    <Col span={4}>
                        <Button type={"primary"} style={{height: "40px"}}>抽奖</Button>
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