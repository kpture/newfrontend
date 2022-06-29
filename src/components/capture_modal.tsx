import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { Button, Modal } from 'antd';
import { Select } from 'antd';
import { UserOutlined } from '@ant-design/icons'

import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

const { Option } = Select;

const KptureModal: React.FC<{
    visible: boolean,
    setvisible: React.Dispatch<React.SetStateAction<boolean>>
    kptureName: string,
    profile: string,
    uuid: string,
}> = ({ visible, kptureName, profile, uuid, setvisible }) => {


    useEffect(()=>{
        if (visible===true){
            startWs()
        }
    },[uuid])


    if (visible == false) {
        return (<></>)
    }

 
    function startWs() {
        const ws = new WebSocket("ws://localhost:8080/api/v1/kpture/ws/" + profile + "/" + uuid);
        ws.onopen = (event) => {
          };
        
          ws.onmessage = function (event) {
            const json = JSON.parse(event.data);
            try {
              console.log(json)
            } catch (err) {
              console.log(err);
            }
          };
    }

    return (
        <Modal
            title={kptureName}
            centered
            visible={visible}
            onOk={() => setvisible(false)}
            onCancel={() => setvisible(false)}
            width={1000}
        >
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
        </Modal>
    );
};

export default KptureModal;