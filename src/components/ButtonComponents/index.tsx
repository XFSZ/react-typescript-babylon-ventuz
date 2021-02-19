import React, {
  useCallback,
  useContext,
  useState,
} from "react";
import { IonButton } from "@ionic/react";
import "./index.css";
import { WebSocketServerContext } from "../../utils/ConstContext";
import { buttonName } from "../../utils/ConstContext";
interface ContainerProps {
  name: string;
  getMsg: any;
}
const ButtonComponents: React.FC<ContainerProps> = ({ name, getMsg }) => {
  const keys = Object.keys(buttonName);
  const context = useContext(WebSocketServerContext);
  const [states, setStates] = useState({
    [buttonName.globalBase.code]: false,
    [buttonName.fangshanBase.code]: true,
    [buttonName.waterWay.code]: true,
    [buttonName.waterWayBack.code]: true,
    [buttonName.electroCircuit.code]: true,
    [buttonName.electroCircuitBack.code]: true,
    [buttonName.webWay.code]: true,
    [buttonName.webWayBack.code]: true,
    [buttonName.cloudComputingCenter.code]: true,
    [buttonName.groundFloorPlan.code]: true,
    [buttonName.typicalFloor.code]: true,
    [buttonName.dieselGeneratesRoom.code]: true,
    [buttonName.waterElectroWeb.code]: true,
    [buttonName.back.code]: true,
  });
  const [show, setShow] = useState({
    [buttonName.globalBase.code]: true,
    [buttonName.fangshanBase.code]: true,
    [buttonName.waterWay.code]: false,
    [buttonName.waterWayBack.code]: false,
    [buttonName.electroCircuit.code]: false,
    [buttonName.electroCircuitBack.code]: false,
    [buttonName.webWay.code]: false,
    [buttonName.webWayBack.code]: false,
    [buttonName.cloudComputingCenter.code]: false,
    [buttonName.groundFloorPlan.code]: false,
    [buttonName.typicalFloor.code]: false,
    [buttonName.dieselGeneratesRoom.code]: false,
    [buttonName.waterElectroWeb.code]: false,
    [buttonName.back.code]: false,
  });

  const onHandleClick = useCallback(
    (event: any) => {
      if (event.num === 1) {
        setStates({
          ...states,
          [buttonName.fangshanBase.code]: true,
          [event.code]: !states[event.code],
        });
      } else if (event.num === 11) {
        let changeState: any = {};
        let changeShow: any = {};
        for (let i = 0; i < keys.length; i++) {
          const value = keys[i];
          if (Math.floor(buttonName[value.toString()].num / 10) === event.num) {
            const newCode = buttonName[value.toString()].code;
            const eventCode = event.code;
            changeShow[newCode.toString()] = true;
            changeState[newCode.toString()] = true
            changeState[eventCode.toString()] = false
            changeState[buttonName.globalBase.code] = true
          }
        }
        if(states[buttonName.fangshanBase.code] ===true){
          changeShow[buttonName.groundFloorPlan.code] = false
          changeShow[buttonName.typicalFloor.code] = false
          changeShow[buttonName.dieselGeneratesRoom.code] = false
          changeShow[buttonName.waterElectroWeb.code] = false
        }
        setStates({
          ...states,
     ...changeState
        });
        setShow({ ...show, ...changeShow });
      } else {
        let changeState: any = {};
        let changeShow: any = {};

        if(event.code ===buttonName.waterWay.code ||event.code ===buttonName.electroCircuit.code||event.code ===buttonName.webWay.code ){
          changeShow[buttonName.cloudComputingCenter.code] = false
        }
        if(event.code ===buttonName.webWayBack.code ||event.code ===buttonName.waterWayBack.code||event.code ===buttonName.electroCircuitBack.code ){
          if(show[buttonName.webWayBack.code] === true && show[buttonName.waterWayBack.code] === false && show[buttonName.electroCircuitBack.code] === false){
            changeShow[buttonName.cloudComputingCenter.code] = true
          }
          if(show[buttonName.webWayBack.code] === false && show[buttonName.waterWayBack.code] === true && show[buttonName.electroCircuitBack.code] === false){
            changeShow[buttonName.cloudComputingCenter.code] = true
          }
          if(show[buttonName.webWayBack.code] === false && show[buttonName.waterWayBack.code] === false && show[buttonName.electroCircuitBack.code] === true){
            changeShow[buttonName.cloudComputingCenter.code] = true
          }
        }
        if(event.code ===buttonName.cloudComputingCenter.code){
          changeState[buttonName.fangshanBase.code]= true
          changeState[buttonName.groundFloorPlan.code] = true
          changeState[buttonName.typicalFloor.code] = true
          changeState[buttonName.dieselGeneratesRoom.code] = true
        
          changeShow[buttonName.waterWay.code] = false
          changeShow[buttonName.electroCircuit.code] = false
          changeShow[buttonName.webWay.code] = false
        }

        if(event.code ===buttonName.waterElectroWeb.code){
          changeShow[buttonName.groundFloorPlan.code] = false
          changeShow[buttonName.typicalFloor.code] = false
          changeShow[buttonName.dieselGeneratesRoom.code] = false
        }
        if(event.code ===buttonName.groundFloorPlan.code ||event.code ===buttonName.typicalFloor.code||event.code ===buttonName.dieselGeneratesRoom.code ){
          changeShow[buttonName.waterElectroWeb.code] = false
          changeState[event.code] = false
          changeState[buttonName.cloudComputingCenter.code] = true
        }
        if(event.code ===buttonName.groundFloorPlan.code ||event.code ===buttonName.typicalFloor.code||event.code ===buttonName.dieselGeneratesRoom.code ){
          changeShow[buttonName.waterElectroWeb.code] = false
          changeState[event.code] = false
          changeState[buttonName.cloudComputingCenter.code] = true
        }
        for (let i = 0; i < keys.length; i++) {
          const value = keys[i];
          if (Math.floor(buttonName[value.toString()].num / 10) === event.num) {
            const newCode = buttonName[value.toString()].code;
            const eventCode = event.code;
            changeShow[newCode.toString()] = true;
            changeState[eventCode.toString()] = false;
          }
          if (event.num % buttonName[value.toString()].num === 1 && Math.floor( event.num/ buttonName[value.toString()].num ) === 10) {
            const newCode = buttonName[value.toString()].code;
            const eventCode = event.code;
            changeState[newCode.toString()] = true;
            changeShow[newCode.toString()] = true;
            changeShow[eventCode.toString()] = false;
          }
        }
 
        setStates({
          ...states,
          ...changeState,
        });
        setShow({ ...show, ...changeShow });
      }
      getMsg(`${[event.code]}: ${states[event.code]}`);
      if (context.isOpen) {
        context.sendMessage(`${event.code}`, {
          [event.code]: states[event.code],
        });
      }
    },
    [context, getMsg, keys, show, states]
  );

  return (
    <div className="mainbutton">
      <IonButton
        color="new"
        disabled={!states[buttonName.globalBase.code]}
        onClick={() => {
          onHandleClick(buttonName.globalBase);
        }}
      >
        {buttonName.globalBase.name}
      </IonButton>

      <div className="childButtonCol">
        <IonButton
          disabled={!states[buttonName.fangshanBase.code]}
          onClick={() => {
            onHandleClick(buttonName.fangshanBase);
          }}
          color="new"
        >
          {buttonName.fangshanBase.name}
        </IonButton>
        <div className="childButtonRow">
          <div className="childButtonCol">
            {show[buttonName.waterWay.code] ? (
              <IonButton
                disabled={!states[buttonName.waterWay.code]}
                onClick={() => {
                  onHandleClick(buttonName.waterWay);
                }}
                color="new"
              >
                {buttonName.waterWay.name}
              </IonButton>
            ) : (
              <></>
            )}
            {show[buttonName.waterWayBack.code] ? (
              <IonButton
                onClick={() => {
                  onHandleClick(buttonName.waterWayBack);
                }}
                color="new"
              >
                {buttonName.waterWayBack.name}
              </IonButton>
            ) : (
              <></>
            )}
          </div>
          <div className="childButtonCol">
            {show[buttonName.electroCircuit.code] ? (
              <IonButton
                disabled={!states[buttonName.electroCircuit.code]}
                onClick={() => {
                  onHandleClick(buttonName.electroCircuit);
                }}
                color="new"
              >
                {buttonName.electroCircuit.name}
              </IonButton>
            ) : (
              <></>
            )}
            {show[buttonName.electroCircuitBack.code] ? (
              <IonButton
                onClick={() => {
                  onHandleClick(buttonName.electroCircuitBack);
                }}
                color="new"
              >
                {buttonName.electroCircuitBack.name}
              </IonButton>
            ) : (
              <></>
            )}
          </div>
          <div className="childButtonCol">
            {show[buttonName.webWay.code] ? (
              <IonButton
                disabled={!states[buttonName.webWay.code]}
                onClick={() => {
                  onHandleClick(buttonName.webWay);
                }}
                color="new"
              >
                {buttonName.webWay.name}
              </IonButton>
            ) : (
              <></>
            )}
            {show[buttonName.webWayBack.code] ? (
              <IonButton
                onClick={() => {
                  onHandleClick(buttonName.webWayBack);
                }}
                color="new"
              >
                {buttonName.webWayBack.name}
              </IonButton>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="childButtonCol">
        {show[buttonName.cloudComputingCenter.code] ? (
          <IonButton
            disabled={!states[buttonName.cloudComputingCenter.code]}
            onClick={() => {
              onHandleClick(buttonName.cloudComputingCenter);
            }}
            color="new"
          >
            {buttonName.cloudComputingCenter.name}
          </IonButton>
        ) : (
          <></>
        )}
        {show[buttonName.groundFloorPlan.code] ? (
          <IonButton
            disabled={!states[buttonName.groundFloorPlan.code]}
            onClick={() => {
              onHandleClick(buttonName.groundFloorPlan);
            }}
            color="new"
          >
            {buttonName.groundFloorPlan.name}
          </IonButton>
        ) : (
          <></>
        )}
        {show[buttonName.typicalFloor.code] ? (
          <IonButton
            disabled={!states[buttonName.typicalFloor.code]}
            onClick={() => {
              onHandleClick(buttonName.typicalFloor);
            }}
            color="new"
          >
            {buttonName.typicalFloor.name}
          </IonButton>
        ) : (
          <></>
        )}
        {show[buttonName.dieselGeneratesRoom.code] ? (
          <IonButton
            disabled={!states[buttonName.dieselGeneratesRoom.code]}
            onClick={() => {
              onHandleClick(buttonName.dieselGeneratesRoom);
            }}
            color="new"
          >
            {buttonName.dieselGeneratesRoom.name}
          </IonButton>
        ) : (
          <></>
        )}
        <div className="childButtonRow">
          {show[buttonName.waterElectroWeb.code] ? (
            <IonButton
              disabled={!states[buttonName.waterElectroWeb.code]}
              onClick={() => {
                onHandleClick(buttonName.waterElectroWeb);
              }}
              color="new"
            >
              {buttonName.waterElectroWeb.name}
            </IonButton>
          ) : (
            <></>
          )}
          {show[buttonName.back.code] ? (
            <IonButton
              onClick={() => {
                onHandleClick(buttonName.back);
              }}
              color="new"
            >
              {buttonName.back.name}
            </IonButton>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default ButtonComponents;
