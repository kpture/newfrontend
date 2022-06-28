import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React, { useState } from 'react';
import { Card } from 'antd';
import { Button } from 'antd';
import { Typography, Divider } from 'antd';
import { CheckCircleTwoTone, DownloadOutlined, DeleteOutlined, DownCircleTwoTone } from '@ant-design/icons';
import { CopyBlock } from "react-code-blocks";

const { Title } = Typography;


const CapturesPage: React.FC = () => {

    return (
        <div>

            <Card style={{ marginBottom: "40px", boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Title level={3}>Kpture-pfcp</Title>
                    <CheckCircleTwoTone twoToneColor="#4682FF" style={{ fontSize: '40px', }}></CheckCircleTwoTone>
                </div>
                <div>
                    <Title level={5}>22 jun 2022 17:30:56</Title>
                </div>
                <Divider></Divider>
               
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <Button type="primary" icon={<DownloadOutlined />} size={"large"}>
                            Download
                        </Button>
                    </div>
                    <div>
                        <Button type="primary" icon={<DeleteOutlined />} danger size={"large"}>
                            Delete
                        </Button>
                    </div>
                </div>
            </Card>

            <Card style={{ marginBottom: "40px", boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Title level={3}>Kpture-pfcp</Title>
                    <CheckCircleTwoTone twoToneColor="#4682FF" style={{ fontSize: '40px', }}></CheckCircleTwoTone>
                </div>
                <div>
                    <Title level={5}>22 jun 2022 17:30:56</Title>
                </div>
                <Divider></Divider>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <Button type="primary" icon={<DownloadOutlined />} size={"large"}>
                            Download
                        </Button>
                    </div>
                    <div>
                        <Button type="primary" icon={<DeleteOutlined />} danger size={"large"}>
                            Delete
                        </Button>
                    </div>
                </div>
            </Card>
        </div>

    );
};

export default CapturesPage;