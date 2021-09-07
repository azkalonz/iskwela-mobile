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
import { useHistory, useLocation } from "react-router";
import { useStoreState } from "../redux/store";
import "./MainMenu.scss";

const MainMenu: React.FC = () => {
  const { headerTitle } = useStoreState((states) => states.nonPersistent);
  const history = useHistory();
  const menuRef = useRef(document.createElement("ion-menu"));
  const location = useLocation();

  return (
    <IonMenu
      side="start"
      menuId="first"
      contentId="router-outlet"
      ref={menuRef}
    >
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
            className={location.pathname === "/" ? "selected" : ""}
            onClick={() => {
              history.replace("/");
            }}
          >
            <div className="icon">
              <div className="icon-classes" slot="start" />
            </div>
            <IonLabel>{headerTitle}</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default MainMenu;
