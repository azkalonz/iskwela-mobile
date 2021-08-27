import { IonButton, IonInput, IonItem, IonLabel, IonPage } from "@ionic/react";
import React from "react";
import "./Login.scss";

const Login: React.FC = () => {
  return (
    <IonPage id="login">
      <img src="/assets/icon/logo-single.svg" width="80" />
      <h1>Sign in to iSkwela</h1>
      <IonItem>
        <IonLabel position="floating">Email</IonLabel>
        <IonInput clearOnEdit={false} />
      </IonItem>
      <IonItem>
        <IonLabel position="floating">Password</IonLabel>
        <IonInput type="password" clearOnEdit={false} />
      </IonItem>
      <br />
      <br />
      <br />
      <IonButton color="secondary">Sign In</IonButton>
    </IonPage>
  );
};

export default Login;
