import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonToolbar,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import React, { useRef } from "react";
import { useHistory } from "react-router";
import "./MainMenu.scss";

const MainMenu: React.FC = () => {
  const history = useHistory();
  const menuRef = useRef(document.createElement("ion-menu"));

  return (
    <IonMenu side="start" menuId="first" contentId="main-content" ref={menuRef}>
      <IonHeader className="no-shadow">
        <IonToolbar>
          <img
            className="logo"
            src="/logo/logo-full-colored.svg"
            width="120"
            alt="iSkwela"
          />
          <IonButton
            onClick={() => {
              menuRef.current.close();
            }}
            color="transparent"
            slot="end"
          >
            <IonIcon icon={closeOutline} slot="end" size="large" />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList lines="none">
          <IonItem
            className={history.location.pathname === "/" ? "selected" : ""}
          >
            <div className="icon">
              <div className="icon-classes" slot="start" />
            </div>
            <IonLabel>Classes</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default MainMenu;
