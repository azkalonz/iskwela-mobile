import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
  getConfig,
  isPlatform,
} from "@ionic/react";
import { caretDownOutline, logOutOutline } from "ionicons/icons";
import React, { useCallback, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router";
import MainMenu from "./MainMenu";
import { ActionSheet, ActionSheetButtonStyle } from "@capacitor/action-sheet";
import ClassMenu from "./ClassMenu";
import { useStoreState } from "../redux/store";

export function hasHeader(): string {
  return "has-header " + getConfig()?.get("mode");
}

const Header: React.FC = () => {
  const [present] = useIonActionSheet();
  const history = useHistory();
  const location = useLocation();
  const { headerTitle } = useStoreState((states) => states.nonPersistent);
  const headerRef = useRef<HTMLIonHeaderElement>(
    document.querySelector("ion-header")
  );
  const showHeaderActions = useCallback(async () => {
    if (isPlatform("desktop")) {
      present({
        header: "Lisa Manoban " + isPlatform("desktop"),
        buttons: [
          {
            icon: logOutOutline,
            text: "Logout",
            handler: () => {
              history.replace("/login");
            },
          },
        ],
      });
    } else {
      const result = await ActionSheet.showActions({
        title: "Lisa Manoban " + isPlatform("desktop"),
        message: "Options",
        options: [
          {
            title: "Logout",
          },
          {
            title: "Cancel",
            style: ActionSheetButtonStyle.Destructive,
          },
        ],
      });

      switch (result.index) {
        case 0:
          history.replace("/login");
          break;
      }
    }
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      if (location.pathname === "/login") {
        headerRef.current.style.display = "none";
      } else {
        headerRef.current.style.display = "initial";
      }
    }
  }, [location]);

  return (
    <>
      {location.pathname.indexOf("class") < 0 ? <MainMenu /> : <ClassMenu />}
      <IonHeader id="main-header" ref={headerRef}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton autoHide={false} />
          </IonButtons>
          <IonTitle>{headerTitle}</IonTitle>
          <IonButtons slot="end">
            <IonAvatar slot="end" style={{ height: 30, width: 30 }}>
              <img
                src="https://static.toiimg.com/photo/msid-84340517/84340517.jpg"
                alt="Lisa"
              />
            </IonAvatar>
            <IonButton onClick={showHeaderActions}>
              <IonIcon slot="end" icon={caretDownOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default Header;
