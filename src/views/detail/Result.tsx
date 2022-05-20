import { Empty, Spin, Layout, Form, Input, Button, message } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { requestAddResult, requestEditResult, requestResultInfo } from 'api/result'
import * as React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { EmptyReactPops } from 'types/index'
import { ProfileResultModel } from 'types/server'
import { isUrl, normalizeStr } from 'utils/index'
import { LoadStatus, ResponseCode, WorkType } from 'utils/constants'

const { useMemo, useState, useEffect, useCallback } = React
const ResultPage: React.FC<EmptyReactPops> = function ArticlePage() {
  const { workType } = useParams()
  const [searchParams] = useSearchParams()
  // 表单初始数据
  const [formData, setFormData] = useState<Partial<ProfileResultModel>>({
    name: '',
    desc: '',
    showAddress: '',
    respository: '',
  })
  // 校验地址
  const validator = useCallback((_: any, value: string) => {
    if (!value) {
      return Promise.resolve()
    }
    if (isUrl(value)) {
      return Promise.resolve()
    }
    return Promise.reject(new Error('输入信息不匹配URL格式'))
  }, [])
  // 页面标题
  const pageTitle = useMemo(() => {
    let title = ''
    if (workType === WorkType.ADD) {
      title = '添加项目'
    } else if (workType === WorkType.EDIT) {
      title = '修改项目'
    } else {
      title = '项目详情'
    }
    return title
  }, [workType])
  // 页面数据加载状态
  const [initStatus, setInitStatus] = useState<LoadStatus>(LoadStatus.LOADING)
  const [form] = useForm()
  // 提交处理
  const submitHandle = useCallback(
    async (formValue: Partial<ProfileResultModel>) => {
      setInitStatus(LoadStatus.LOADING)
      const uuid = form.getFieldValue('uuid')
      const requestFunc = workType === WorkType.ADD ? requestAddResult : requestEditResult
      const result = await requestFunc({
        ...formValue,
        uuid,
      })
      if (result.code === ResponseCode.SUCCESS) {
        message.success('提交成功！')
      } else {
        message.error(result.msg)
      }
      setInitStatus(LoadStatus.SUCCESS)
    },
    [form, workType],
  )
  // 当工作页面类型切换时，展示加载效果
  useEffect(() => {
    setInitStatus(workType === WorkType.ADD ? LoadStatus.SUCCESS : LoadStatus.LOADING)
    if (workType !== WorkType.ADD) {
      requestResultInfo(searchParams.get('id')!).then((res) => {
        const { code, data, msg } = res
        if (code === ResponseCode.SUCCESS) {
          setFormData({
            ...data,
          })
          setTimeout(() => {
            form.resetFields()
            setInitStatus(LoadStatus.SUCCESS)
          })
        } else {
          message.error(msg)
          setInitStatus(LoadStatus.ERROR)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, workType])
  return (
    <Layout.Content className="px-[50px] pb-[20px] overflow-y-auto">
      <div className="text-xl font-bold py-[16px]">{pageTitle}</div>
      <Spin size="large" spinning={initStatus === LoadStatus.LOADING}>
        <div className="rounded-lg min-h-[600px] bg-white relative p-[20px]">
          {initStatus !== LoadStatus.SUCCESS ? (
            <Empty />
          ) : (
            <Form layout="vertical" initialValues={formData} form={form} size="large" onFinish={submitHandle}>
              <Form.Item
                label="项目标题"
                name="name"
                required
                rules={[
                  {
                    required: true,
                    message: '请输入项目标题',
                  },
                ]}
              >
                {workType === WorkType.VIEW ? <div>{formData.name}</div> : <Input maxLength={50} showCount />}
              </Form.Item>
              <Form.Item
                label="项目简介"
                name="desc"
                required
                rules={[
                  {
                    required: true,
                    message: '请输入项目简介',
                  },
                ]}
              >
                {workType === WorkType.VIEW ? <div>{formData.desc}</div> : <Input.TextArea maxLength={100} showCount />}
              </Form.Item>
              <Form.Item>
                <div className="grid grid-cols-2 gap-x-5">
                  <Form.Item
                    label="项目地址"
                    name="showAddress"
                    normalize={normalizeStr}
                    rules={[
                      {
                        validator,
                      },
                    ]}
                  >
                    {workType === WorkType.VIEW ? (
                      <div>{formData.showAddress || '暂无'}</div>
                    ) : (
                      <Input maxLength={200} showCount />
                    )}
                  </Form.Item>
                  <Form.Item label="项目仓库" name="respository" normalize={normalizeStr}>
                    {workType === WorkType.VIEW ? (
                      <div>{formData.respository || '暂无'}</div>
                    ) : (
                      <Input maxLength={200} showCount />
                    )}
                  </Form.Item>
                </div>
              </Form.Item>
              <Form.Item hidden={workType !== WorkType.VIEW}>
                <div className="grid grid-cols-2">
                  <Form.Item label="创建时间">
                    <div>{formData.createdAt}</div>
                  </Form.Item>
                  <Form.Item label="更新时间">
                    <div>{formData.updatedAt}</div>
                  </Form.Item>
                </div>
              </Form.Item>
              <Form.Item hidden={workType === WorkType.VIEW}>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      </Spin>
    </Layout.Content>
  )
}
export default ResultPage
