import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  DatePicker,
  Divider,
} from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const FormDisabledDemo = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setComponentDisabled(disabled);
  };

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{ disabled: componentDisabled }}
      onValuesChange={onFormLayoutChange}
      disabled={componentDisabled}
    >
          <Title level={3}>Settings</Title>
          <Divider></Divider>
      <Form.Item>
        <Input size="large" placeholder='Kpture name'/>
      </Form.Item>
      <Form.Item>
        <TextArea size="large" rows={4} placeholder='Kpture description' />
      </Form.Item>
      <Form.Item >
        <Button type="primary" htmlType="submit">
          Start
        </Button>
      </Form.Item>
    </Form>
  );
};

export default () => <FormDisabledDemo />;