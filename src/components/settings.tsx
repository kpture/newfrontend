import { Input, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { Card, Select ,notification} from 'antd';
import { Button } from 'antd';
import { Typography, Divider } from 'antd';
import { CheckCircleTwoTone, DownloadOutlined, UserOutlined, DownCircleTwoTone } from '@ant-design/icons';
import { CopyBlock } from "react-code-blocks";
import { CaretLeftOutlined } from '@ant-design/icons'
import { KubernetesApi } from '../api/apis/KubernetesApi'
import { Configuration, ConfigurationParameters,ProfilesApi } from '../api';
import { profile } from 'console';
import { ErrorNotif, SucessNotif } from '../misc/notification';
import { GetConfig } from '../api/helpers/api';

const { Title } = Typography;
const { Option } = Select;

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const openNotificationWithIcon = (type: NotificationType,msg:string) => {
    notification[type]({
      message: msg,
      description:
        '',
    });
  };

export const SettingsPage: React.FC<{
    namespaces: string[],
    serverIP: string,
}> = ({ namespaces,serverIP }) => {

    const [namespace, setNamespace] = useState("default");
    const [profileName, setprofileName] = useState("");


    useEffect(()=>{},[serverIP])
    
    function injectNamespace(){
        if (serverIP === undefined ||serverIP === ""){
            return
          }

        let config = GetConfig(profileName,serverIP)
        let K8sApi = new KubernetesApi(config)
        K8sApi.k8sNamespacesNamespaceInjectPost({
            namespace: namespace
        }).then(()=>{
            console.error("success");
            openNotificationWithIcon('success',"namespace " + namespace + " configured")
        })
        .catch((error) => {
            console.error(error);
            openNotificationWithIcon('error',error)
        });
    }


    function CreateProfile() {
        if (serverIP === undefined ||serverIP === ""){
            return
          }

        let config =  GetConfig("",serverIP)

        let profilesApi = new ProfilesApi(config)
        profilesApi.profileProfileNamePost({profileName: profileName}).then(()=>{
            console.log("Created succefully")
            SucessNotif(profileName, "created successfully")
        }).catch(error => {
            ErrorNotif(String(error),"")
            console.log(error)
        })


    }

    return (
        <div>

            <Card style={{ marginBottom: "40px" }} bordered={false}>
                <Title level={4} style={{ marginBottom: "50px" }}>Namespaces</Title>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <Select
                            key="8"
                            showSearch
                            style={{ minWidth: 200,marginRight:30 }}
                            placeholder="Namespace"
                            onChange={(value => setNamespace(value))}
                            size='large'
                            suffixIcon={<CaretLeftOutlined />}
                            optionFilterProp="children"
                            filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA!.children as unknown as string)
                                    .toLowerCase()
                                    .localeCompare((optionB!.children as unknown as string).toLowerCase())
                            }
                        >
                            {namespaces.map((element, index) => <Option value={element} key={index}>{element}</Option>)}
                        </Select >

                        <Button type="primary" icon={<DownloadOutlined />} size={"large"} onClick={injectNamespace}>
                            Inject Webhook
                        </Button>
                    </div>
                   
                </div>
            </Card>
            <Divider></Divider>
            <Card style={{ marginBottom: "40px" }} bordered={false}>
                <Title level={4} style={{ marginBottom: "50px" }}>Profiles</Title>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                         <Input
                        onChange={(value => setprofileName(value.target.value))}
                         style={{ maxWidth: 200,marginRight:30 }}
                         size='large'
                         ></Input>
                        <Button type="primary" icon={<UserOutlined />} size={"large"} onClick={CreateProfile}>
                            Create Profile
                        </Button>
                    </div>
                   
                </div>
            </Card>
        </div>

    );
};

export default SettingsPage;