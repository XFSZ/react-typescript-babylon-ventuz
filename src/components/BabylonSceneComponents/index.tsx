import React, { memo, useContext } from "react";
import {
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  PointerEventTypes,
  PickingInfo,
  PointerInfo,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import "./index.css";
// import SceneComponent from 'babylonjs-hook';
import BabylonScene from "./BabylonScene";
import { WebSocketServerContext } from "../../utils/ConstContext";
import "@babylonjs/inspector"
import "@babylonjs/core/Debug/debugLayer"
interface Props {
  sceneId: string;
}
// export default memo(() => (
//   <BabylonScene antialias={true}  adaptToDeviceRatio={true}   onSceneReady={onSceneReady} id='my-canvas' onRender={onRender} />
// ))
let offsetX = 0;
let offsetY= 0;
let isTouch = false
const ThreeDScene = memo<Props>(( { sceneId }) => {
  const context = useContext(WebSocketServerContext);

  
  let box: any;
  let camera: any;
  const onSceneReady = (scene: any) => {
    // This creates and positions a free camera (non-mesh)
  //   scene.debugLayer.show({
  //     overlay: true,//覆盖模式打开
  // });
  
    camera = new ArcRotateCamera(
      "camera1",
      0,
      0,
      10,
      new Vector3(0, 0, -10),
      scene
    );
    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());
    const canvas = scene.getEngine().getRenderingCanvas();
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;
    // Our built-in 'box' shape.
    box = MeshBuilder.CreateBox("box", { size: 2 }, scene);
    // Move the box upward 1/2 its height
    box.position.y = 1;
    // Our built-in 'ground' shape.
    let ground =  MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene);
    // SceneLoader.Append("./statics/", "BrainStem.gltf", scene, (scene) => {
    //   console.log("ok");
    // });
     // Events
     let fingerCount = 0
     scene.onPointerUp = (e:any,pickInfo: PickingInfo, type: PointerEventTypes) => {
      fingerCount --;
     if(fingerCount ===0){
      isTouch =false
     }
   
     }
     scene.onPointerDown = (e:any,pickInfo: PickingInfo, type: PointerEventTypes) => {
      fingerCount ++;
     
        isTouch =true
    
   
    }
     scene.onPointerMove = (e:any,pickInfo: PickingInfo, type: PointerEventTypes) => {
      console.log(offsetX,offsetY)
  
             if(e.buttons===2){
             // console.log(e,pickInfo,type)
            // console.log(e)
              offsetX = offsetX + e.movementX
              offsetY =offsetY + e.movementY

             }
             if(e.pointerType==="touch" && fingerCount ===2){
              offsetX = offsetX + e.movementX
              offsetY =offsetY + e.movementY

             }

  }
  function PointerInfo(pointerInfo:PointerInfo){
    console.log(isTouch)
    if (context.isOpen && isTouch) {
      context.sendMessage(`${sceneId}`, {
        radius: scene.cameras[0].radius,
        alpha: scene.cameras[0].alpha,
        beta: scene.cameras[0].beta,
        target: {
          x: offsetX,
          y: offsetY,
          z: scene.cameras[0].target.z,
        },
        position: {
          x: scene.cameras[0].position.x,
          y: scene.cameras[0].position.y,
          z: scene.cameras[0].position.z,
        },
      });
    }
  }
  scene.onPointerObservable.add(PointerInfo)
  };
  const onRender = (scene: any) => {
    //if (box !== undefined) {
     // var deltaTimeInMillis = scene.getEngine().getDeltaTime();
      //const rpm = 10;
      //box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
      //  console.log("1",camera.beta);
   // }
    //console.log(scene.pointerX)
    // target: {
    //   x: scene.cameras[0].target.x,
    //   y: scene.cameras[0].target.y,
    //   z: scene.cameras[0].target.z,
    // },

  };

  return (
    <BabylonScene
      antialias={true}
      adaptToDeviceRatio={true}
      onSceneReady={onSceneReady}
      id="my-canvas"
      onRender={onRender}
    />
  );
});
export default ThreeDScene;
