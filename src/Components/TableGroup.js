import React from 'react';
import { Space, Table, Tag } from 'antd';
import ModalAddMemberGroup from './ModalAddMemberGroup';
import ModalAddTask from './ModalAddTask';
import SseTaskGroup from './SseTaskGroup';
import ModalRemoveMember from './ModalRemoveMember';
const columns = [
  {
    title: 'Group Name',
    dataIndex: 'groupName',
    key: 'groupName',
  },
  {
    title: 'Group Member',
    dataIndex: 'groupMember',
    key: 'groupMember',
  },
  {
    title: 'Current Task',
    dataIndex: 'currentTask',
    key: 'currentTask',
    render: (_, record) => (
      <Space size="small">
        <SseTaskGroup groupId={record.id}/>
      </Space>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
        <Space size="small">
          <ModalAddMemberGroup groupId={record.id}/>
          <ModalAddTask groupId={record.id}/>
          <ModalRemoveMember groupId={record.id}/>
        </Space>
      ),
  }
];
// const data = [

//   {
//     address: '10.14.34.23',
//   },
//   {
//     address: '10.14.34.14',
//   },
// ];
// render: (_, { tags })

function TableGroup(props) {
    const data = props.data
  return (
    <Table pagination={false} columns={columns} dataSource={data} />
  )
}

export default TableGroup
// const TableGroup = () => <Table pagination={false} columns={columns} dataSource={data} />;
// export default TableGroup;