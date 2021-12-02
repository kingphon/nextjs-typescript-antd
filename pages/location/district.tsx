import React, { FC, useState, useEffect } from 'react'
import { Layout, Checkbox, Table, Modal, Input, Form, Select } from 'antd'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AlignType } from 'rc-table/lib/interface'

import { EditOutlined, InfoCircleOutlined } from '@ant-design/icons'

import SideBar from '../../components/organisms/SideBar'
import ContentHeader from '../../components/organisms/ContentHeader'

const { Header, Content, Footer } = Layout
const { Option } = Select

interface District {
  key?: string
  name: string
  slugName: string
  provinceName?: string
  provinceId?: string
  createDate?: unknown
  status?: boolean
}

const District: FC = () => {
  const [dataTable, setDataTable] = useState<Array<District>>([])
  const [initData, setInitData] = useState<Array<District>>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [customizeSlug, setCustomizeSlug] = useState(false)
  const [district, setDistrict] = useState<District>({ key: '', name: '', slugName: '' })
  const [provinceList, setProvinceList] = useState([])
  const [form] = Form.useForm()
  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      render: (key) => (
        <div
          style={{
            backgroundColor: '#999',
            padding: '0.2rem 0.5rem',
            borderRadius: '100px',
            fontSize: '0.8rem',
            width: '1.6rem',
            height: '1.6rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          {key}
        </div>
      )
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Slug Name',
      dataIndex: 'slugName',
      key: 'slugName'
    },
    {
      title: 'Province Name',
      dataIndex: 'provinceName',
      key: 'provinceName'
    },
    {
      title: 'Create Date',
      dataIndex: 'createDate',
      key: 'createDate',
      align: 'center'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center' as AlignType,
      render: (status) => <Checkbox checked={status === 'ACTIVE'} />
    },
    {
      title: 'Audit',
      dataIndex: 'audit',
      align: 'center' as AlignType,
      render: () => <InfoCircleOutlined onClick={() => showEditModal()} style={{ cursor: 'pointer' }} />
    },
    {
      title: '',
      align: 'center' as AlignType,
      render: ({ key, name, slugName, province }) => (
        <EditOutlined onClick={() => showModal({ key, name, slugName, province })} style={{ cursor: 'pointer' }} />
      )
    }
  ]
  const customizeSlugCheckBox = () => {
    setCustomizeSlug(!customizeSlug)
  }

  const showModal = (data?) => {
    if (data) {
      console.log(data)
      setDistrict(data)
      form.setFieldsValue({ ...data })
    }
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setDistrict({ key: '', name: '', slugName: '' })
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setDistrict({ key: '', name: '', slugName: '' })
    setIsModalVisible(false)
  }

  const handleSelect = (value) => {
    switch (value) {
      case 'active':
        setDataTable(initData.filter((data) => data.status === 'ACTIVE'))
        break
      case 'hidden':
        setDataTable(initData.filter((data) => data.status === 'HIDDEN'))
        break
      default:
        setDataTable(initData)
        break
    }
  }

  useEffect(() => {
    axios
      .get('http://localhost:5000/location/districts', { timeout: 5000 })
      .then((response) => {
        setDataTable(response.data)
        setInitData(response.data)
      })
      .catch((error) => toast.error(error.response.data.message))
    axios
      .get(`http://localhost:5000/location/provinces-creation`, { timeout: 5000 })
      .then((response) => setProvinceList(response.data))
      .catch((error) => toast.error(error))
  }, [])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideBar />
      <Layout style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content>
          <ContentHeader prefix={'Location'} name={'District'} onClick={() => showModal()} />
          <div style={{ display: 'flex' }}>
            <div style={{ background: 'white', margin: '1rem', width: '16rem', height: '6rem' }}>
              <div style={{ padding: '1rem' }}>
                <p style={{ marginBottom: '0.5rem' }}>STATUS</p>
                <Select defaultValue="" style={{ width: '14rem' }} onChange={handleSelect}>
                  <Option value="all">All</Option>
                  <Option value="active">Active</Option>
                  <Option value="hidden">Hidden</Option>
                </Select>
              </div>
            </div>
            <Table style={{ width: '100%', margin: '1rem' }} columns={columns} dataSource={dataTable} loading={!dataTable.length} />
          </div>
          <Modal
            destroyOnClose={true}
            closable={false}
            title={district.key ? 'Update District' : 'Create District'}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}>
            <Form form={form} labelAlign="left" name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} autoComplete="off">
              {district.key && (
                <Form.Item label="Key" name="key" rules={[{ required: true }]}>
                  <Input disabled={true} />
                </Form.Item>
              )}

              <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input district name!' }]}>
                <Input />
              </Form.Item>
              <Form.Item name="customizeSlug" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox checked={customizeSlug} onChange={customizeSlugCheckBox}>
                  Customize Slug
                </Checkbox>
              </Form.Item>
              {customizeSlug && (
                <Form.Item label="Slug Name" name="slugName" rules={[{ required: true, message: 'Please input slug name!' }]}>
                  <Input />
                </Form.Item>
              )}
              <Form.Item label="Province" name="province" rules={[{ required: true }]}>
                <Select placeholder="Select a province">
                  {provinceList.map((province, index) => (
                    <Option key={index} value={province.value}>
                      {province.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Kin</Footer>
      </Layout>
    </Layout>
  )
}

export default District
