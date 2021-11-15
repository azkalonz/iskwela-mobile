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
  useIonActionSheet,
} from "@ionic/react";
import {
  caretDownOutline,
  logOutOutline,
  personCircleOutline,
} from "ionicons/icons";
import React, { useCallback, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router";
import { useStoreActions, useStoreState } from "../redux/store";
import ClassMenu from "./ClassMenu";
import MainMenu from "./MainMenu";
import UserAvatar from "./UserAvatar";

// fix ion-page margin for ios
export function hasHeader(): string {
  return "has-header " + getConfig()?.get("mode");
}

const Header: React.FC = () => {
  const [present] = useIonActionSheet();
  const location = useLocation();
  const { headerTitle } = useStoreState((states) => states.nonPersistent);
  const { info } = useStoreState((states) => states.userStorage);
  const { logout } = useStoreActions((states) => states.userStorage);
  const headerRef = useRef<HTMLIonHeaderElement>(
    document.querySelector("ion-header")
  );
  const handleLogout = () => {
    logout();
    window.open("/login", "_SELF");
  };
  const showHeaderActions = useCallback(async () => {
    const fullName = info?.first_name + " " + info?.last_name;
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
      {location.pathname.indexOf("class") < 0 ? (
        location.pathname.indexOf("login") < 0 ? (
          <MainMenu />
        ) : null
      ) : (
        <ClassMenu />
      )}
      <IonHeader id="main-header" ref={headerRef}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton autoHide={false} />
          </IonButtons>
          <IonTitle>{headerTitle}</IonTitle>
          <IonButtons slot="end">
            <UserAvatar slot="end" />
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
