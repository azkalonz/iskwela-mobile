import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonMenu,
  IonRow,
  IonText,
  IonToolbar,
} from "@ionic/react";
import React, { useRef } from "react";
import { useHistory } from "react-router";
import { useStoreState } from "../redux/store";
import "./ClassMenu.scss";
import "./MainMenu.scss";
import UserAvatar from "./UserAvatar";

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
      <IonContent className="class-options">
        <div className="class-teacher">
          <IonGrid>
            <IonRow>
              <IonCol size="100%">
                <UserAvatar
                  pic={currentClass?.teacher?.profile_picture}
                  size={44}
                />
              </IonCol>
              <IonCol>
                <IonText className="teacher-name">
                  {currentClass?.teacher?.first_name +
                    " " +
                    currentClass?.teacher?.last_name}
                </IonText>
                <br />
                <IonText className="class-subject">
                  {currentClass?.subject?.name} Teacher
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
        <div className="class-menu"></div>
      </IonContent>
    </IonMenu>
  );
};

export default ClassMenu;
