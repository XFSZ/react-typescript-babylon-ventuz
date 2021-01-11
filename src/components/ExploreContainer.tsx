import React, { useEffect, useContext } from "react";
//import React from 'react';
import "./ExploreContainer.css";
//import WebSocketServer from "../utils/WebSocketTool";
import { WebSocketServerContext } from "../utils/ConstContext";
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
      {/* <strong >{name}</strong> */}
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
