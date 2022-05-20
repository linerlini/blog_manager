import { InboxOutlined } from '@ant-design/icons'
import { Empty, Spin, Layout, Form, Input, Upload, Button, message, Col } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { UploadFile } from 'antd/lib/upload/interface'
import { requestAddArticleType, requestArticleTypeInfo, requestEditArticleType } from 'api/article'
import * as React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { EmptyReactPops } from 'types/index'
import { CatalogueModel } from 'types/server'
import { LoadStatus, MB, ResponseCode, WorkType } from 'utils/constants'

interface FormData extends Partial<CatalogueModel> {
  img: UploadFile[]
}
type UploadFileEvent = {
  file: UploadFile
  fileList: UploadFile[]
}
const { useMemo, useState, useEffect, useCallback } = React
const ArticleTypePage: React.FC<EmptyReactPops> = function ArticlePage() {
  const { workType } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  // 表单初始数据
  const [formData, setFormData] = useState<FormData>({
    name: '1',
    desc: '',
    img: [],
  })
  // 页面标题
  const pageTitle = useMemo(() => {
    let title = ''
    if (workType === WorkType.ADD) {
      title = '添加文章类型'
    } else if (workType === WorkType.EDIT) {
      title = '修改文章类型'
    } else {
      title = '文章类型详情'
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
  // 提交处理
  const submitHandle = useCallback(
    async (formValue: FormData) => {
      const requestData = new FormData()
      requestData.append('name', formValue.name!)
      requestData.append('desc', formValue.desc!)
      requestData.append('uuid', formData.uuid || '')
      if (formData.img[0]?.uid !== formValue.img[0].uid) {
        requestData.append('imgFile', formValue.img[0].originFileObj!)
      }
      setInitStatus(LoadStatus.LOADING)
      const requestFunc = workType === WorkType.ADD ? requestAddArticleType : requestEditArticleType
      const result = await requestFunc(requestData)
      if (result.code === ResponseCode.SUCCESS) {
        message.success('提交成功！')
      } else {
        message.error(result.msg)
      }
      setInitStatus(LoadStatus.SUCCESS)
    },
    [formData.img, formData.uuid, workType],
  )
  // 当工作页面类型切换时，展示加载效果
  useEffect(() => {
    setInitStatus(workType === WorkType.ADD ? LoadStatus.SUCCESS : LoadStatus.LOADING)
    if (workType !== WorkType.ADD) {
      requestArticleTypeInfo(searchParams.get('id')!).then((res) => {
        const { code, data, msg } = res
        if (code === ResponseCode.SUCCESS) {
          setFormData({
            ...data,
            img: [
              {
                uid: '-1',
                url: data.imgURL,
                name: `文章类型展示图${data.imgURL?.replace(/.*(?=\.)/g, '')}`,
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
                label="文章分类标题"
                name="name"
                required
                rules={[
                  {
                    required: true,
                    message: '请输入文章分类标题',
                  },
                ]}
              >
                {workType === WorkType.VIEW ? <div>{formData.name}</div> : <Input maxLength={50} showCount />}
              </Form.Item>
              <Form.Item
                label="文章分类简介"
                name="desc"
                required
                rules={[
                  {
                    required: true,
                    message: '请输入文章分类简介',
                  },
                ]}
              >
                {workType === WorkType.VIEW ? <div>{formData.desc}</div> : <Input.TextArea maxLength={100} showCount />}
              </Form.Item>
              <Form.Item hidden={workType !== WorkType.VIEW}>
                <div className="grid grid-cols-2">
                  <Form.Item label="创建者">
                    <div>{formData.authorName}</div>
                  </Form.Item>
                  <Form.Item label="文章数量">
                    <div>{formData.artilcesCount}</div>
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
                label="文章类型展示图片"
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
                  <Upload.Dragger
                    accept="image/*"
                    maxCount={1}
                    disabled={workType === WorkType.VIEW}
                    beforeUpload={beforeUploadHandle}
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">单击或拖动文件到此区域上传</p>
                    <p className="ant-upload-hint">仅支持最大5MB的图片类型文件</p>
                  </Upload.Dragger>
                )}
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
export default ArticleTypePage
