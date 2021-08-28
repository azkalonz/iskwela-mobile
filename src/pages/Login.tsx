import { IonButton, IonInput, IonItem, IonLabel, IonPage } from "@ionic/react";
import React from "react";
import { useHistory } from "react-router";
import "./Login.scss";

const Login: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage id="login">
      <div className="login-wrapper">
        <img src="/assets/icon/logo-single.svg" width="80" />
        <h1>Sign in to iSkwela</h1>
        <IonItem className="iskwela-theme">
          <IonLabel position="floating">Email</IonLabel>
          <IonInput clearOnEdit={false} />
        </IonItem>
        <IonItem className="iskwela-theme">
          <IonLabel position="floating">Password</IonLabel>
          <IonInput type="password" clearOnEdit={false} />
        </IonItem>
        <br />
        <br />
        <br />
        <IonButton
          color="secondary"
          class="full"
          onClick={() => {
            history.push("/dashboard");
          }}
        >
          Sign In
        </IonButton>
      </div>
    </IonPage>
  );
};

export default Login;
