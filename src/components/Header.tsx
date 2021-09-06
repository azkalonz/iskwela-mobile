import { ActionSheet, ActionSheetButtonStyle } from "@capacitor/action-sheet";
import {
  getConfig,
  IonAvatar,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  isPlatform,
  useIonActionSheet,
} from "@ionic/react";
import { caretDownOutline, logOutOutline } from "ionicons/icons";
import React, { useCallback, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router";
import { useStoreActions, useStoreState } from "../redux/store";
import ClassMenu from "./ClassMenu";
import MainMenu from "./MainMenu";

export function hasHeader(): string {
  return "has-header " + getConfig()?.get("mode");
}

const Header: React.FC = () => {
  const [present] = useIonActionSheet();
  const history = useHistory();
  const location = useLocation();
  const { headerTitle } = useStoreState((states) => states.nonPersistent);
  const { info } = useStoreState((states) => states.userStorage);
  const { logout } = useStoreActions((states) => states.userStorage);
  const headerRef = useRef<HTMLIonHeaderElement>(
    document.querySelector("ion-header")
  );
  const handleLogout = () => {
    logout();
    history.replace("/login");
  };
  const showHeaderActions = useCallback(async () => {
    const fullName = info?.first_name + " " + info?.last_name;
    if (isPlatform("desktop")) {
      present({
        header: fullName,
        buttons: [
          {
            icon: logOutOutline,
            text: "Logout",
            handler: handleLogout,
          },
        ],
      });
    } else {
      const result = await ActionSheet.showActions({
        title: fullName,
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
  }, [info]);

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
