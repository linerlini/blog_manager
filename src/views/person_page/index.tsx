import { PlusSquareOutlined } from '@ant-design/icons'
import { Button, Drawer, Form, Input, message, Upload } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { UploadFile } from 'antd/lib/upload/interface'
import { requestUploadAvatar, reuestEditUserInfo } from 'api/user'
import * as React from 'react'
import { selectUser, updateUser } from 'store/slices/user_slice'
import { EmptyReactPops } from 'types/index'
import { UserModel } from 'types/server'
import { ResponseCode } from 'utils/constants'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

const { useState, useEffect, useCallback } = React
const PersonalPage: React.FC<EmptyReactPops> = function PersonalPage() {
  const userInfo = useAppSelector(selectUser)
  const [avatar, setAvatar] = useState<UploadFile[]>([])
  const dispatch = useAppDispatch()
  useEffect(() => {
    // eslint-disable-next-line prefer-destructuring
    const imgURL = userInfo.imgURL
    if (imgURL) {
      setAvatar([
        {
          url: imgURL,
          uid: '-1',
          name: '头像',
        },
      ])
    }
  }, [userInfo.imgURL])
  const customRequest = React.useCallback(async ({ file }) => {
    const formData = new FormData()
    formData.append('avatar', file)
    const result = await requestUploadAvatar(formData)
    if (result.code === ResponseCode.SUCCESS) {
      const newImgURL = result.data
      dispatch(updateUser({ imgURL: newImgURL }))
      message.success('头像已更新')
    } else {
      message.error(result.msg)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [form] = useForm<UserModel>()
  const [drawerVisible, setDrawerVisible] = useState(false)
  const changeDrawerVisible = useCallback(() => {
    setDrawerVisible((oldValue) => !oldValue)
  }, [])
  const submitForm = useCallback(() => {
    form.submit()
  }, [form])
  const formFinishHandle = async () => {
    const formValues = form.getFieldsValue(true)
    const requestData = (['name', 'desc', 'status'] as Array<keyof UserModel>).reduce((result, item) => {
      if (form.isFieldTouched(item)) {
        // eslint-disable-next-line no-param-reassign
        result[item] = formValues[item]
      }
      return result
    }, {} as Partial<UserModel>)
    const result = await reuestEditUserInfo(requestData)
    if (result.code === ResponseCode.SUCCESS) {
      dispatch(updateUser(requestData))
      message.success('保存成功')
      changeDrawerVisible()
    } else {
      message.error(result.msg)
    }
  }
  return (
    <div className="bg-white rounded-xl h-full p-5">
      <div className="text-4xl font-bold mb-5">个人资料</div>
      <div className="flex flex-nowrap">
        <div className="mr-auto text-xl">
          <div className="text-xl">
            <p>用户名</p>
            <p>{userInfo.name}</p>
          </div>
          <div className="">
            <p>账号</p>
            <p>{userInfo.account}</p>
          </div>
          <div className="">
            <p>个人简介</p>
            <p>{userInfo.desc}</p>
          </div>
          <div className="">
            <p>个人状态</p>
            <p className="mb-0">{userInfo.status}</p>
          </div>
        </div>
        <div className="ml-auto flex flex-col">
          <Upload
            action="/user/avatar"
            listType="picture-card"
            fileList={avatar}
            customRequest={customRequest}
            maxCount={1}
            showUploadList={false}
            className="w-full"
          >
            <div>
              {userInfo.imgURL ? (
                <img src={userInfo.imgURL} alt="avatar" style={{ width: '100%' }} />
              ) : (
                <div>
                  <PlusSquareOutlined style={{ fontSize: '20px' }} />
                  <p>上传头像</p>
                </div>
              )}
            </div>
          </Upload>
          <div className="mb-auto text-center">我的头像</div>
          <div className="mt-auto text-center">
            <Button type="primary" onClick={changeDrawerVisible}>
              修改资料
            </Button>
          </div>
        </div>
      </div>
      <Drawer
        title="修改个人资料"
        placement="right"
        closable={false}
        visible={drawerVisible}
        maskClosable={false}
        keyboard={false}
        footer={
          <div className="flex justify-between">
            <Button type="primary" onClick={submitForm}>
              保存
            </Button>
            <Button onClick={changeDrawerVisible}>取消</Button>
          </div>
        }
      >
        <Form
          onFinish={formFinishHandle}
          initialValues={userInfo}
          form={form}
          labelAlign="left"
          size="large"
          className="mr-auto"
          layout="vertical"
        >
          <Form.Item
            label="用户名"
            name="name"
            required
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
            ]}
          >
            <Input maxLength={16} showCount />
          </Form.Item>
          <Form.Item
            label="个人简介"
            name="desc"
            required
            rules={[
              {
                required: true,
                message: '请输入个人简介',
              },
            ]}
          >
            <Input.TextArea maxLength={100} showCount />
          </Form.Item>
          <Form.Item
            label="个人状态"
            name="status"
            style={{ marginBottom: '0px' }}
            required
            rules={[
              {
                required: true,
                message: '请输入个人状态',
              },
            ]}
          >
            <Input.TextArea maxLength={100} showCount />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}

export default PersonalPage
