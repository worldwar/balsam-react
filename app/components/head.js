import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Button } from 'antd';
const { Header, Content, Footer } = Layout;

class Head extends Component {

  render() {
    return (
      <div>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1"><a href='#/'>目录</a></Menu.Item>

          <Menu.Item key="2"><a href='#/add'>添加</a></Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default Head;
