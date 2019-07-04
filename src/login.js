import React from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import {Button, Form, Input, Icon, Checkbox, message} from "antd";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.post("/lottery_war/login", {
                    name: values.username,
                    pass: values.password,
                    vercode: values.vercode,
                    remember: values.remember
                }, {
                    withCredentials: true
                }).then((resp) => {
                    if (resp.data.code) {
                        message.error(resp.data.msg)
                    } else {
                        message.info("登录成功！")
                        setTimeout(() => {
                            window.location = '/lottery_war'
                        }, 1000)
                    }
                })
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form"
                  style={{width: '300px', paddingTop: '300px', margin: '0 auto'}}>
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
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            type="password"
                            placeholder="密码"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('vercode', {
                        rules: [{required: true, message: '请输入验证码！'}],
                    })(
                        <div>
                            <Input
                                prefix={<Icon type="key" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="验证码" style={{width: '200px', marginRight: '10px'}}/>
                            <img src={'http://localhost:8080/lottery_war/api/vercode'} alt={'vercode'}/>
                        </div>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>记住我</Checkbox>)}
                    <a className="login-form-forgot" href="/lottery_war/forget" style={{float: 'right'}}>
                        忘记密码
                    </a>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                        登录
                    </Button>
                    没有账号？ <a href="/lottery_war/register">现在注册！</a>
                </Form.Item>
            </Form>
        );
    }
}

const Login = Form.create({name: 'login'})(App)

ReactDom.render(
    <Login/>,
    document.getElementById('root')
)