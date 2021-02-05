import React, { useEffect, useRef, useCallback, useContext } from "react";
import {
  IonApp,
  IonButton,
  IonContent,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import "./index.css";
import { WebSocketServerContext } from "../../utils/ConstContext";
import BabylonScene from "../../components/BabylonSceneComponents/index";
import ButtonComponents from "../../components/ButtonComponents/index";


const Main: React.FC = () => {
//   const context = useContext(WebSocketServerContext);
//   const onHandleClick = () => {
//     console.log(context);
//     if (context.isOpen) {
//       context.send("whoa");
//       context.sendMessage("hello", { btnEvent: 1 });
//     }
//   };
  return (
    <div className="container">
      {/* <div className="content">img</div> */}
      <div className="content">
        <div className="btn">
          <ButtonComponents name="ok"></ButtonComponents>
        </div>
        <div className="babylon">
          <BabylonScene />
        </div>
      </div>
    </div>
  );
};

export default Main;
