import React, { createContext, useCallback, useState } from 'react';
import WebSocketServer from './WebSocketTool';
export const WebSocketServerContext = createContext({} as WebSocketServer);


export const buttonName = {
    "globalBase":{code:"globalBase",name:"全国计算基地"},
    "fangshanBase":{code:"fangshanBase",name:"房山云计算基地"},
    "waterWay":{code:"waterWay",name:"水路"},
    "electroCircuit":{code:"electroCircuit",name:"电路"},
    "webWay":{code:"webWay",name:"网路"},
    "cloudComputingCenter":{code:"cloudComputingCenter",name:"云计算中心"},
    "groundFloorPlan":{code:"groundFloorPlan",name:"首层"},
    "typicalFloor":{code:"typicalFloor",name:"标准层"},
    "dieselGeneratesRoom":{code:"dieselGeneratesRoom",name:"柴发室"},
    "waterElectroWeb":{code:"waterElectroWeb",name:"水电网"},
    "waterWayBack":{code:"waterWayBack",name:"返回"},
    "electroCircuitBack":{code:"electroCircuitBack",name:"返回"},
    "webWayBack":{code:"webWayBack",name:"返回"},
    "back":{code:"back",name:"返回"},
    
}
