import React, { FC } from 'react'
import { Select } from 'antd'
const { Option } = Select

const FilterContent: FC<any> = (handleSelect) => {
    function handleChange(value) {
        console.log(`selected ${value}`);
      }
  return (
    <div style={{ background: 'white', margin: '1rem', width: '16rem', height: '6rem' }}>
      <div style={{ padding: '1rem' }}>
        <p style={{ marginBottom: '0.5rem' }}>STATUS</p>
        <Select defaultValue="" style={{ width: '14rem' }} onChange={handleChange}>
          <Option value="all">All</Option>
          <Option value="active">Active</Option>
          <Option value="hidden">Hidden</Option>
        </Select>
      </div>
    </div>
  )
}

export default FilterContent
