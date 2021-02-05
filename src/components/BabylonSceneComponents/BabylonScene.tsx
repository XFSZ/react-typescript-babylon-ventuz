import { Engine, Scene } from '@babylonjs/core'
import  React ,{useRef,useEffect} from 'react';
import "@babylonjs/loaders/glTF";
import './index.css'
export default (props :any) => {

  const reactCanvas = useRef(null);
  const { antialias, engineOptions, adaptToDeviceRatio, sceneOptions, onRender, onSceneReady, ...rest } = props;
  useEffect(() => {
      if (reactCanvas.current) {
          const engine = new Engine(reactCanvas.current, antialias, engineOptions, adaptToDeviceRatio);
          const scene = new Scene(engine, sceneOptions);
          if (scene.isReady()) {
              props.onSceneReady(scene)
        
          } else {
              scene.onReadyObservable.addOnce(scene => {props.onSceneReady(scene); });
          }
         
          engine.runRenderLoop(() => {
             scene.getEngine().resize();
              if (typeof onRender === 'function') {
                  onRender(scene);
              }
              scene.render();
          })
          const resize = () => {
              scene.getEngine().resize();
          }
          if (window) {
              window.addEventListener('resize', resize);
          }
          return () => {
              scene.getEngine().dispose();
              if (window) {
                  window.removeEventListener('resize', resize);
              }
          }
      }
  }, [adaptToDeviceRatio, antialias, engineOptions, onRender, props, reactCanvas, sceneOptions])
  return (
      <canvas width='100%' height='100%' ref={reactCanvas} {...rest}  />
  );
}