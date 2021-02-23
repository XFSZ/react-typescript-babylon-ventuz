import React from "react";
import { IonApp, IonContent } from "@ionic/react";
import Main from "./pages/Main/index";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

class App extends React.Component {
  // const webSocketServerContext = useContext(WebSocketServerContext)
  constructor(props: object ) {
    super(props);
 let screenOrientation =   ScreenOrientation;
 screenOrientation.lock(screenOrientation.ORIENTATIONS.LANDSCAPE);
 screenOrientation.unlock();
  }
  render() {
    return (
      <IonApp>
        <IonContent>
          <Main></Main>
        </IonContent>
      </IonApp>
    );
  }
}

export default App;
