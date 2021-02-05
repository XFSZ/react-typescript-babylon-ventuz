import React, { useEffect, useRef, useCallback, useContext } from "react";
import { IonApp, IonButton, IonContent, IonIcon, IonLabel } from "@ionic/react";
import "./index.css";
import { WebSocketServerContext } from "../../utils/ConstContext";
import { buttonName } from "../../utils/ConstContext";
interface ContainerProps {
  name: string;
}
const ButtonComponents: React.FC<ContainerProps> = ({ name }) => {
  const context = useContext(WebSocketServerContext);
  const onHandleClick = () => {
    console.log(context);
    if (context.isOpen) {
      context.send("whoa");
      context.sendMessage("hello", { btnEvent: 1 });
    }
  };

  return (
    <div className="mainbutton">
      <IonButton color="new" disabled={true} >{buttonName.globalBase.name}</IonButton>
      <div className="childButtonCol">
        <IonButton color="new">{buttonName.fangshanBase.name}</IonButton>
        <div className="childButtonRow">
          <div className="childButtonCol">
            <IonButton color="new">{buttonName.waterWay.name}</IonButton>
            <IonButton color="new">{buttonName.waterWayBack.name}</IonButton>
          </div>
          <div className="childButtonCol">
            <IonButton color="new">{buttonName.electroCircuit.name}</IonButton>
            <IonButton color="new">{buttonName.electroCircuitBack.name}</IonButton>
          </div>
          <div className="childButtonCol">
            <IonButton color="new">{buttonName.webWay.name}</IonButton>
            <IonButton color="new">{buttonName.webWayBack.name}</IonButton>
          </div>
        </div>
      </div>
      <div className="childButtonCol">
        <IonButton color="new">{buttonName.cloudComputingCenter.name}</IonButton>
        <IonButton color="new">{buttonName.groundFloorPlan.name}</IonButton>
        <IonButton color="new">{buttonName.typicalFloor.name}</IonButton>
        <IonButton color="new">{buttonName.dieselGeneratesRoom.name}</IonButton>
        <div className="childButtonRow">
          <IonButton color="new">{buttonName.waterElectroWeb.name}</IonButton>
          <IonButton color="new">{buttonName.back.name}</IonButton>
        </div>
      </div>
    </div>
  );
};

export default ButtonComponents;
