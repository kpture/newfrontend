import React  from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Button, PageHeader } from 'antd';
import { Select } from 'antd';
import { UserOutlined } from '@ant-design/icons'

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

const { Option } = Select;

const KptureHeader: React.FC = () => {

  return (
    <PageHeader
    className="site-page-header"
    style={{ paddingInline: "10vh" ,paddingTop:"10px"}}
    title={<Link to="/">Kpture</Link>}


    avatar={{ src: logo, size: 'large' }}
    extra={[
      <Button key="2" size='large'><Link to="/Captures">Captures</Link></Button>,
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
  );
};

export default KptureHeader;