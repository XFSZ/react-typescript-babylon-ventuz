import React,{memo} from 'react';
import { ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder,SceneLoader } from '@babylonjs/core';
import "@babylonjs/loaders/glTF";
import './index.css'
// import SceneComponent from 'babylonjs-hook';
import BabylonScene from './BabylonScene'
let box:any;
let camera:any;
const onSceneReady = (scene:any) => {
  // This creates and positions a free camera (non-mesh)
  camera = new ArcRotateCamera("camera1",0,0, 10, new Vector3(0, 0, -10), scene);
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
  box = MeshBuilder.CreateBox("box", {size: 2}, scene);
  // Move the box upward 1/2 its height
  box.position.y = 1;
  // Our built-in 'ground' shape.
  MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);
  SceneLoader.Append("./statics/","BrainStem.gltf",scene,(scene)=>{
      console.log("ok");
  })

}
/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene:any) => {
  if (box !== undefined) {
    var deltaTimeInMillis = scene.getEngine().getDeltaTime();
    const rpm = 10;
    box.rotation.y += ((rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000));
    // console.log("1",camera.beta);
  }
}
 /* <SceneComponent antialias={true}     onSceneReady={onSceneReady} id='my-canvas' onRender={onRender} renderChildrenWhenReady></SceneComponent> */
export default memo(() => (
  <BabylonScene antialias={true}  adaptToDeviceRatio={true}   onSceneReady={onSceneReady} id='my-canvas' onRender={onRender} />
))