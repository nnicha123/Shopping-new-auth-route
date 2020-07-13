import React from 'react'
import { Form, Input, Button, Checkbox, notification,Menu,Layout } from 'antd';
import './Login.css'
import axios from 'axios';
import LocalStorageService from './services/localStorageService'

function Login() {
    const { Header, Content, Footer } = Layout;
    const layout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 13 },
    };
    const tailLayout = {
        wrapperCol: { offset: 10, span: 10 },
    };
    const onFinish = values => {
        axios.post('http://localhost:8000/users/login', values).then(res => {
            // set token here
            LocalStorageService.setToken(res.data.token)
            notification.success({ message: `Logged in as ${values.username}` })
            window.location.replace('/all')
        }).catch(err => notification.error({ message: 'Username or password incorrect' }))


    };


    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div >
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal">
                    <Menu.Item key="1" onClick={() => {window.location.replace('/register')}}>Register</Menu.Item>
                </Menu>
            </Header>
            <Form className="outerLogin"
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <h3 style={{ textAlign: 'center' }}>Login</h3>
                <br />
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
        </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login
