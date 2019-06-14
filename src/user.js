import React from 'react'
import ReactDom from 'react-dom'
import {Row, Col, Checkbox, Button} from 'antd'

class UserItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: "hidden"
        }
        this.handle = this.handle.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
    }

    handle() {
        console.log('ddddd')
        this.setState({
            visible: "visible"
        })
    }

    handleMouseLeave() {
        this.setState({
            visible: "hidden"
        })
    }

    render() {
        return (
            <div>
                <Row onMouseMove={this.handle} onMouseLeave={this.handleMouseLeave}>
                    <Col span={2}>
                        <Checkbox/>
                    </Col>
                    <Col span={10}>
                        Mrbook
                    </Col>
                    <Col span={10}>
                        201713160
                    </Col>
                    <Col span={2}>
                        <Button icon="delete" shape={"circle"} type={"primary"} style={{visibility: this.state.visible}}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <UserItem/>
            </div>
        )
    }
}

ReactDom.render(
    <App/>,
    document.getElementById('root')
)