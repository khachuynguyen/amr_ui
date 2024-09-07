import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import TableAmr from './Components/TableAmr';
import TableGroup from './Components/TableGroup';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import instanceAxios from './AxiosInstance';
import ModalAddRobot from './Components/ModalAddRobot';
import ModalAddGroup from './Components/ModalAddGroup';
import SseComponent from './Components/SseComponent';
const { Header, Sider, Content } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [listRobotConnected, setListRobotConnected] = useState([])
  const [listGroup, setListGroup] = useState([]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const getData = async () => {
    await instanceAxios.get('management/list-robot').then((res) => {
      console.log(res.data);
      let tmp = []
      res.data.forEach(element => {
        tmp.push({
          address: element,
          information: element
        })
      });
      setListRobotConnected(tmp)
    }).catch((err) => {
      console.log(err);

    })

    await instanceAxios.get('management/list-group').then((res) => {
      let tmp = []
      res.data.forEach(element => {
        tmp.push({
          groupName: element.name,
          groupMember: element.listRobots.length == 0 ? "Chưa có thành viên" : element.listRobots.join('---'),
          currentTask: "123",
          id: element.id
        })
      });
      setListGroup(tmp)
    }).catch((err) => {
      console.log(err);

    })
  }
  const doPrempt = async () => {
    await instanceAxios.get('management/set-prempt-control').then((res) => {

    }).catch((err) => {

    })
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <BrowserRouter>
      <Layout style={{ width: '100vw', height: '100vh' }}>
        {/* <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider> */}
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            {/* <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          /> */}
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <h1>Danh sách AMR đã kết nối</h1>
            <div>
              <h1>Robot Monitoring</h1>
              <iframe
                src="https://10.14.34.82:8090/#/view" // Thay thế bằng URL của trang giám sát của bạn
                style={{ width: '100%', height: '600px', border: 'none' }}
                title="Robot Monitoring"
              />
            </div>
            <ModalAddRobot />
            <Button onClick={doPrempt} style={{ marginLeft: '10px' }}>Chiếm quyền kiểm soát</Button>
            <TableAmr data={listRobotConnected}></TableAmr>
            <h1>Danh sách Group</h1>
            <ModalAddGroup />
            <TableGroup data={listGroup}></TableGroup>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};
export default App;