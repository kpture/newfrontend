import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import { ArrowUpOutlined, LoadingOutlined, CheckOutlined, PauseOutlined, DownloadOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, Modal, notification, Spin, Button, Select } from 'antd';
import { Configuration, KpturesApi } from '../api';
import { GetConfig } from '../api/helpers/api'

const KptureModal: React.FC<{
  visible: boolean,
  setvisible: React.Dispatch<React.SetStateAction<boolean>>
  kptureName: string,
  profile: string,
  uuid: string,
}> = ({ visible, kptureName, profile, uuid, setvisible }) => {

  const [packetNb, setpacketNb] = useState<number>(0);
  const [kptureSize, setkptureSize] = useState<number>(0);
  const [KptureStatus, setKptureStatus] = useState<string>("running");

  const wsRef = useRef<WebSocket>();


  useEffect(() => {
    if (visible) {
      console.log("starting WS")
      startWs()
    }
  }, [uuid])


  if (visible == false) {
    return (<></>)
  }


  type NotificationType = 'success' | 'info' | 'warning' | 'error';

  const openNotificationWithIcon = (type: NotificationType) => {
    notification[type]({
      message: 'Kpture Started',
      description:
        '',
    });
  };

  function startWs() {
    wsRef.current = new WebSocket("ws://192.168.64.3/kpture/api/v1/kpture/ws/" + profile + "/" + uuid)

    wsRef.current.addEventListener('open', function (event) {
      console.log('connected');
      openNotificationWithIcon('success')
    });

    wsRef.current.onmessage = function (event) {
      const json = JSON.parse(event.data);
      try {
        console.log(json)
        if (json.captureInfo.size !== undefined) {
          setkptureSize(json.captureInfo.size)
        }
        if (json.captureInfo.packetNb !== undefined) {
          setpacketNb(json.captureInfo.packetNb)
        }
      } catch (err) {
        console.log(err);
      }
    };
  }


  function stopCapture() {
    let config = GetConfig(profile)
    let kptureApi = new KpturesApi(config)
    kptureApi.kptureUuidStopPut({ uuid: uuid }).then((result) => {
      setKptureStatus("terminated")
      wsRef.current?.close()
    }).catch((error: any) => {
      console.log(error)
    })
  }



  const handleCancel = () => {
    wsRef.current?.close()
    setpacketNb(0)
    setKptureStatus("")
    setkptureSize(0)
    setvisible(false);
  };

  return (
    <Modal
      onCancel={handleCancel}
      title={KptureStatus === "terminated" ?
        <><CheckOutlined style={{ paddingRight: 10 }} /> {kptureName}</> :
        <> <Spin style={{ paddingRight: 10 }} />{kptureName}</>
      }
      centered
      visible={visible}
      footer={[
        <Button onClick={stopCapture} size="large" type="primary" disabled={KptureStatus === "terminated" ? true : false}>
          <PauseOutlined />
          Stop
        </Button>,
        <Button size="large" type="primary" disabled={KptureStatus === "terminated" ? false : true}>
          <a href={"http://"+window.location.host+"/kpture/api/v1/captures/" + profile + "/" + uuid + "/" + kptureName + ".tar"} download>
            <DownloadOutlined />
            Download
          </a>
        </Button>
      ]}
      width={1000}
    >
      <Row>
        <Col flex={2}>
          <Card style={{ margin: 4, boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)", borderRadius: "2px" }}>
            <Statistic
              title="Packet counter"
              value={packetNb}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col flex={2}>
          <Card style={{ margin: 4, boxShadow: "5px 8px 24px 5px rgba(208, 216, 243, 0.6)", borderRadius: "2px" }}>
            <Statistic
              title="Kpture size (bytes)"
              value={kptureSize}
            />
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

export default KptureModal;