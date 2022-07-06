import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { ColumnFilterItem } from "antd/lib/table/interface"
import React, { useEffect, useState,useReducer } from 'react';
import { Card } from 'antd';
import { Tag } from 'antd';
import { KpturesApi, } from '../api/apis/KpturesApi'
import { ServerKptureRequest } from '../api/models/ServerKptureRequest'
import { ArrowUpOutlined, LoadingOutlined, DeleteOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';

import { ServerKptureRequestAgentsRequestInner } from '../api/models/ServerKptureRequestAgentsRequestInner'
import { CaptureKpture } from '../api';
import { Typography, Input, Button } from 'antd';
import { motion } from 'framer-motion';
import KptureModal from './capture_modal'
import { Configuration, ConfigurationParameters } from '../api';
import { HTTPHeaders } from '../api'
import { Buffer } from 'buffer';
import { GetConfig } from '../api/helpers/api';
import { ErrorNotif, SucessNotif } from '../misc/notification';




const { Title } = Typography;

export interface DataType {
    key: React.Key;
    name: string;
    profileName: string;
    status: string;
    size: number;
    uuid: string;
    packets: number,
    date: number
}




export interface TableProps {
    Kptures: DataType[],
}
// rowSelection object indicates the need for row selection


export const KpturesTable: React.FC<{ profile: string }> = ({ profile }) => {

    const [captures, setcaptures] = useState<DataType[]>([]);
    const [selectedKpture, setSelectedKpture] = useState<DataType>();
    const [visible, setVisible] = useState(false);


    function OpenKpture(kpture: DataType) {
        setSelectedKpture(kpture)
        setVisible(true)
    }


    function deleteCapture(uuid: string){
        let config =  GetConfig(profile)
        let kptureApi = new KpturesApi(config)
        kptureApi.kptureUuidDelete({uuid:uuid}).then(()=>{
            SucessNotif("Kpture deleted successfully","")
            fetchCaptures()
        }).catch(e=>{
            ErrorNotif("Fail to delete kpture",e)
        })
    }
    function fetchCaptures() {
        let config =  GetConfig(profile)
       
        let kptureApi = new KpturesApi(config)

        kptureApi.kpturesGet({}).then((k: { [key: string]: CaptureKpture; }) => {
            const c: DataType[] = []

            for (var m in k) {
                let kpture = k[m]

                if ( kpture.startTime === undefined  || kpture.uuid === undefined || kpture.profilName === undefined || kpture.name === undefined || kpture.status === undefined) {
                    continue
                }

                if (kpture.captureInfo===undefined){
                    kpture.captureInfo={}
                }

                if (kpture.captureInfo?.size===undefined){
                    kpture.captureInfo.size=0
                }
                if (kpture.captureInfo?.packetNb===undefined){
                    kpture.captureInfo.packetNb=0
                }

                c.push({
                    key: kpture.uuid,
                    size: kpture.captureInfo.size,
                    name: kpture.name,
                    date: kpture.startTime,
                    status: kpture.status,
                    profileName: kpture.profilName,
                    uuid: kpture.uuid,
                    packets: kpture.captureInfo?.packetNb
                })

            }
            console.log(c.length)
            setcaptures(c)
        }).catch((err) => {
            console.log(err)
        })
    }

    function niceBytes(x:number){
        const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
         let l = 0, n = x || 0;
         while(n >= 1024 && ++l){
             n = n/1024;
         }
         return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
       }

    useEffect(() => {
        console.log("fetching captures with profile ", profile)
        fetchCaptures()
    }, [profile])

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Packets',
            dataIndex: 'packets',
        },
        {
            title: 'Size',
            dataIndex: 'size',
            render: (_,r )=> {             
                return niceBytes(r.size) 
            }
        },
        {
            title: 'Date',
            dataIndex: 'date',
                        sorter: (a, b) => a.date - b.date,

            // sorter: (a, b) => {
            //     return new Date(a.date).getTime() - new Date(b.date).getTime()
            // },
            // sortDirections: ['descend'],
            defaultSortOrder: 'descend',
            showSorterTooltip: true,
            render: text => {
                let d = new Date(text * 1000)
                var curr_date = d.getDate();
                var curr_month = d.getMonth();
                var curr_year = d.getFullYear();
                return curr_date + "/" + curr_month + "/" + curr_year + '\t' +d.getHours()+":"+d.getMinutes()
            }
        },

        {
            title: 'Status',
            dataIndex: 'status',
            render: text => {
                var color = "green"
                text === "terminated" ? color = "green" : color = "orange"
                return <Tag color={color} >{text.toUpperCase()}</Tag>
            },
            sorter: (a, b) => a.status.length - b.status.length,
            // sortDirections: ['ascend'],
        
            showSorterTooltip: true
        },
        {
            title: 'Actions',
            dataIndex: 'status',
            render: (_, record) => (
                record.status === "terminated" ?
                <>
                    <Button size="small" type="primary" disabled={record.status === "terminated" ? false : true} style={{marginRight:10}}>
                        <a href={"http://192.168.64.3/kpture/api/v1/captures/" + profile +"/"+record.uuid + "/" + record.name + ".tar"} download>
                            <DownloadOutlined />
                            Download
                        </a>
                    </Button>
                    <Button size="small" type="primary"  danger  onClick={()=>{deleteCapture(record.uuid)}}  disabled={record.status === "terminated" ? false : true}>
                    <DeleteOutlined />
                        Delete
                  
                </Button>
                </>
                    :
                    <Button size="small" type="ghost" onClick={() => { OpenKpture(record) }} disabled={record.status === "terminated" ? true : false}>
                        <UploadOutlined />
                        Open
                    </Button>
            ),
        },
    ];




    return (
        <div>
            <Card style={{ boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.8)", borderRadius: "2px" }}>
                <Table size='middle'
                    columns={columns}
                    pagination={{ pageSize: 100 }}
                    dataSource={captures}
                />
            </Card>

            <KptureModal
                kptureName={selectedKpture?.name!}
                profile={profile}
                visible={visible}
                setvisible={setVisible}
                uuid={selectedKpture?.uuid!}
                key={"test"}
            ></KptureModal>



        </div>
    );
};

export default KpturesTable;