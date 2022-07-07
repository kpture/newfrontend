import {  notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const openNotificationWithIcon = (type: NotificationType,msg: string, description: string) => {
    notification[type]({
      message:  msg,
      description:
        description,
    });
  };

export function SucessNotif(msg: string, description: string){
    openNotificationWithIcon('success',msg,description)
}
export function ErrorNotif(msg: string, description: string){
    openNotificationWithIcon('error',msg,description)
}