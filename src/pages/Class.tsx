import { IonContent, IonPage, IonText } from "@ionic/react";
import React from "react";
import { hasHeader } from "../components/Header";

const Class: React.FC = () => {
  return (
    <IonPage className={hasHeader()}>
      <IonContent>
        <br />
        <IonText>Class Page</IonText>
      </IonContent>
    </IonPage>
  );
};

export default Class;
