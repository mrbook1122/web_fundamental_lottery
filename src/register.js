import React from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import {Button, Form, Input, Icon, Checkbox, message, Upload} from "antd";

let url = '/lottery_war'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: ['男'],
            fileName: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.selectGender = this.selectGender.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(info) {
        if (info.file.status === 'done') {
            this.setState({
                fileName: info.file.name
            })
        }
    }

    selectGender(e) {
        this.setState({
            gender: [e.target.value]
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.post(url + '/register', {
                    name: values.username,
                    pass: values.password,
                    phone: values.phoneNumber,
                    gender: this.state.gender[0],
                    fileName: this.state.fileName
                }).then((resp) => {
                        if (resp.data.code === 1) {
                            message.warning(resp.data.msg)
                        } else if (resp.data.code === 200) {
                            message.info('注册成功！')
                            setTimeout(() => {
                                window.location = url + '/login';
                            }, 1000)
                        }
                    }
                )
            }
        });
    };

    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form"
                  style={{width: '300px', paddingTop: '200px', margin: '0 auto'}}>
                <Form.Item style={{textAlign: 'center', fontSize: '40px'}}>
                    注册
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: '请输入用户名！'},
                            {min: 3, message: '用户名必须大于2个字符'}],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="用户名"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <span style={{marginRight: '15px'}}>
                        性别
                    </span>
                    <Checkbox.Group value={this.state.gender}>
                        <Checkbox onChange={this.selectGender.bind(this)} value={'男'}>
                            <Icon type="man"/>
                        </Checkbox>
                        <Checkbox onChange={this.selectGender.bind(this)} value={'女'}>
                            <Icon type="woman"/>
                        </Checkbox>
                    </Checkbox.Group>
                </Form.Item>
                <Form.Item>
                    <span style={{marginRight: '15px'}}>
                        头像
                    </span>
                    <Upload action={'http://localhost:8080/lottery_war/api/upload'} onChange={this.handleChange}
                            accept={'image/*'}>
                        <Button><Icon type={'upload'}/>点击上传头像</Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('phoneNumber', {
                        rules: [{required: true, message: '请输入手机号！'},
                            {pattern: '^[1][0-9]{10}$', message: '请输入正确格式的手机号！'}],
                    })(
                        <Input
                            prefix={<Icon type="phone" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="手机号"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码！'}],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type="password"
                            placeholder="密码"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password2', {
                        rules: [{required: true, message: '请输入密码！'},
                            {pattern: '^' + getFieldValue('password') + '$', message: '两次输入不一致！'}],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type="password"
                            placeholder="确认密码"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                        注册
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const Register = Form.create({name: 'register'})(App)

ReactDom.render(
    <Register/>,
    document.getElementById('root')
)