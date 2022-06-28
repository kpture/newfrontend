import {  Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useState } from 'react';
import { Card } from 'antd';
import { Tag } from 'antd';
import { Typography,Input,Button } from 'antd';
import { motion } from 'framer-motion';

const { Title } = Typography;

interface DataType {
  key: React.Key;
  name: string;
  namespace: string;
  status: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Namespace',
    dataIndex: 'namespace',
    filters: [
      {
        text: "testns",
        value: 'testns',
      },
      {
        text: "testns2",
        value: 'testns2',
      },
    ],
     onFilter: (value: string | number | boolean, record: DataType)  => record.namespace===value,
    filterSearch: true,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: text => {
    var color = "green"
     text === "UP" ? color="success" : color="error" 
     return  <Tag color={color} >{text}</Tag>
    },

  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    namespace: "testns",
    status: "UP"
  },
  {
    key: '2',
    name: 'Jim Green',
    namespace: "testns",
    status: "UP"
  },
  {
    key: '3',
    name: 'Joe Black',
    namespace: "testns",
    status: "DOWN"
  },
  {
    key: '4',
    name: 'Disabled User',
    namespace: "testns2",
    status: "UP"
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: DataType) => ({
    name: record.name,
  }),
};

const AgentTable: React.FC = () => {

  return (
    <div>
      <div >
      <Input.Group style={{ marginBottom:"50px" }}>
      <Input size='large' style={{ width: 'calc(100% - 200px)' }}placeholder={"Kpture name"} />
      <Button size='large' style={{ width:"200px" }} type="primary">Start</Button>
    </Input.Group>
      </div>
    <Card  style={{marginBottom:"40px" ,boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" ,borderRadius:"2px"}}>
    
      <Table size='large'
        rowSelection={{
          type: 'checkbox',

          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </Card>
    </div>
  );
};

export default AgentTable;