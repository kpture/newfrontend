import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, PageHeader } from 'antd';
import { Select } from 'antd';
import { Col, Row } from 'antd';
import AgentTable from './components/table'
import { UserOutlined } from '@ant-design/icons'
const { Option } = Select;

function App() {
  return (
    <div>
         <PageHeader
        className="site-page-header"
        style={{ paddingInline: "10vh" }}
        title="Kpture"
        avatar={{ src: logo, size: 'large' }}
        extra={[
          <Button key="3" size='large'>Agents</Button>,
          <Button key="2" size='large'>Captures</Button>,
          <Button key="1" size='large'>
            Settings
          </Button>,
          <Select
            showSearch
            // bordered={false}
            style={{ width: 200 }}
            placeholder="Profile"
            size='large'
            suffixIcon={<UserOutlined />}
            optionFilterProp="children"
            filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
            filterSort={(optionA, optionB) =>
              (optionA!.children as unknown as string)
                .toLowerCase()
                .localeCompare((optionB!.children as unknown as string).toLowerCase())
            }
          >
            <Option value="1">Not Identified</Option>
            <Option value="2">Closed</Option>
            <Option value="3">Communicated</Option>
            <Option value="4">Identified</Option>
            <Option value="5">Resolved</Option>
            <Option value="6">Cancelled</Option>
          </Select>
        ]}
      />

  <Row>
      <Col flex={4} style={{paddingInline:"13vh",marginTop:"40px"}}>
        <AgentTable></AgentTable>

        </Col>
      <Col flex={3}></Col>
    </Row>


    </div>
   
  );
}

export default App;
