import React, { useState } from "react";
import {
  IonModal,
  IonButton,
  IonInput,
  IonItem,
  IonList,
  IonLabel,
  IonText,
} from "@ionic/react";
import "./index.css";
interface ContainerProps {
  addWebSocket: any;
  msg: any;
}

const MsgLabel: React.FC<ContainerProps> = (props: ContainerProps) => {
  const [showModal, setShowModal] = useState(false);
  const [ip, setIp] = useState<string>();
  const [port, setPort] = useState<string>();

  const onHandleClick = () => {
    setShowModal(false);
    props.addWebSocket(ip, port);
  };

  return (
    <div className="msglabel">
      <IonModal
        onDidDismiss={() => setShowModal(false)}
        isOpen={showModal}
        cssClass="my-custom-class"
      >
        <div className="modalcontext">
          <IonList>
            <IonItem>
              <IonLabel>IP地址：</IonLabel>
              <IonInput
                value={ip}
                onIonChange={(e) => setIp(e.detail.value!)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>端口号：</IonLabel>
              <IonInput
                value={port}
                onIonChange={(e) => setPort(e.detail.value!)}
              ></IonInput>
            </IonItem>
          </IonList>
        </div>
        <IonButton onClick={() => onHandleClick()}>确认</IonButton>
      </IonModal>
      <IonText onClick={() => setShowModal(true)} color="primary">
        <p>{props.msg}</p>
      </IonText>
    </div>
  );
};

export default MsgLabel;
