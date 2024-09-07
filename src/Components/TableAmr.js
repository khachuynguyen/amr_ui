import React from 'react';
import { Button, Space, Table, Tag } from 'antd';
import ModalViewRobotInfor from './ModalViewRobotInfor';
import { render } from '@testing-library/react';
import ModalMoveRobotTo from './ModalMoveRobotTo';
import SseTaskRobot from './SseTaskRobot';
const columns = [
  {
    title: 'IPAddress',
    dataIndex: 'address',
    key: 'address',
  },
  // {
  //   title: 'Information',
  //   dataIndex: 'information',
  //   key: 'information',
  //   render: (_, record) => (
  //       <Space size="small">
  //         <ModalViewRobotInfor/>
  //       </Space>
  //     ),
  // },
  // {
  //   title:'Action',
  //   render: (_,record) => (
  //     <Space>
  //       <ModalMoveRobotTo host={record.address}/>
  //     </Space>
  //   )
  // },
  {
    title: 'TaskStatus',
    dataIndex: 'taskStatus',
    key: 'taskStatus',
    render: (_, record) => (
        <Space size="small">
          <SseTaskRobot host={record.address}></SseTaskRobot>
        </Space>
      ),
  },
];
// const data = [

//   {
//     address: '10.14.34.23',
//   },
//   {
//     address: '10.14.34.14',
//   },
// ];

function TableAmr(props) {
    const data = props.data
  return (
    <Table style={{ marginTop: '10px' }} pagination={false} columns={columns} dataSource={data} />
  )
}

export default TableAmr
// const TableAmr = () => <Table pagination={false} columns={columns} dataSource={data} />;
// export default TableAmr;