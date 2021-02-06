import React, { useEffect, useRef, useCallback, useContext,useState } from "react";
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

  return (
    <WebSocketServerContext.Provider value={webSocketServer}>
    <div className="container">
      <MsgLabel addWebSocket={(ip:string,port:string)=>addWebSocket(ip,port)}></MsgLabel>
      <div className="content">
        <div className="btn">
          <ButtonComponents name="ok"></ButtonComponents>
        </div>
        <div className="babylon">
          <BabylonScene />
        </div>
      </div>
    </div>
    </WebSocketServerContext.Provider>
  );
};

export default Main;
