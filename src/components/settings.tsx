import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useState } from 'react';
import { Card, Select } from 'antd';
import { Button } from 'antd';
import { Typography, Divider } from 'antd';
import { CheckCircleTwoTone, DownloadOutlined, DeleteOutlined, DownCircleTwoTone } from '@ant-design/icons';
import { CopyBlock } from "react-code-blocks";
import { CaretLeftOutlined } from '@ant-design/icons'
import { KubernetesApi } from '../api/apis/KubernetesApi'
import {ApiV1KpturePostRequest} from '../api/apis/KpturesApi'
const { Title } = Typography;
const { Option } = Select;


const SettingsPage: React.FC<{
    namespaces: string[],
}> = ({ namespaces }) => {

    const [namespace, setNamespace] = useState("default");

    function injectNamespace(){
        let K8sApi = new KubernetesApi()
        K8sApi.apiV1K8sNamespacesNamespaceInjectPost({
            namespace: namespace
        }).then(()=>{
            console.error("success");
        })
        .catch((error) => {
            console.error(error);
        });
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
                            placeholder="Profile"
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
                        </Select>

                        <Button type="primary" icon={<DownloadOutlined />} size={"large"} onClick={injectNamespace}>
                            Inject Webhook
                        </Button>
                    </div>
                   
                </div>
            </Card>
            <Divider></Divider>
        </div>

    );
};

export default SettingsPage;