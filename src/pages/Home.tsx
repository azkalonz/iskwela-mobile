import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  useIonAlert,
  useIonViewWillEnter,
} from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import ClassCard from "../components/ClassCard";
import { hasHeader } from "../components/Header";
import { useStoreActions } from "../redux/store";
import "./Home.scss";

const Home: React.FC = () => {
  const [present] = useIonAlert();
  const { setHeaderTitle } = useStoreActions((states) => states.nonPersistent);

  useIonViewWillEnter(() => {
    setHeaderTitle("Classes");
  }, []);

  return (
    <IonPage className={hasHeader()}>
      <IonContent fullscreen>
        <div id="classes">
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
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
