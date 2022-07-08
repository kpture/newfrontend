
import './App.css';
import { AgentTable, DataType, KptureHeader, SettingsPage, KpturesTable } from './components'
import { useState, useEffect } from 'react';
import { AgentsApi, ProfilesApi, KubernetesApi, Configuration } from './api'
import { ColumnFilterItem } from "antd/lib/table/interface"
import { notification } from "antd"
import { Routes, Route, Navigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import { GetConfig } from './api/helpers/api';
import { ErrorNotif } from './misc/notification';
import AppConfig from 'react-global-configuration';
let isElectron = require("is-electron");

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const openNotificationWithIcon = (type: NotificationType, title: string, error: string) => {
  notification[type]({
    message: title,
    description:
      error,
  });
};


function App() {
  const [agents, setAgents] = useState<DataType[]>([]);
  const [profiles, setProfiles] = useState<string[]>([]);
  const [profile, setProfile] = useState("default");
  const [enabledNamespaces, setenabledNamespaces] = useState<ColumnFilterItem[]>([]);
  const [allNamespaces, setAllNamespaces] = useState<string[]>([]);
  const [serverIP, setserverIP] = useState<string>();


  const cookies = new Cookies();


  function setCurrentProfile(profile: string) {
    cookies.set('currentProfile', profile, { path: '/' });
    setProfile("test")
  }

  let cookieProfile: string = cookies.get('currentProfile')

  useEffect(() => {
    let profile = cookies.get('currentProfile')
    if (profile === undefined) {
    } else {
      setProfile(profile)
    }
  }, [profile])

  useEffect(() => {

    if(isElectron()){
      console.log("Electron aww yeahhh !");
      setserverIP("169.254.255.75")

    }else{
      console.log("set server ip to 169.254.255.76 ")
      setserverIP(window.location.host)
    }

    if (serverIP === undefined ||serverIP === ""){
      return
    }

    let config =  GetConfig(profile,serverIP)

    let apiAgents: DataType[] = []
    let AgentApi = new AgentsApi(config)
    let ProfileApi = new ProfilesApi(config)
    let K8sApi = new KubernetesApi(config)

    ProfileApi.profilesGet().then(data => {
      setProfiles(data)
    }).catch(e=>{
      ErrorNotif("could not fetch profiles",String(e))
    })

    let ns: ColumnFilterItem[] = []
    let nsList: string[] = []

    K8sApi.kptureK8sNamespacesGet().then(data => {
      data.forEach(currNs => {
        ns.push({
          text: currNs,
          value: currNs
        })
      })
      nsList = data
      setenabledNamespaces(ns)
      console.log("enabled ns" , ns)
    }).then(() => {
      console.log("fetching all k8s ns")
      K8sApi.k8sNamespacesGet().then(data => {
        let difference = data.filter(x => !nsList.includes(x));
        difference = difference.filter(value => {
          return !value.startsWith("kube-") && value !== "kpture"
        })
        console.log("not enabled namespaces",difference)

        setAllNamespaces(difference)
      })
    }).catch(e=>{
      console.log(String(e))
    })
  }, [profile,serverIP]);

  if (serverIP === undefined ||serverIP === ""){
    return (<></>)
  }

  return (
    <div>
      <KptureHeader profile={profile} profiles={profiles} setProfile={setCurrentProfile}></KptureHeader>
      <div style={{ margin: "auto", width: "50vw", marginTop: "50px" }}>
        <Routes>
          <Route path="/" element={<AgentTable profile={profile}  serverIP={serverIP}/>} />
          <Route path="/captures/" element={<KpturesTable profile={profile} serverIP={serverIP} />} />
          <Route path="/settings/" element={<SettingsPage namespaces={allNamespaces} serverIP={serverIP} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
