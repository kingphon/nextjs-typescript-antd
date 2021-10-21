import React from 'react'
import { DesktopOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'

interface SubItem {
  key: string
  title: string
}

interface SideMenu {
  key: string
  title: string
  icon: unknown
  subItem?: Array<SubItem>
}

export const menu: Array<SideMenu> = [
  {
    key: '1',
    title: 'Option 1',
    icon: <PieChartOutlined />
  },
  {
    key: '2',
    title: 'Option 2',
    icon: <DesktopOutlined />
  },
  {
    key: 'sub1',
    title: 'User',
    icon: <UserOutlined />,
    subItem: [
      {
        key: '3',
        title: 'Tom'
      },
      {
        key: '4',
        title: 'Bill'
      },
      {
        key: '5',
        title: 'Alex'
      }
    ]
  },
  {
    key: 'sub2',
    title: 'Team',
    icon: <TeamOutlined />,
    subItem: [
      {
        key: '6',
        title: 'Team 1'
      },
      {
        key: '8',
        title: 'Team 2'
      }
    ]
  },
  {
    key: '9',
    title: 'Files',
    icon: <FileOutlined />
  }
]