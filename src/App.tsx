
import './App.css';
import AgentTable,{DataType} from './components/table'
import KptureHeader from './components/header'
import CapturesPage from './components/captures'
import React, { useState, useEffect } from 'react';
import {AgentsApi} from './api/apis/AgentsApi'
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { Configuration ,ConfigurationParameters} from './api';

function App() {
  const [count, setCount] = useState(0);
  const [agents, setAgents] = useState<DataType[]>([]);


  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {

    let config = new Configuration({
      username: "default"
  })
     let  apiAgents:DataType[]=[]
     let AgentApi = new AgentsApi(config)
     AgentApi.apiV1AgentsGet().then( data => {
      data.forEach(element => {
        apiAgents.push({
          key: element.targetUrl!,
          name: element.name!,
          namespace: element.namespace!,
          status: element.status!,
        })
      });

      setAgents(apiAgents)
     })
  });


  return (
    <div>
      <KptureHeader></KptureHeader>

      <div style={{ margin: "auto", width: "50vw", marginTop: "50px" }}>
        <Routes>
          <Route path="/dashboard" element={<AgentTable agents={agents}/>} />
          <Route path="/captures" element={<CapturesPage />} />
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
        </Routes>
      </div>



    </div>
  );
}

export default App;
