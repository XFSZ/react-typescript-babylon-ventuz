import React, { useEffect, useState } from "react";
import "./index.css";
import { WebSocketServerContext } from "../../utils/ConstContext";
import BabylonScene from "../../components/BabylonSceneComponents/index";
import ButtonComponents from "../../components/ButtonComponents/index";
import WebSocketServer from '../../utils/WebSocketTool';
import MsgLabel from '../../components/Label/index'
const Main: React.FC = () => {
//   const context = useContext(WebSocketServerContext);
//   const onHandleClick = () => {
//     console.log(context);
//     if (context.isOpen) {
//       context.send("whoa");
//       context.sendMessage("hello", { btnEvent: 1 });
//     }
//   };
const [webSocketServer , setWebSocketServer] = useState({} as WebSocketServer);
useEffect(()=>{
  const socket = new WebSocketServer("192.168.0.11","4649")
  setWebSocketServer(socket)
},[])
const addWebSocket = (ip:string,port:string) => {
  const socket = new WebSocketServer(ip,port)
  setWebSocketServer(socket)
}
const [msg , setMsg] = useState<string>("ip:port");
const [sceneId , setSceneId] = useState<string>("3dscene");
const getMsg = (msg:string) => {
setMsg(msg);
}

const  changeScene = (sceneId:string)=>{
  setSceneId(sceneId)
}
  return (
    <WebSocketServerContext.Provider value={webSocketServer}>
    <div className="container">
      <MsgLabel msg={msg}  addWebSocket={(ip:string,port:string)=>addWebSocket(ip,port)}></MsgLabel>
      <div className="content">
        <div className="btn">
          <ButtonComponents getMsg={(msg:string)=>getMsg(msg)} changeScene={(sceneId:string)=>changeScene(sceneId)} name="button"></ButtonComponents>
        </div>
        <div className="babylon">
          <BabylonScene  sceneId={sceneId} />
        </div>
      </div>
    </div>
    </WebSocketServerContext.Provider>
  );
};

export default Main;
