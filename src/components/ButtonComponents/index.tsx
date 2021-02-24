import React, {memo, useCallback, useContext, useState } from "react";
import { IonButton } from "@ionic/react";
import "./index.css";
import { WebSocketServerContext } from "../../utils/ConstContext";
import { buttonName } from "../../utils/ConstContext";
interface ContainerProps {
  name: string;
  getMsg: any;
  changeScene: any;
}
const ButtonComponents = memo<ContainerProps>(({
  name,
  getMsg,
  changeScene,
}) => {
  const keys = Object.keys(buttonName);
  const context = useContext(WebSocketServerContext);
  const [delay, setDelay] = useState(false);
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
      if (!delay) {
        setDelay(true); // 点按延迟
        setTimeout(() => {
          setDelay(false);
        }, 2000);
        // 全国
        if (event.code === buttonName.globalBase.code) {
          setStates({
            ...states,
            [buttonName.fangshanBase.code]: true,
            [event.code]: !states[event.code],
          });
          // 房山
        } else if (event.code === buttonName.fangshanBase.code) {
          changeScene(`${[event.code]}`);
          let changeState: any = {};
          let changeShow: any = {};
          for (let i = 0; i < keys.length; i++) {
            const value = keys[i];
            if (
              Math.floor(buttonName[value.toString()].num / 10) === event.num
            ) {
              const newCode = buttonName[value.toString()].code;
              const eventCode = event.code;
              changeShow[newCode.toString()] = true;
              changeState[newCode.toString()] = true;
              changeState[eventCode.toString()] = false;
              changeState[buttonName.globalBase.code] = true;
            }
          }
          if (states[buttonName.fangshanBase.code] === true) {
            changeShow[buttonName.groundFloorPlan.code] = false;
            changeShow[buttonName.typicalFloor.code] = false;
            changeShow[buttonName.dieselGeneratesRoom.code] = false;
            changeShow[buttonName.waterElectroWeb.code] = false;
          }
          setStates({
            ...states,
            ...changeState,
          });
          setShow({ ...show, ...changeShow });
        }
        // 房山子项 
        else {
          let changeState: any = {};
          let changeShow: any = {};
          // 水 电 网 与 云计算中心 互斥
          if(event.code ===buttonName.waterWay.code ||event.code ===buttonName.electroCircuit.code||event.code ===buttonName.webWay.code ){
            //水 电 网三者互斥
            if(event.code ===buttonName.waterWay.code){
              changeState[buttonName.electroCircuit.code] = true;
              changeState[buttonName.webWay.code] = true;
            }
            if(event.code ===buttonName.electroCircuit.code){
              changeState[buttonName.waterWay.code] = true;
              changeState[buttonName.webWay.code] = true;
            }
            if(event.code ===buttonName.webWay.code){
              changeState[buttonName.waterWay.code] = true;
              changeState[buttonName.electroCircuit.code] = true;
            }
            changeShow[buttonName.cloudComputingCenter.code] = false
            changeShow[buttonName.waterWayBack.code] = true;
          }
         // 水电网返回 与 云计算中心 互斥
          if(event.code === buttonName.waterWayBack.code){
            changeShow[buttonName.cloudComputingCenter.code] = true;
          }
          
          //  云计算中心 与 水 电 网 互斥
          if (event.code === buttonName.cloudComputingCenter.code) {
            changeScene(`${[event.code]}`);
            changeState[buttonName.fangshanBase.code] = true;
            changeState[buttonName.groundFloorPlan.code] = true;
            changeState[buttonName.typicalFloor.code] = true;
            changeState[buttonName.dieselGeneratesRoom.code] = true;

            changeShow[buttonName.waterWay.code] = false;
            changeShow[buttonName.electroCircuit.code] = false;
            changeShow[buttonName.webWay.code] = false;
          }

          // 水电网 与 三层互斥
          if (event.code === buttonName.waterElectroWeb.code) {
            changeShow[buttonName.groundFloorPlan.code] = false;
            changeShow[buttonName.typicalFloor.code] = false;
            changeShow[buttonName.dieselGeneratesRoom.code] = false;
          }
          // 三层与 水电网 互斥
          if (
            event.code === buttonName.groundFloorPlan.code ||
            event.code === buttonName.typicalFloor.code ||
            event.code === buttonName.dieselGeneratesRoom.code
          ) {
            // 三层 互斥
              if(event.code ===buttonName.groundFloorPlan.code){
              changeState[buttonName.typicalFloor.code] = true;
              changeState[buttonName.dieselGeneratesRoom.code] = true;
            }
            if(event.code ===buttonName.typicalFloor.code){
              changeState[buttonName.groundFloorPlan.code] = true;
              changeState[buttonName.dieselGeneratesRoom.code] = true;
            }
            if(event.code ===buttonName.dieselGeneratesRoom.code){
              changeState[buttonName.groundFloorPlan.code] = true;
              changeState[buttonName.typicalFloor.code] = true;
            }

            changeShow[buttonName.waterElectroWeb.code] = false;
            changeState[event.code] = false;
            changeState[buttonName.cloudComputingCenter.code] = true;
          }


          // 关闭子节点
          for (let i = 0; i < keys.length; i++) {
            const value = keys[i];
            if (
              Math.floor(buttonName[value.toString()].num / 10) === event.num
            ) {
              const newCode = buttonName[value.toString()].code;
              const eventCode = event.code;
              changeShow[newCode.toString()] = true;
              changeState[eventCode.toString()] = false;
            }
            if (
              event.num % buttonName[value.toString()].num === 1 &&
              Math.floor(event.num / buttonName[value.toString()].num) === 10
            ) {
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
          console.log({[event.code]: states[event.code]})
          context.sendMessage(`${event.code}`, {
            [event.code]: states[event.code],
          });
        }
      }
    },
    [changeScene, context, delay, getMsg, keys, show, states]
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
        
          <div className="childButtonCol">
          <div className="childButtonRow">
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

          </div>
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
          });

export default ButtonComponents;
