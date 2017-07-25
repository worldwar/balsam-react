import React, { Component } from 'react';

import Head from './head.js';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;


export default class Base extends Component {
  render() {
    const { children } = this.props;
    return (
        <Layout className="layout">
          <Header style={{ position: 'fixed', width: '100%' }}>
            <Head />
          </Header>

          <Content style={{ padding: '0 50px', marginTop: 64 }}>
          
             <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>{children}</div>
          </Content >
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>

    );
  }
}
 