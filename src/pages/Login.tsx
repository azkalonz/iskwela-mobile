import { IonInput, IonItem, IonLabel, IonPage } from "@ionic/react";
import React from "react";
import "./Login.scss";

const Login: React.FC = () => {
  return (
    <IonPage id="login">
      <img src="/assets/icon/logo-single.svg" width="80" />
      <h1>Sign in to iSkwela</h1>
    </IonPage>
  );
};

export default Login;
