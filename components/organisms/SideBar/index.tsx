import React, { FC } from 'react'
import Image from 'next/image'
import { Layout, Menu } from 'antd'

import Logo from '../../../assets/Toi Dev-logos.jpeg'
import { menu } from './data'

const { Sider } = Layout
const { SubMenu } = Menu

const SideBar: FC = () => {
  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0
      }}>
      <div
        style={{
          height: '4rem',
          marginBottom: '2rem',
          position: 'relative'
        }}>
        <Image src={Logo} alt="logo" layout="fill" objectFit="cover" />
      </div>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        {menu.map((item) => {
          return (
            (!item.subItem && (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.title}
              </Menu.Item>
            )) || (
              <SubMenu key={item.key} icon={item.icon} title={item.title}>
                {item.subItem.map((sItem) => (
                  <Menu.Item key={sItem.key}>{sItem.title}</Menu.Item>
                ))}
              </SubMenu>
            )
          )
        })}
      </Menu>
    </Sider>
  )
}

export default SideBar
