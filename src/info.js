import React from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import {Button, Row, Col} from "antd";

let url = 'http://localhost:8080/lottery_war'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {}
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        window.location = url + '/api/download?d=' + this.state.info.fileName
    }

    componentWillMount() {
        axios.get(url + '/test')
            .then((resp) => {
                this.setState({
                    info: resp.data
                })
            })
    }

    render() {
        return (
            <div>
                <Row type={'flex'} justify={'center'} align={'middle'}>
                    <Col span={1} style={{textAlign: 'center'}}>
                        <img src={'http://localhost:8080/lottery_war/' + this.state.info.fileName} style={{width: '50px',
                            height: '50px'}} alt={'head'}/>
                    </Col>
                    <Col span={2} style={{textAlign: 'center'}}>
                        <Button type={"primary"} shape={"round"} icon={'download'}
                                onClick={this.handleClick}>下载头像</Button>
                    </Col>
                </Row>
                <Row type={'flex'} justify={'center'} align={'middle'}>
                    <Col span={1} style={{textAlign: 'center'}}>
                        昵称
                    </Col>
                    <Col span={2} style={{textAlign: 'center'}}>
                        {this.state.info.name}
                    </Col>
                </Row>
                <Row type={'flex'} justify={'center'} align={'middle'}>
                    <Col span={1} style={{textAlign: 'center'}}>
                        性别
                    </Col>
                    <Col span={2} style={{textAlign: 'center'}}>
                        {this.state.info.gender}
                    </Col>
                </Row>
                <Row type={'flex'} justify={'center'} align={'middle'}>
                    <Col span={1} style={{textAlign: 'center'}}>
                        手机号
                    </Col>
                    <Col span={2} style={{textAlign: 'center'}}>
                        {this.state.info.phone}
                    </Col>
                </Row>
            </div>
        )
    }
}

ReactDom.render(
    <App/>,
    document.getElementById('root')
)