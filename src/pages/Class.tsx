import {
  IonContent,
  IonPage,
  IonText,
  useIonViewWillEnter,
} from "@ionic/react";
import React from "react";
import { useLocation } from "react-router";
import { hasHeader } from "../components/Header";
import { ClassModel } from "../redux/model";
import { useStoreActions } from "../redux/store";

import Posts from "../components/Posts";

const Class: React.FC = () => {
  const { setHeaderTitle } = useStoreActions((states) => states.nonPersistent);
  const { setCurrentClass } = useStoreActions((states) => states.classes);
  const location = useLocation();
  const classDetails = location.state as ClassModel;

  useIonViewWillEnter(() => {
    if (classDetails) {
      setCurrentClass(classDetails);
      setHeaderTitle(classDetails.name);
    }
  });

  return (
    <IonPage className={hasHeader()}>
      <IonContent>
        <br />

        <Posts />
        
      </IonContent>
    </IonPage>
  );
};

export default Class;
