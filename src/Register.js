import React from 'react'
import { Form, Input, Button, Checkbox, notification,Menu,Layout } from 'antd';
import './Register.css'
import axios from 'axios'

function Register() {
    const { Header, Content, Footer } = Layout;
    const layout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 13 },
    };
    const tailLayout = {
        wrapperCol: { offset: 10, span: 10 },
    };
    const onFinish = values => {
        console.log('Success:', values);
        axios.post('http://localhost:8000/users/register', values).then((res) => console.log(res))
        notification.success({ message: 'User successfully created!' })
        window.location.replace('/')
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" onClick={() => { window.location.replace('/') }}>Login</Menu.Item>
                </Menu>
            </Header>

            <Form className="outerRegister"
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <h3 style={{ textAlign: 'center' }}>Register</h3>
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
                <Form.Item
                    label="Name"
                    name="name">
                    <Input />
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

export default Register
