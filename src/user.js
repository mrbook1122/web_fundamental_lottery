import React from 'react'
import ReactDom from 'react-dom'
import {Row, Col, Checkbox, Button, Input, message} from 'antd'
import axios from 'axios'
import './user.css'

class UserItem extends React.Component {
    render() {
        return (
            <div>
                <Row type="flex" justify="center" className={"bo-row"} style={{height: 40}} align={'middle'}>
                    <Col span={1} style={{textAlign: "center"}}>
                        {this.props.index + 1}
                    </Col>
                    <Col span={2} style={{textAlign: "center"}}>
                        <Checkbox defaultChecked={this.props.user.coming}
                                  onClick={(e) => this.props.changeComing(e, this.props.user.id)}/>
                    </Col>
                    <Col span={2} style={{textAlign: "center"}}>
                        {this.props.user.name}
                    </Col>
                    <Col span={2} style={{textAlign: "center"}}>
                        {this.props.user.number}
                    </Col>
                    <Col span={1} style={{textAlign: "center"}}>
                        <Button icon="delete" shape={"circle"} type={"primary"} className={"bo-btn"}
                                onClick={() => this.props.deleteUser(this.props.user.number, this.props.index)}/>
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

    deleteUser(number, index) {
        axios.post("http://localhost:8080/lottery_war/api/user/delete", {
            number: number
        })
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
            .then((resp) => {
                console.log(resp.data)
                if (resp.data.code === 100) {
                    message.warning(resp.data.msg)
                } else {
                    let users = this.state.users
                    users[users.length] = {
                        coming: true,
                        id: users.length,
                        name: this.state.name,
                        number: this.state.number
                    }
                    this.setState({
                        users: users,
                        added: false
                    })
                }
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

    render() {
        const userList = this.state.users.map((user, index) => (
            <UserItem key={index} user={user} index={index}
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
        // const error = this.state.error ? <Row type={'flex'} justify={'center'} style={{marginTop: 20}}>
        //     <Col span={3}>
        //         <Alert message={'学号已存在'} type={"error"}/>
        //     </Col></Row> : null
        return (
            <div>
                <Row style={{height: 40}} type={'flex'} justify={'center'} align={'middle'}>
                    <Col span={1} style={{textAlign: "center"}}>
                        序号
                    </Col>
                    <Col span={2} style={{textAlign: "center"}}>
                        是否参与抽奖
                    </Col>
                    <Col span={2} style={{textAlign: "center"}}>
                        姓名
                    </Col>
                    <Col span={2} style={{textAlign: "center"}}>
                        学号
                    </Col>
                    <Col span={1}></Col>
                </Row>
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