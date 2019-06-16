import React from 'react'
import ReactDom from 'react-dom'
import {Row, Col, Checkbox, Button, Input} from 'antd'
import axios from 'axios'
import './user.css'

class UserItem extends React.Component {
    render() {
        return (
            <div>
                <Row type="flex" justify="center" className={"bo-row"}>
                    <Col span={1}>
                        {this.props.index + 1}
                    </Col>
                    <Col span={1}>
                        <Checkbox defaultChecked={this.props.user.coming}
                                  onClick={(e) => this.props.changeComing(e, this.props.user.id)}/>
                    </Col>
                    <Col span={3}>
                        {this.props.user.name}
                    </Col>
                    <Col span={3}>
                        {this.props.user.number}
                    </Col>
                    <Col span={3}>
                        <Button icon="delete" shape={"circle"} type={"primary"} className={"bo-btn"}
                                onClick={() => this.props.deleteUser(this.props.user.id, this.props.index)}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            added: false,
            name: '',
            number: ''
        }
        this.handleAdd = this.handleAdd.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.inputName = this.inputName.bind(this)
        this.inputNumber = this.inputNumber.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.changeComing = this.changeComing.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
    }

    deleteUser(id, index) {
        console.log(id)
        let users = this.state.users
        users.splice(index, 1)
        this.setState({
            users: users
        })
    }

    changeComing(e, id) {
        console.log(e.target.checked)
        console.log(id)
    }

    inputName(event) {
        this.setState({
            name: event.target.value
        })
    }

    handleSubmit() {
        axios.post("http://localhost:8080/lottery_war/api/users", {
            name: this.state.name,
            number: this.state.number
        })
        this.setState({
            added: false
        })
    }

    inputNumber(event) {
        this.setState({
            number: event.target.value
        })
    }

    handleCancel() {
        this.setState({
            added: false
        })
    }

    handleAdd() {
        this.setState({
            added: true
        })
    }

    componentWillMount() {
        axios.get("http://localhost:8080/lottery_war/api/users")
            .then((resp) => {
                this.setState({
                    users: resp.data
                })
            })
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        // axios.get("http://localhost:8080/lottery_war/api/users")
        //     .then((resp) => {
        //         this.setState({
        //             users: resp.data
        //         })
        //     })
    }

    render() {
        const userList = this.state.users.map((user, index) => (
            <UserItem key={user.id} user={user} index={index}
                      changeComing={this.changeComing}
                      deleteUser={this.deleteUser}/>
        ))
        const newUser = this.state.added ? <div>
            <Row type={'flex'} justify={'center'}>
                <Col span={3}>
                    <Input className={'bo-name'} placeholder={'姓名'} onChange={this.inputName}/>
                </Col>
                <Col span={3}>
                    <Input className={'bo-name'} placeholder={'学号'} onChange={this.inputNumber}/>
                </Col>
                <Col span={1}>
                    <Button type={"primary"} onClick={this.handleSubmit}>确定</Button>
                </Col>
                <Col span={1}>
                    <Button onClick={this.handleCancel}>取消</Button>
                </Col>
            </Row>
        </div> : null
        const added = this.state.added ? null : <Row type={'flex'} justify={'center'}>
            <Col span={1}>
                <Button onClick={this.handleAdd} shape={'circle'} type={"primary"} icon={'plus'}/>
            </Col>
        </Row>
        return (
            <div>
                {userList}
                {newUser}
                {added}
            </div>
        )
    }
}

ReactDom.render(
    <App/>,
    document.getElementById('root')
)