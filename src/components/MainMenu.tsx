import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const MainMenu: React.FC = () => {
  return (
    <IonMenu side="start" menuId="first" contentId="main-content">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle style={{ color: "#ffffff" }}>iSkwela</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Classes</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default MainMenu;
