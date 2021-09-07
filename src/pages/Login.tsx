import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  useIonLoading,
  useIonToast,
} from "@ionic/react";
import React, { useRef } from "react";
import { useHistory } from "react-router";
import { useStoreActions } from "../redux/store";
import "./Login.scss";

const Login: React.FC = () => {
  const history = useHistory();
  const [present] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();
  const usernameRef = useRef<HTMLIonInputElement>(
    document.createElement("ion-input")
  );
  const passwordRef = useRef<HTMLIonInputElement>(
    document.createElement("ion-input")
  );
  const { setAccessToken, login } = useStoreActions(
    (states) => states.userStorage
  );

  const handleLogin = async () => {
    const username = usernameRef.current.value + "";
    const password = passwordRef.current.value + "";
    presentLoading();
    login({
      username,
      password,
      success: () => {
        history.push("/");
        dismissLoading();
      },
      fail: (error) => {
        if (error.response) {
          if (error.response.status === 401) {
            present("Invalid Username/Password", 2000);
          } else {
            present("Something went wrong. Please try again.");
          }
          dismissLoading();
        }
      },
    });
  };

  return (
    <IonPage id="login">
      <div className="login-wrapper">
        <img src="/assets/icon/logo-single.svg" width="80" />
        <h1>Sign in to iSkwela</h1>
        <IonItem className="iskwela-theme">
          <IonLabel position="floating">Username</IonLabel>
          <IonInput clearOnEdit={false} ref={usernameRef} />
        </IonItem>
        <IonItem className="iskwela-theme">
          <IonLabel position="floating">Password</IonLabel>
          <IonInput type="password" clearOnEdit={false} ref={passwordRef} />
        </IonItem>
        <br />
        <br />
        <br />
        <IonButton
          color="secondary"
          class="full"
          onClick={() => {
            handleLogin();
          }}
        >
          Sign In
        </IonButton>
      </div>
    </IonPage>
  );
};

export default Login;
