import { IonContent, IonPage, IonText } from "@ionic/react";
import React, { useEffect } from "react";
import { hasHeader } from "../components/Header";
import { useStoreActions } from "../redux/store";

const Class: React.FC = () => {
  const { setHeaderTitle } = useStoreActions((states) => states.nonPersistent);

  useEffect(() => {
    setHeaderTitle("English 101");
  }, []);

  return (
    <IonPage className={hasHeader()}>
      <IonContent>
        <br />
        <IonText>Class Page</IonText>
      </IonContent>
    </IonPage>
  );
};

export default Class;
