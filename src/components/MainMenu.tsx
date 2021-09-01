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
import React, { useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router";
import "./MainMenu.scss";

export function changeHeaderTitle(title: string): void {
  document.querySelector<HTMLInputElement>(
    "#main-header ion-title"
  )!.innerText = title;
}

const MainMenu: React.FC = () => {
  const history = useHistory();
  const menuRef = useRef(document.createElement("ion-menu"));
  const location = useLocation();

  useEffect(() => {
    const headerTitle =
      {
        "/": "Classes",
        "/class": "English 101",
        "/class/": "English 101",
      }[location.pathname] || "";
    menuRef.current.close();
    changeHeaderTitle(headerTitle);
  }, [location]);

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
            <IonLabel>Classes</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default MainMenu;
