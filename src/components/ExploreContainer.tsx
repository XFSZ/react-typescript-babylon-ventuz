import React, { useEffect,useRef, useCallback,useContext } from "react";

import "./ExploreContainer.css";
import { WebSocketServerContext } from "../utils/ConstContext";
import BabylonScene from './BabylonSceneComponents/index'
interface ContainerProps {
  name: string;
}


const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  const context = useContext(WebSocketServerContext);
  const onHandleClick = () => {
    console.log(context);
    if (context.isOpen) {
      context.send("whoa");
      context.sendMessage("hello",{btnEvent:1})
    }
  };



  return (
    <div className="container">

     {/* <BabylonScene getMsg /> */}
      <strong onClick={onHandleClick}>{name}</strong>
      <p>
        Explore{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://ionicframework.com/docs/components"
        >
          UI Components
        </a>
      </p>
    </div>
  );
};

export default ExploreContainer;
