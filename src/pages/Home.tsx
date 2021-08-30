import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  useIonAlert,
} from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import ClassCard from "../components/ClassCard";
import Header from "../components/Header";
import "./Home.css";

const Home: React.FC = () => {
  const history = useHistory();
  const [present] = useIonAlert();

  return (
    <IonPage>
      <div className="ion-page" id="main-content">
        <Header />
        <IonContent fullscreen>
          <IonItem className="iskwela-theme">
            <IonInput clearOnEdit={false} placeholder="Search">
              <IonButton
                slot="end"
                onClick={() => {
                  present("Search");
                }}
              >
                <IonIcon icon={searchOutline} />
              </IonButton>
            </IonInput>
          </IonItem>
          <ClassCard
            title="English 101"
            description="Fundamentals"
            teacherName="Lisa Manoban"
            teacherImg="https://static.toiimg.com/photo/msid-84340517/84340517.jpg"
            coverImg="/class/english.svg"
            timeStart="9:00 AM"
            timeEnd="10:00 AM"
            date="2 September 2021"
          />
        </IonContent>
      </div>
    </IonPage>
  );
};

export default Home;
