
import './App.css';
import { Col, Row } from 'antd';
import AgentTable from './components/table'
import KptureHeader from './components/header'
import FormDisabledDemo from './components/form'
import CapturesPage from './components/captures'
import { AnimatePresence } from 'framer-motion';

import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

function App() {
  return (
    <div>
      <KptureHeader></KptureHeader>

    <div style={{margin: "auto", width:"50vw",marginTop:"50px"}}> 

      <Routes>
        <Route path="/dashboard" element={
          <AgentTable></AgentTable>
     
       }
         />
        <Route path="/captures" element={
          <CapturesPage></CapturesPage>
        } />
        <Route path="/" element={<Navigate replace to="/dashboard" />} />

      </Routes>
      </div>



    </div>
  );
}

export default App;
