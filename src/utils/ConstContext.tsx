import React, { createContext, useCallback, useState } from 'react';
import WebSocketServer from './WebSocketTool';
export const WebSocketServerContext = createContext({} as WebSocketServer);


export const buttonName:any  = {
    "globalBase":{code:"globalBase",name:"全国计算基地",num:1},
    "fangshanBase":{code:"fangshanBase",name:"房山云计算基地" ,num:11},
    "waterWay":{code:"waterWay",name:"水路" ,num:112},
    "electroCircuit":{code:"electroCircuit",name:"电路",num:113},
    "webWay":{code:"webWay",name:"网路",num:114},
    "cloudComputingCenter":{code:"cloudComputingCenter",name:"云计算中心",num:115},
    "groundFloorPlan":{code:"groundFloorPlan",name:"首层",num:1152},
    "typicalFloor":{code:"typicalFloor",name:"标准层",num:1153},
    "dieselGeneratesRoom":{code:"dieselGeneratesRoom",name:"柴发室",num:1154},
    "waterElectroWeb":{code:"waterElectroWeb",name:"水电网",num:1155},
    "waterWayBack":{code:"waterWayBack",name:"返回",num:1121},
    "electroCircuitBack":{code:"electroCircuitBack",name:"返回",num:1131},
    "webWayBack":{code:"webWayBack",name:"返回",num:1141},
    "back":{code:"back",name:"返回",num:11551},
    
}
