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
import { LegacyRef, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import ClassCard from "../components/ClassCard";
import { hasHeader } from "../components/Header";
import useIsLoggedIn from "../hooks/useIsLoggedIn";
import useSkeletonLoading from "../hooks/useSkeletonLoading";
import { ClassesModel } from "../redux/model";
import { useStoreActions } from "../redux/store";
import "./Home.scss";

const Home: React.FC = () => {
  const [present] = useIonAlert();
  const history = useHistory();
  const isLoggedIn = useIsLoggedIn();
  const { setHeaderTitle } = useStoreActions((states) => states.nonPersistent);
  const { getClasses } = useStoreActions((states) => states.classes);
  const [classes, setClasses] = useState<ClassesModel>();
  const skeletonRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const skeletonize = useSkeletonLoading(
    skeletonRef,
    [
      "ion-card-header",
      ".class-details ion-text",
      ".class-teacher ion-text",
      "ion-avatar",
    ],
    ["ion-card-title", "ion-card-subtitle"]
  );

  useIonViewWillEnter(() => {
    setHeaderTitle("Classes");
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      history.replace("/login");
    } else {
      getClasses({
        success: (classes) => {
          setClasses(classes);
        },
        fail: (error) => {
          if (error.response?.status !== 200) {
            present(`Cannot fetch classes [${error.response?.status}]`);
          }
        },
      });
    }
  }, [isLoggedIn]);

  return (
    <IonPage className={hasHeader()}>
      <IonContent fullscreen>
        <div className="classes">
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
          {!classes && (
            <div
              ref={skeletonRef}
              style={{ width: "100%" }}
              className="classes"
            >
              {new Array(5).fill(0).map((a, i) => (
                <ClassCard
                  key={i}
                  title=""
                  description=""
                  teacherName="Teacher Name"
                  teacherImg=""
                  coverImg="/class/english.svg"
                  timeStart="9:00 AM"
                  timeEnd="10:00 AM"
                  date="2 September 2021"
                />
              ))}
            </div>
          )}
          {classes &&
            classes.classes.map((c) => (
              <ClassCard
                key={c.id}
                title={c.name}
                description={c.description}
                teacherName={c.teacher.first_name + " " + c.teacher.last_name}
                teacherImg={c.teacher.profile_picture}
                coverImg={`${c.bg_image}`}
                timeStart={c.time_from}
                timeEnd={c.time_to}
                date={c.date_from}
              />
            ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
