import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { ColumnFilterItem } from "antd/lib/table/interface"
import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { Tag } from 'antd';
import { KpturesApi, } from '../api/apis/KpturesApi'
import { ServerKptureRequest } from '../api/models/ServerKptureRequest'
import { ServerKptureRequestAgentsRequestInner } from '../api/models/ServerKptureRequestAgentsRequestInner'
import { AgentsApi, ProfilesApi, KubernetesApi } from '../api'
import { HTTPHeaders } from '../api'
import { GetConfig } from '../api/helpers/api'
import { Typography, Input, Button } from 'antd';
import KptureModal from './capture_modal'
import { Configuration, ConfigurationParameters } from '../api';


interface DataType {
  key: React.Key;
  name: string;
  namespace: string;
  status: string;
}


export const AgentTable: React.FC<{ profile: string,serverIP :string }> = ({ profile ,serverIP}) => {
  const [KptureName, setKptureName] = useState<string>("");
  const [isKptureNameValid, setisKptureNameValid] = useState(false);


  const [availableNamespaces, setavailableNamespaces] = useState<ColumnFilterItem[]>([]);
  const [availableAgents, setavailableAgents] = useState<DataType[]>([]);


  const [visible, setVisible] = useState(false);
  const [uuid, setuuid] = useState<string>("rzqr");
  const [selectedAgents, setselectedAgents] = useState<Array<ServerKptureRequestAgentsRequestInner>>();


  useEffect(() => {
    if (KptureName.includes(" ")) setisKptureNameValid(false)
    else if (KptureName.length < 5) setisKptureNameValid(false)
    else if (KptureName.includes(".")) setisKptureNameValid(false)
    else if (selectedAgents === undefined) setisKptureNameValid(false)
    else if (selectedAgents.length === 0) setisKptureNameValid(false)
    else setisKptureNameValid(true)
  }, [KptureName, selectedAgents])

  useEffect(() => {
    if (serverIP === undefined ||serverIP === ""){
      return
    }
    let config = GetConfig(profile,serverIP)
    let AgentApi = new AgentsApi(config)
    let apiAgents: DataType[] = []
    let K8sApi = new KubernetesApi(config)
    let ns: ColumnFilterItem[] = []
    let nsList: string[] = []

    AgentApi.agentsGet().then(data => {
      data.forEach(element => {
        apiAgents.push({
          key: element.targetUrl!,
          name: element.name!,
          namespace: element.namespace!,
          status: element.status!,
        })
      });
      setavailableAgents(apiAgents)
      K8sApi.kptureK8sNamespacesGet().then(data => {
        data.forEach(currNs => {
          ns.push({
            text: currNs,
            value: currNs
          })
        })
        nsList = data
        setavailableNamespaces(ns)
      })
    }).catch(error => {
      console.log(error)
    })
  }, [profile,serverIP])


  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      let t: Array<ServerKptureRequestAgentsRequestInner> = new Array<ServerKptureRequestAgentsRequestInner>()
      selectedRows.forEach(row => {
        t.push({
          name: row.name,
          namespace: row.namespace
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
      filters: availableNamespaces,
      onFilter: (value: string | number | boolean, record: DataType) => record.namespace === value,
      filterSearch: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: text => {
        var color = "green"
        text === "up" ? color = "success" : color = "error"
        return <Tag color={color} >{text.toUpperCase()}</Tag>
      },
    },
  ];

  function startKpture() {
    if (serverIP === undefined ||serverIP === ""){
      return
    }

    let config = GetConfig(profile,serverIP)
    let kptureApi = new KpturesApi(config)
    kptureApi.kpturePost({
      data: {
        agentsRequest: selectedAgents,
        kptureName: KptureName
      }
    }).then(k => {
      setuuid(k.uuid!)

      setVisible(true)
    }).catch((err) => {
      console.log(err)
    })
  }




  return (

    <div>
      <div style={{ marginBottom: "30px" }}>
        <Input size='large' style={{ width: 'calc(100% - 200px)', backgroundColor: "#ffffff" }} onChange={(value => setKptureName(value.target.value))} placeholder={"Kpture name"} />
        <Button disabled={!isKptureNameValid} size='large' style={{ width: "200px" }} type="primary" onClick={startKpture}>Start</Button>
      </div>
      <Card style={{ boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)", borderRadius: "2px" }}>
        <Table size='middle'
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          columns={columns}
          dataSource={availableAgents}
        />
      </Card>
      <KptureModal
        kptureName={KptureName}
        profile={profile}
        visible={visible}
        setvisible={setVisible}
        uuid={uuid}
        key={"test"}
        serverIP={serverIP}
      ></KptureModal>
    </div>
  );
};

export default AgentTable;