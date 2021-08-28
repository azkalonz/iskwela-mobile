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
} from "@ionic/react";
import { caretDownOutline, logOutOutline } from "ionicons/icons";
import React from "react";
import { useHistory } from "react-router";
import MainMenu from "./MainMenu";

const Header: React.FC = () => {
  const [present] = useIonActionSheet();
  const history = useHistory();

  return (
    <>
      <MainMenu />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton autoHide={false} />
          </IonButtons>
          <IonTitle>Classes</IonTitle>
          <IonButtons slot="end">
            <IonAvatar slot="end" style={{ height: 30, width: 30 }}>
              <img
                src="https://static.toiimg.com/photo/msid-84340517/84340517.jpg"
                alt="Lisa"
              />
            </IonAvatar>
            <IonButton
              onClick={() => {
                present({
                  header: "Lisa Manoban",
                  buttons: [
                    {
                      icon: logOutOutline,
                      text: "Logout",
                      handler: () => {
                        history.replace("/");
                      },
                    },
                  ],
                });
              }}
            >
              <IonIcon slot="end" icon={caretDownOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default Header;
