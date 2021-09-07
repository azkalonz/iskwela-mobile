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
import { useStoreState } from "../redux/store";

const ClassMenu: React.FC = () => {
  const history = useHistory();
  const { headerTitle } = useStoreState((states) => states.nonPersistent);
  const { currentClass } = useStoreState((states) => states.classes);
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
            {headerTitle}
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
          src={currentClass?.bg_image || "/class/default.svg"}
        />
        <IonRow className="class-schedule">
          <IonCol>
            <IonText>{currentClass?.date_from}</IonText>
          </IonCol>
          <IonCol>
            <IonText>
              {currentClass?.time_from + " " + currentClass?.time_to}
            </IonText>
          </IonCol>
        </IonRow>
      </IonHeader>
      <IonContent></IonContent>
    </IonMenu>
  );
};

export default ClassMenu;
