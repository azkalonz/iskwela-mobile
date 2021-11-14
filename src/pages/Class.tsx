import {
  IonContent,
  IonPage,
  useIonLoading,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useCallback, useState } from "react";
import { RouteComponentProps, useLocation } from "react-router";
import { hasHeader } from "../components/Header";
import Posts from "../components/Posts/Posts";
import { ClassModel } from "../redux/model";
import { useStoreActions } from "../redux/store";

interface MatchParams {
  class_id: string;
}

export interface ClassRouteProps extends RouteComponentProps<MatchParams> {}

const Class: React.FC<ClassRouteProps> = (props: ClassRouteProps) => {
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
        <Posts {...props} />
      </IonContent>
    </IonPage>
  );
};

export default Class;
