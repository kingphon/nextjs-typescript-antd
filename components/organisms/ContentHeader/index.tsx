import React, { FC } from 'react'
import { Button } from 'antd'

interface pathName {
  prefix: string
  name: string
  onClick: any
}

const ContentHeader: FC<pathName> = ({prefix, name, onClick}) => {
  return (
    <div style={{ background: 'white', display: 'flex', justifyContent: 'space-between', padding: '0.5rem 2rem', alignItems: 'center' }}>
      <div>
        <span style={{ color: '#999' }}>{`${prefix} /`}</span>
        <span style={{ cursor: 'pointer' }}> {name}</span>
      </div>
      <div>
        <Button onClick={onClick} type="primary">
          Tạo mới
        </Button>
      </div>
    </div>
  )
}

export default ContentHeader
