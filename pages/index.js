
import * as React from 'react'
import stylesheet from 'antd/dist/antd.min.css'
import { Layout, Menu, Row, Col } from 'antd'
import CustomCard from '../components/CustomCard'

const { Header, Content } = Layout

export default class App extends React.Component {
  render() {
    return <Layout>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <style jsx>{`
        #components-layout-demo-top-side-2 .logo {
          width: 120px;
          height: 31px;
          background: #333;
          border-radius: 6px;
          margin: 16px 28px 16px 0;
          float: left;
        }
      `}</style>
      <Header className='header'>
        <div className='logo' />
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key='1'>Home</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Layout style={{ padding: '24px', minHeight: 'calc(100vh - 64px)' }}>
          <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
            <Row gutter={16} style={{ marginBottom: '32px' }}>
              <Col span={8}>
                <CustomCard
                  id={12930}
                  name='Riscas'
                  image='http://placekitten.com/960/690'
                  date='Setembro 2018'
                  gift='Jorge Seabra'
                  price={50}
                  donated={false}
                  onClickDonate={() => {
                    console.log('test');
                  }}
                />
              </Col>
              <Col span={8}>
                <CustomCard
                  id={12930}
                  name='Riscas'
                  image='http://placekitten.com/960/691'
                  date='Setembro 2018'
                  gift='Jorge Seabra'
                  price={50}
                  donated={false}
                  onClickDonate={() => {
                    console.log('test');
                  }}
                />
              </Col>
              <Col span={8}>
                <CustomCard
                  id={12930}
                  name='Riscas'
                  image='http://placekitten.com/960/692'
                  date='Setembro 2018'
                  gift='Jorge Seabra'
                  price={50}
                  donated={false}
                  onClickDonate={() => {
                    console.log('test');
                  }}
                />
              </Col>
            </Row>
            <Row gutter={16} style={{ marginBottom: '32px' }}>
              <Col span={8}>
                <CustomCard
                  id={12930}
                  name='Riscas'
                  image='http://placekitten.com/960/690'
                  date='Setembro 2018'
                  gift='Jorge Seabra'
                  price={50}
                  donated={false}
                  onClickDonate={() => {
                    console.log('test');
                  }}
                />
              </Col>
              <Col span={8}>
                <CustomCard
                  id={12930}
                  name='Riscas'
                  image='http://placekitten.com/960/691'
                  date='Setembro 2018'
                  gift='Jorge Seabra'
                  price={50}
                  donated={false}
                  onClickDonate={() => {
                    console.log('test');
                  }}
                />
              </Col>
              <Col span={8}>
                <CustomCard
                  id={12930}
                  name='Riscas'
                  image='http://placekitten.com/960/692'
                  date='Setembro 2018'
                  gift='Jorge Seabra'
                  price={50}
                  donated={false}
                  onClickDonate={() => {
                    console.log('test');
                  }}
                />
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  }
}