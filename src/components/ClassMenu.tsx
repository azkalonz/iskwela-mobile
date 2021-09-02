import {
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonRow,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import React, { useRef } from "react";
import "./MainMenu.scss";
import "./ClassMenu.scss";
import { useHistory } from "react-router";

const ClassMenu: React.FC = () => {
  const history = useHistory();
  const menuRef = useRef<HTMLIonMenuElement>(
    document.createElement("ion-menu")
  );

  return (
    <IonMenu
      side="start"
      menuId="first"
      contentId="router-outlet"
      id="class-menu"
      ref={menuRef}
    >
      <IonHeader>
        <IonToolbar>
          <IonButton
            onClick={() => {
              history.replace("/");
            }}
            color="transparent"
            slot="start"
          >
            <div className="icon-classes" slot="end" style={{ fontSize: 20 }} />
          </IonButton>
          <IonText slot="start" className="class-name">
            English 101
          </IonText>
          <IonButton
            onClick={() => {
              menuRef.current.close();
            }}
            color="transparent"
            slot="end"
          >
            <div
              className="icon-menu-close"
              slot="end"
              style={{ fontSize: 20 }}
            />
          </IonButton>
        </IonToolbar>
        <IonImg
          className="class-cover"
          src="https://iskwela.sgp1.digitaloceanspaces.com/SCHOOL01/public/VJP4bYZByPqp7ytutWosgmWHtXfcLKlJ1OqA9qYf.png"
        />
        <IonRow className="class-schedule">
          <IonCol>
            <IonText>April 1, 2021</IonText>
          </IonCol>
          <IonCol>
            <IonText>10:00 AM - 12:00 PM</IonText>
          </IonCol>
        </IonRow>
      </IonHeader>
      <IonContent></IonContent>
    </IonMenu>
  );
};

export default ClassMenu;
