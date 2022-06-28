
import './App.css';
import AgentTable, { DataType } from './components/table'
import KptureHeader from './components/header'
import CapturesPage from './components/captures'
import React, { useState, useEffect } from 'react';
import { AgentsApi } from './api/apis/AgentsApi'
import { ProfilesApi } from './api/apis/ProfilesApi'


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
      username: "default"
    })

    let apiAgents: DataType[] = []
    let AgentApi = new AgentsApi(config)
    let ProfileApi = new ProfilesApi(config)

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
    })
  }, []);


  return (
    <div>
      <KptureHeader profile={profile}  profiles={profiles} setProfile={setCurrentProfile}></KptureHeader>
      <div style={{ margin: "auto", width: "50vw", marginTop: "50px" }}>
        <Routes>
          <Route path="/dashboard" element={<AgentTable agents={agents} />} />
          <Route path="/captures" element={<CapturesPage />} />
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
        </Routes>
      </div>



    </div>
  );
}

export default App;
