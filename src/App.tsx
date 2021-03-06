import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import { StoreProvider } from "easy-peasy";
import { Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import Class from "./pages/Class";
import Home from "./pages/Home";
import Login from "./pages/Login";
/* Theme variables */
import "./theme/variables.css";
import store from "./redux/store";

const App: React.FC = () => {
  return (
    <IonApp>
      <StoreProvider store={store}>
        <IonReactRouter>
          <Header />
          <IonRouterOutlet id="router-outlet">
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/class/:class_id?" component={Class} />
          </IonRouterOutlet>
        </IonReactRouter>
      </StoreProvider>
    </IonApp>
  );
};

export default App;
