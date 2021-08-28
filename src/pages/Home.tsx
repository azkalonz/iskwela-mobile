import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import { useHistory } from "react-router";
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
        </IonContent>
      </div>
    </IonPage>
  );
};

export default Home;
