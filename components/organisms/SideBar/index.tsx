import React, { FC, useState } from 'react'
import Image from 'next/image'
import { Layout, Menu } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Logo from '../../../public/Toi Dev-logos.jpeg'
import { menu } from './data'

const { Sider } = Layout
const { SubMenu } = Menu

const SideBar: FC = () => {
  const router = useRouter()
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
              <Menu.Item
                key={item.key}
                icon={item.icon}
                onClick={() => {
                  localStorage.setItem('itemKey', item.key)
                  localStorage.setItem('itemSub', '')
                  router.push(item.url)
                }}>
                {item.title}
              </Menu.Item>
            )) || (
              <SubMenu key={item.key} icon={item.icon} title={item.title}>
                {item.subItem.map((sItem) => (
                  <Menu.Item
                    key={sItem.key}
                    onClick={() => {
                      localStorage.setItem('itemKey', sItem.key)
                      localStorage.setItem('itemSub', item.key)
                      router.push(sItem.url)
                    }}>
                    <a>{sItem.title}</a>
                  </Menu.Item>
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
