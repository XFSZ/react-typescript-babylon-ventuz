import React, { useEffect, useRef, useCallback, useContext,useState } from "react";
import {  IonButton } from "@ionic/react";
import "./index.css";
import { WebSocketServerContext } from "../../utils/ConstContext";
import { buttonName } from "../../utils/ConstContext";
interface ContainerProps {
  name: string;
  getMsg:any;
}
const ButtonComponents: React.FC<ContainerProps> = ({ name ,getMsg}) => {
  const context = useContext(WebSocketServerContext);
  const [states , setStates] = useState({        
    [buttonName.globalBase.code]:true,
    [buttonName.fangshanBase.code]:true,
    [buttonName.waterWay.code]:true,
    [buttonName.waterWayBack.code]:true,
    [buttonName.electroCircuit.code]:true,
    [buttonName.electroCircuitBack.code]:true,
    [buttonName.webWay.code]:true,
    [buttonName.webWayBack.code]:true,
    [buttonName.cloudComputingCenter.code]:true,
    [buttonName.groundFloorPlan.code]:true,
    [buttonName.typicalFloor.code]:true,
    [buttonName.dieselGeneratesRoom.code]:true,
    [buttonName.waterElectroWeb.code]:true,
    [buttonName.back.code]:true,

  })

  const onHandleClick =useCallback ((event:any) => {
    setStates({...states, [event]:!states[event]})
    getMsg( `${[event]}: ${states[event]}`)
    if (context.isOpen) {
   //   context.send("whoa");
      context.sendMessage(`${event}`, { [event]: states[event] });
    }
    
  },[context, getMsg, states]);


  return (
    <div className="mainbutton">
      <IonButton color="new" disabled={!states[buttonName.globalBase.code]} onClick={()=>{onHandleClick(buttonName.globalBase.code)}} >{buttonName.globalBase.name}</IonButton>
      <div className="childButtonCol">
        <IonButton disabled={!states[buttonName.fangshanBase.code]} onClick={()=>{onHandleClick(buttonName.fangshanBase.code)}}  color="new">{buttonName.fangshanBase.name}</IonButton>
        <div className="childButtonRow">
          <div className="childButtonCol">
            <IonButton disabled={!states[buttonName.waterWay.code]} onClick={()=>{onHandleClick(buttonName.waterWay.code)}} color="new">{buttonName.waterWay.name}</IonButton>
            <IonButton onClick={()=>{onHandleClick(buttonName.waterWayBack.code)}} color="new">{buttonName.waterWayBack.name}</IonButton>
          </div>
          <div className="childButtonCol">
            <IonButton disabled={!states[buttonName.electroCircuit.code]} onClick={()=>{onHandleClick(buttonName.electroCircuit.code)}} color="new">{buttonName.electroCircuit.name}</IonButton>
            <IonButton onClick={()=>{onHandleClick(buttonName.electroCircuitBack.code)}} color="new">{buttonName.electroCircuitBack.name}</IonButton>
          </div>
          <div className="childButtonCol">
            <IonButton disabled={!states[buttonName.webWay.code]} onClick={()=>{onHandleClick(buttonName.webWay.code)}} color="new">{buttonName.webWay.name}</IonButton>
            <IonButton onClick={()=>{onHandleClick(buttonName.webWayBack.code)}} color="new">{buttonName.webWayBack.name}</IonButton>
          </div>
        </div>
      </div>
      <div className="childButtonCol">
        <IonButton disabled={!states[buttonName.cloudComputingCenter.code]} onClick={()=>{onHandleClick(buttonName.cloudComputingCenter.code)}} color="new">{buttonName.cloudComputingCenter.name}</IonButton>
        <IonButton disabled={!states[buttonName.groundFloorPlan.code]} onClick={()=>{onHandleClick(buttonName.groundFloorPlan.code)}} color="new">{buttonName.groundFloorPlan.name}</IonButton>
        <IonButton disabled={!states[buttonName.typicalFloor.code]} onClick={()=>{onHandleClick(buttonName.typicalFloor.code)}} color="new">{buttonName.typicalFloor.name}</IonButton>
        <IonButton disabled={!states[buttonName.dieselGeneratesRoom.code]} onClick={()=>{onHandleClick(buttonName.dieselGeneratesRoom.code)}} color="new">{buttonName.dieselGeneratesRoom.name}</IonButton>
        <div className="childButtonRow">
          <IonButton disabled={!states[buttonName.waterElectroWeb.code]} onClick={()=>{onHandleClick(buttonName.waterElectroWeb.code)}} color="new">{buttonName.waterElectroWeb.name}</IonButton>
          <IonButton onClick={()=>{onHandleClick(buttonName.back.code)}} color="new">{buttonName.back.name}</IonButton>
        </div>
      </div>
    </div>
  );
};

export default ButtonComponents;
