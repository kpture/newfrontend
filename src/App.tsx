
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
  console.log()


    let config =  GetConfig(profile)

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
    }).then(() => {
      K8sApi.k8sNamespacesGet().then(data => {
        let difference = data.filter(x => !nsList.includes(x));

        difference = difference.filter(value => {
          return !value.startsWith("kube-") && value !== "kpture"
        })
        setAllNamespaces(difference)
      })
    }).catch(e=>{
    })
  }, []);


  return (
    <div>
      <KptureHeader profile={profile} profiles={profiles} setProfile={setCurrentProfile}></KptureHeader>
      <div style={{ margin: "auto", width: "50vw", marginTop: "50px" }}>
        <Routes>
          <Route path="/" element={<AgentTable profile={profile} />} />
          <Route path="/captures/" element={<KpturesTable profile={profile} />} />
          <Route path="/settings/" element={<SettingsPage namespaces={allNamespaces} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
