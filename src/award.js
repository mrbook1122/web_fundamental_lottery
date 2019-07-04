import React from 'react'
import ReactDom from 'react-dom'
import {Row, Col} from 'antd'
import axios from 'axios'

class Item extends React.Component {
    render() {
        return (
            <Row type={'flex'} justify={'center'} align={'middle'} gutter={16} style={{lineHeight: '40px'}}>
                <Col span={1} style={{textAlign: 'center'}}>{this.props.index + 1}</Col>
                <Col span={2} style={{textAlign: 'center'}}>{this.props.list.award}</Col>
                <Col span={1} style={{textAlign: 'center'}}>{this.props.list.num}</Col>
                <Col span={2} style={{textAlign: 'center'}}>{this.props.list.date}</Col>
            </Row>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: []
        }
    }

    componentWillMount() {
        axios.get("http://localhost:8080/lottery_war/api/record")
            .then((resp) => {
                this.setState({
                    lists: resp.data
                })
            })
    }

    render() {
        const lists = this.state.lists.map((list, index) => (
            <Item key={list.id} list={list} index={index}/>
        ))
        return (
            <div>
                <Row type={'flex'} justify={'center'} align={'middle'} gutter={16} style={{lineHeight: '40px'}}>
                    <Col span={1} style={{textAlign: 'center'}}>序号</Col>
                    <Col span={2} style={{textAlign: 'center'}}>奖项</Col>
                    <Col span={1} style={{textAlign: 'center'}}>人数</Col>
                    <Col span={2} style={{textAlign: 'center'}}>时间</Col>
                </Row>
                {lists}
            </div>
        )
    }
}

ReactDom.render(
    <App/>,
    document.getElementById('root')
)