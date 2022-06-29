import React ,{useState,useEffect}from 'react';
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

const KptureHeader: React.FC<{
  profile: string,
  profiles : string[],
  setProfile: (profile: string) => void;
}> = ({ profile,setProfile,profiles }) => {
 

  const handleChange = (value: string) => {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
    setProfile(value)
  };

  return (
    <PageHeader
      className="site-page-header"
      style={{ paddingInline: "10vh", paddingTop: "10px" }}
      title={<Link to="/">Kpture</Link>}

      avatar={{ src: logo, size: 'large' }}
      extra={[
        <Button key="3" size='large'><Link to="/dashboard">Home</Link></Button>,
        <Button key="2" size='large'><Link to="/captures">Captures</Link></Button>,
        <Button key="4" size='large'><Link to="/settings">Settings</Link></Button>,
        <Select
          key="8"
          showSearch
          style={{ minWidth: 100 }}
          placeholder="Profile"
          onChange={handleChange}
          size='large'
          value={ profile }
          suffixIcon={<UserOutlined />}
          optionFilterProp="children"
          filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
          filterSort={(optionA, optionB) =>
            (optionA!.children as unknown as string)
              .toLowerCase()
              .localeCompare((optionB!.children as unknown as string).toLowerCase())
          }
        >
        {profiles.map((element,index)=> <Option value={element} key={index}>{element}</Option>)}
        </Select>
      ]}
    />
  );
};

export default KptureHeader;