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

export const KptureHeader: React.FC<{
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
        <Button key="3"   style={{ border: 'none' ,boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)", borderRadius: "2px"}} size='large'><Link to="/">Home</Link></Button>,
        <Button key="2"  style={{ border: 'none' ,boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)", borderRadius: "2px"}}   size='large'><Link to="/captures">Captures</Link></Button>,
        <Button key="4"  style={{ border: 'none' ,boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)", borderRadius: "2px"}} size='large'><Link to="/settings">Settings</Link></Button>,
        <Select
          key="8"
          showSearch
          style={{ minWidth: 100 ,border: 'none' ,boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)", borderRadius: "2px"}} 
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