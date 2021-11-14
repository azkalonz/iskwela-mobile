import {
  IonContent,
  IonPage,
  IonText,
  useIonLoading,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useCallback, useState } from "react";
import { useLocation } from "react-router";
import { hasHeader } from "../components/Header";
import { ClassModel } from "../redux/model";
import { useStoreActions } from "../redux/store";

import Posts from "../components/Posts/Posts";
import axios from "../axios";

const Class: React.FC = () => {
  const [presentLoading, dismissLoading] = useIonLoading();
  const { setHeaderTitle } = useStoreActions((states) => states.nonPersistent);
  const { setCurrentClass, getClassDetails } = useStoreActions(
    (states) => states.classes
  );
  const [classDetailsWithSchedules, setClassDetailsWithSchedules] =
    useState<ClassModel>();
  const location = useLocation();
  const classDetails = location.state as ClassModel;

  const getClassSchedules = useCallback(
    (id) => {
      presentLoading();
      getClassDetails({
        id,
        success: (classDetails) => {
          setClassDetailsWithSchedules(classDetails);
          dismissLoading();
        },
      });
    },
    [setClassDetailsWithSchedules]
  );

  useIonViewWillEnter(() => {
    if (classDetails) {
      setCurrentClass(classDetails);
      setHeaderTitle(classDetails.name);
      getClassSchedules(classDetails.id);
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
