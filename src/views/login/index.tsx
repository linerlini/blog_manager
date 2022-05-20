import { Button, Form, Input, Layout, message } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { requestLogin, requestRegister } from 'api/user'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { setUser } from 'store/slices/user_slice'
import { EmptyReactPops } from 'types/index'
import { RequestRegisterBody, UserModel } from 'types/server'
import { ResponseCode } from 'utils/constants'
import { useAppDispatch } from 'utils/hooks'
import { normalizeStr } from 'utils/index'

const registerFormRule = {
  account: [{ required: true, message: 'Please input your account!' }],
  password: [{ required: true, message: 'Please input your password!' }],
  userName: [{ required: true, message: 'Please input your user name!' }],
}
const { useState, useMemo } = React
const LoginPage: React.FC<EmptyReactPops> = function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [form] = useForm()
  const [loginOrRegister, setLoginOrRegister] = useState<'login' | 'register'>('login')
  const switchBoxData = useMemo(() => {
    if (loginOrRegister === 'login') {
      return {
        title: 'Hello Friend!',
        content: 'Enter your personal details and start journey with us',
        buttonText: 'TO REGISTER',
      }
    }
    return {
      title: 'Welcome Back',
      content: 'To keep connected with us please login with your personal info',
      buttonText: 'To Login',
    }
  }, [loginOrRegister])
  const switchLoginOrRegister = () => {
    setLoginOrRegister((oldValue) => (oldValue === 'login' ? 'register' : 'login'))
  }
  const [loading, setLoading] = useState(false)
  const loginSuccessHandle = (data: UserModel) => {
    message.success('登录成功')
    dispatch(setUser(data))
    // todo 跳转
    setTimeout(() => {
      navigate('/work/directory')
    })
  }
  const loginErrorHandle = (msg: string) => {
    message.error(msg || '登录失败，请检查输入信息， 再重试')
  }
  const finishHandle = async (values: RequestRegisterBody) => {
    setLoading(true)
    if (loginOrRegister === 'login') {
      const result = await requestLogin({
        account: values.account,
        password: values.password,
      })
      if (result.code === ResponseCode.SUCCESS) {
        loginSuccessHandle(result.data)
      } else {
        loginErrorHandle(result.msg)
      }
    } else {
      const result = await requestRegister(values)
      if (result.code === ResponseCode.SUCCESS) {
        loginSuccessHandle(result.data)
      } else {
        loginErrorHandle(result.msg)
      }
    }
    setLoading(false)
  }
  return (
    <Layout className="h-screen bg-slate-100 flex justify-center items-center">
      <section className="w-[1000px] h-[600px] rounded-xl shadow-xl flex">
        <section className="w-[400px] p-[50px] shadow-[4px_4px_10px_#d1d9e6] flex flex-col justify-center items-center">
          <div className="text-4xl font-bold mb-8">{switchBoxData.title}</div>
          <div className="text-sm text-gray-600">{switchBoxData.content}</div>
          <Button
            onClick={switchLoginOrRegister}
            shape="round"
            size="large"
            type="primary"
            className="w-[180px] h-[50px_!important] font-bold mt-12"
          >
            {switchBoxData.buttonText}
          </Button>
        </section>
        <section className="flex-1 p-6 flex justify-center flex-col">
          <div className="text-4xl font-bold mb-8">
            {loginOrRegister === 'login' ? 'Sign in to Website' : 'Create Account'}
          </div>
          <Form onFinish={finishHandle} form={form} name="register_form" colon={false} layout="vertical" size="middle">
            <Form.Item
              rules={registerFormRule.account}
              label="Account"
              name="account"
              required
              normalize={normalizeStr}
            >
              <Input placeholder="please input your account" />
            </Form.Item>
            <Form.Item
              rules={registerFormRule.password}
              label="Password"
              name="password"
              required
              normalize={normalizeStr}
            >
              <Input.Password placeholder="please input your password" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: loginOrRegister === 'register',
                  message: 'Please input your user name!',
                },
              ]}
              label="UserName"
              name="userName"
              hidden={loginOrRegister === 'login'}
              required
              normalize={normalizeStr}
            >
              <Input placeholder="please input your user name" />
            </Form.Item>
            <Button
              loading={loading}
              htmlType="submit"
              shape="round"
              size="large"
              type="primary"
              className="w-[180px] h-[50px_!important] font-bold"
            >
              SUBMIT
            </Button>
          </Form>
        </section>
      </section>
    </Layout>
  )
}

export default LoginPage
