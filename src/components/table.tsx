import {  Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { ColumnFilterItem} from "antd/lib/table/interface"
import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { Tag } from 'antd';
import { KpturesApi, } from '../api/apis/KpturesApi'
import { ServerKptureRequest} from '../api/models/ServerKptureRequest'
import { ServerKptureRequestAgentsRequestInner} from '../api/models/ServerKptureRequestAgentsRequestInner'

import { Typography,Input,Button } from 'antd';
import { motion } from 'framer-motion';
import KptureModal from './capture_modal'
import { Configuration, ConfigurationParameters } from '../api';

const { Title } = Typography;

export interface DataType {
  key: React.Key;
  name: string;
  namespace: string;
  status: string;
}




export interface TableProps {
  Agents :DataType[],
}
// rowSelection object indicates the need for row selection


const AgentTable: React.FC<{ agents: DataType[], namespaces: ColumnFilterItem[] , profile: string }> = ({ agents,namespaces,profile }) => {
  const [KptureName, setKptureName] = useState<string>("");
  const [isValid, setisValid] = useState(false);

  const [visible, setVisible] = useState(false);
  const [uuid, setuuid] = useState<string>("rzqr");
  const [selectedAgents, setselectedAgents] = useState<Array<ServerKptureRequestAgentsRequestInner>>();

  useEffect(()=>{
    if (KptureName.includes(" ")) setisValid(false)
    else if  (KptureName.length<5) setisValid(false)
    else if  (KptureName.includes(".")) setisValid(false)
    else if  (selectedAgents===undefined) setisValid(false)
    else if  (selectedAgents.length===0) setisValid(false)

    else setisValid(true)
  },[KptureName,selectedAgents])



  // useEffect(()=>{
  //   if (kptureStart===true){
  //     // setVisible(true)
  //     console.log(uuid)
  //   }
  // },[kptureStart])
  useEffect(() => {  }, [])

  

  
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      let t:Array<ServerKptureRequestAgentsRequestInner> = new Array<ServerKptureRequestAgentsRequestInner>()
      selectedRows.forEach(row=>{
        t.push({
          name:row.name,
          namespace:row.namespace
        })
      })    
      setselectedAgents(t)
    },
    getCheckboxProps: (record: DataType) => ({
      name: record.name,
    }),
  };

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Namespace',
    dataIndex: 'namespace',
    filters: namespaces,
     onFilter: (value: string | number | boolean, record: DataType)  => record.namespace===value,
    filterSearch: true,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: text => {
    var color = "green"
     text === "up" ? color="success" : color="error" 
     return  <Tag color={color} >{text.toUpperCase()}</Tag>
    },
  },
];

  function startKpture(){
    let config = new Configuration({
      username: profile
    })
    let kptureApi = new KpturesApi(config)
    kptureApi.apiV1KpturePost({
      data: {
        agentsRequest: selectedAgents,
        kptureName: KptureName
      }
    }).then( k=>{
      setuuid(k.uuid!)
      setVisible(true)
    }).catch((err)=>{
      console.log(err)
    })
  }


 

  return (

    <div>
      <div style={{marginBottom:"30px"}}>
      <Input size='large' style={{ width: 'calc(100% - 200px)',backgroundColor:"#ffffff"  }}  onChange={(value => setKptureName(value.target.value))} placeholder={"Kpture name"} />
      <Button  disabled={!isValid} size='large' style={{ width:"200px"}} type="primary" onClick={startKpture}>Start</Button>
      </div>
    <Card  style={{boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" ,borderRadius:"2px"}}>
      <Table size='middle'
        rowSelection={{

          type: 'checkbox',

          ...rowSelection,
        }}
        columns={columns}
        dataSource={agents}
      />
    </Card>
    <KptureModal
    kptureName={KptureName}
    profile={profile}
    visible={visible}
    setvisible={setVisible}
    uuid={uuid}
    key={"test"}
    ></KptureModal>

    </div>
  );
};

export default AgentTable;