import { InboxOutlined, UploadOutlined } from '@ant-design/icons'
import { Empty, Spin, Layout, Form, Input, Upload, Button, message, Col, Select } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { UploadFile } from 'antd/lib/upload/interface'
import {
  requestAddArticle,
  requestAddArticleType,
  requestArticleInfo,
  requestArticleTypeInfo,
  requestArticleTypes,
  requestEditArticle,
  requestEditArticleType,
} from 'api/article'
import * as React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { EmptyReactPops } from 'types/index'
import { ArticleModel, CatalogueModel } from 'types/server'
import { LoadStatus, MB, ResponseCode, WorkType } from 'utils/constants'

interface FormData extends Partial<ArticleModel> {
  img: UploadFile[]
  content: UploadFile[]
}
type UploadFileEvent = {
  file: UploadFile
  fileList: UploadFile[]
}
const { useMemo, useState, useEffect, useCallback } = React
const ArticlePage: React.FC<EmptyReactPops> = function ArticlePage() {
  const { workType } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  // 表单初始数据
  const [formData, setFormData] = useState<FormData>({
    name: '',
    desc: '',
    img: [],
    content: [],
    type: '',
    typeName: '',
  })
  // 页面标题
  const pageTitle = useMemo(() => {
    let title = ''
    if (workType === WorkType.ADD) {
      title = '添加文章'
    } else if (workType === WorkType.EDIT) {
      title = '修改文章'
    } else {
      title = '文章详情'
    }
    return title
  }, [workType])
  // 页面数据加载状态
  const [initStatus, setInitStatus] = useState<LoadStatus>(LoadStatus.LOADING)
  const [form] = useForm()
  // 取消自动上传
  const beforeUploadHandle = useCallback(() => {
    return false
  }, [])
  const normFile = (e: UploadFileEvent) => {
    if (!e.file) {
      return null
    }
    const { size } = e.file
    if (size! < 5 * MB) {
      return e.fileList
    }
    message.error('文件大小过大')
    return null
  }
  // 文章类型选择
  const [articleTypes, setArticleTypes] = useState<CatalogueModel[]>([])
  // 提交处理
  const submitHandle = useCallback(async () => {
    const requestData = new FormData()
    const formValue = form.getFieldsValue(true)
    requestData.append('name', formValue.name || '')
    requestData.append('desc', formValue.desc || '')
    requestData.append('type', formValue.type || '')
    requestData.append('typeName', formValue.typeName || '')
    requestData.append('uuid', formValue.uuid || '')
    if (form.isFieldTouched('img')) {
      requestData.append('imgFile', formValue.img[0].originFileObj!)
    }
    if (form.isFieldTouched('content')) {
      requestData.append('contentFile', formValue.content[0].originFileObj!)
    }
    setInitStatus(LoadStatus.LOADING)
    const requestFunc = workType === WorkType.ADD ? requestAddArticle : requestEditArticle
    const result = await requestFunc(requestData)
    if (result.code === ResponseCode.SUCCESS) {
      message.success('提交成功！')
    } else {
      message.error(result.msg)
    }
    setInitStatus(LoadStatus.SUCCESS)
  }, [form, workType])
  // 当工作页面类型切换时，展示加载效果
  useEffect(() => {
    setInitStatus(workType === WorkType.ADD ? LoadStatus.SUCCESS : LoadStatus.LOADING)
    if (workType !== WorkType.ADD) {
      requestArticleInfo(searchParams.get('id')!).then((res) => {
        const { code, data, msg } = res
        if (code === ResponseCode.SUCCESS) {
          setFormData({
            ...data,
            img: [
              {
                uid: '-1',
                url: data.imgURL,
                name: `文章展示图${data.imgURL?.replace(/.*(?=\.)/g, '')}`,
              },
            ],
            content: [
              {
                uid: '0',
                url: data.contentURL,
                name: `文章文件${data.contentURL?.replace(/.*(?=\.)/g, '')}`,
              },
            ],
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
    if (workType !== WorkType.VIEW) {
      requestArticleTypes().then((res) => {
        if (res.code === ResponseCode.SUCCESS) {
          setArticleTypes(res.data)
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
                label="文章标题"
                name="name"
                required
                rules={[
                  {
                    required: true,
                    message: '请输入文章标题',
                  },
                ]}
              >
                {workType === WorkType.VIEW ? <div>{formData.name}</div> : <Input maxLength={50} showCount />}
              </Form.Item>
              <Form.Item
                label="文章简介"
                name="desc"
                required
                rules={[
                  {
                    required: true,
                    message: '请输入文章简介',
                  },
                ]}
              >
                {workType === WorkType.VIEW ? <div>{formData.desc}</div> : <Input.TextArea maxLength={100} showCount />}
              </Form.Item>
              <Form.Item
                label="文章类型"
                name="type"
                required
                rules={[
                  {
                    required: true,
                    message: '请选择文章类型',
                  },
                ]}
              >
                {workType === WorkType.VIEW ? (
                  <div>{formData.typeName}</div>
                ) : (
                  <Select>
                    {articleTypes.map((item) => (
                      <Select.Option key={item.uuid} value={item.uuid}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item hidden={workType !== WorkType.VIEW}>
                <div className="grid grid-cols-2">
                  <Form.Item label="点赞数量">
                    <div>{formData.thumbUpCount}</div>
                  </Form.Item>
                  <Form.Item label="评论数量">
                    <div>{formData.commentCount}</div>
                  </Form.Item>
                  <Form.Item label="创建者">
                    <div>{formData.authorName}</div>
                  </Form.Item>
                  <Form.Item label="创建时间">
                    <div>{formData.createdAt}</div>
                  </Form.Item>
                  <Form.Item label="更新时间">
                    <div>{formData.updatedAt}</div>
                  </Form.Item>
                </div>
              </Form.Item>
              <Form.Item
                label="文章展示图片"
                required
                rules={[
                  {
                    required: true,
                    message: '请上传展示图片',
                  },
                ]}
                name="img"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                {workType === WorkType.VIEW ? (
                  <img src={formData.img[0].url} alt="" />
                ) : (
                  <Upload
                    accept="image/*"
                    maxCount={1}
                    disabled={workType === WorkType.VIEW}
                    beforeUpload={beforeUploadHandle}
                    listType="picture"
                  >
                    <Button icon={<UploadOutlined />}>上传图片</Button>
                  </Upload>
                )}
              </Form.Item>
              <Form.Item
                label="文章文件"
                required
                rules={[
                  {
                    required: true,
                    message: '请上传文章文件',
                  },
                ]}
                name="content"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload.Dragger
                  accept=".md"
                  maxCount={1}
                  disabled={workType === WorkType.VIEW}
                  beforeUpload={beforeUploadHandle}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">单击或拖动文件到此区域上传</p>
                  <p className="ant-upload-hint">仅支持最大5MB的md类型文件</p>
                </Upload.Dragger>
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
export default ArticlePage
