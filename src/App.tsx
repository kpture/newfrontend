
import './App.css';
import AgentTable, { DataType } from './components/table'
import KptureHeader from './components/header'
import CapturesPage from './components/captures'
import SettingsPage from './components/settings'

import React, { useState, useEffect } from 'react';
import { AgentsApi } from './api/apis/AgentsApi'
import { ProfilesApi } from './api/apis/ProfilesApi'
import { KubernetesApi } from './api/apis/KubernetesApi'
import { ColumnFilterItem} from "antd/lib/table/interface"

import { Modal} from "antd"


import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { Configuration, ConfigurationParameters } from './api';
import Cookies from 'universal-cookie';

function App() {
  const [agents, setAgents] = useState<DataType[]>([]);
  const [profiles, setProfiles] = useState<string[]>([]);
  const [profile, setProfile] = useState("default");
  const [enabledNamespaces, setenabledNamespaces]  = useState<ColumnFilterItem[]>([]);
  const [allNamespaces, setAllNamespaces]  = useState<string[]>([]);


  const cookies = new Cookies();


  function setCurrentProfile(profile: string) {
    cookies.set('currentProfile', profile, { path: '/' });
    setProfile("test")
  }
  let cookieProfile: string = cookies.get('currentProfile')

  useEffect(() => {
   let profile = cookies.get('currentProfile')
   if (profile === undefined){
   }else{
    setProfile(profile)
   }
  },[profile])

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {


    let config = new Configuration({
      username: profile
    })

    let apiAgents: DataType[] = []
    let AgentApi = new AgentsApi(config)
    let ProfileApi = new ProfilesApi(config)
    let K8sApi = new KubernetesApi(config)

    
    AgentApi.apiV1AgentsGet().then(data => {
      data.forEach(element => {
        apiAgents.push({
          key: element.targetUrl!,
          name: element.name!,
          namespace: element.namespace!,
          status: element.status!,
        })
      });
      setAgents(apiAgents)


      ProfileApi.apiV1ProfilesGet().then(data => {
        setProfiles(data)
      })

    let ns:ColumnFilterItem[]=[]
    let nsList:string[]=[]

      K8sApi.apiV1KptureK8sNamespacesGet().then(data=>{
        data.forEach(currNs => {
          ns.push({
            text: currNs,
            value: currNs
          })
        })
        nsList = data
        setenabledNamespaces(ns)
      }).then(()=>{
        K8sApi.apiV1K8sNamespacesGet().then(data=>{
          let difference = data.filter(x => !nsList.includes(x));

          difference= difference.filter(value=>{
            return !value.startsWith("kube-") && value !=="kpture"
          })
          setAllNamespaces(difference)
        })
      })

     


    })
  }, []);


  return (
    <div>
      <KptureHeader profile={profile}  profiles={profiles} setProfile={setCurrentProfile}></KptureHeader>
      <div style={{ margin: "auto", width: "50vw", marginTop: "50px" }}>
        <Routes>
          <Route path="/dashboard" element={<AgentTable agents={agents}  profile={profile} namespaces={enabledNamespaces}/>}  />
          <Route path="/captures" element={<CapturesPage />} />
          <Route path="/settings" element={<SettingsPage  namespaces={allNamespaces}/>} />
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
        </Routes>
      </div>  
    </div>
  );
}

export default App;
