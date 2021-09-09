import { RefresherEventDetail } from "@ionic/core";
import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  useIonAlert,
  useIonViewWillEnter,
} from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import ClassCard from "../components/ClassCard";
import { hasHeader } from "../components/Header";
import useIsLoggedIn from "../hooks/useIsLoggedIn";
import useObjectFilter from "../hooks/useObjectFilter";
import useSkeletonLoading from "../hooks/useSkeletonLoading";
import { ClassesModel, ClassModel } from "../redux/model";
import { useStoreActions, useStoreState } from "../redux/store";
import "./Home.scss";

const Home: React.FC = () => {
  const [present] = useIonAlert();
  const history = useHistory();
  const isLoggedIn = useIsLoggedIn();
  const { setHeaderTitle } = useStoreActions((states) => states.nonPersistent);
  const { getClasses } = useStoreActions((states) => states.classes);
  const { verifyToken } = useStoreActions((states) => states.userStorage);
  const { accessToken, tokenType } = useStoreState(
    (states) => states.userStorage
  );
  const [classes, setClasses] = useState<ClassesModel | null>();
  const skeletonRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [filteredClasses, setFilter, allClasses] = useObjectFilter<
    ClassModel[]
  >(classes?.classes);

  const skeletonize = useSkeletonLoading(
    skeletonRef,
    [
      "ion-card-header",
      ".class-details ion-text",
      ".class-teacher ion-text",
      "ion-avatar",
    ],
    ["ion-card-title", "ion-card-subtitle", "ion-avatar ion-icon"]
  );

  const onHomeRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setClasses(null);
    skeletonize();
    getClasses({
      success: (classes) => {
        setClasses(classes);
        event.detail.complete();
      },
      fail: (error) => {
        if (error.response?.status !== 200) {
          present(`Cannot fetch classes [${error.response?.status}]`);
        }
      },
    });
  };

  useIonViewWillEnter(() => {
    setHeaderTitle("Classes");
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      history.replace("/login");
    } else if (accessToken && tokenType) {
      // verify if session is valid
      verifyToken({
        authData: {
          token: accessToken,
          type: tokenType,
        },
        success: () => {
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
        },
        fail: () => {
          history.replace("/login");
        },
      });
    }
  }, [isLoggedIn]);

  return (
    <IonPage className={hasHeader()}>
      <IonContent fullscreen>
        <IonRefresher onIonRefresh={onHomeRefresh} slot="fixed">
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <div className="classes">
          <IonItem className="iskwela-theme">
            <IonInput
              clearOnEdit={false}
              placeholder="Search"
              onInput={(e) => {
                setFilter(
                  allClasses.filter(
                    (q) =>
                      JSON.stringify(q)
                        .toLowerCase()
                        .indexOf(
                          e.currentTarget.value?.toString().toLowerCase() + ""
                        ) >= 0
                  )
                );
              }}
            >
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
                  name=""
                  description=""
                  time_from="9:00 AM"
                  time_to="10:00 AM"
                  date_from="2 September 2021"
                  date_to="2 September 2021"
                  bg_image={null}
                />
              ))}
            </div>
          )}
          {filteredClasses.map((c) => (
            <ClassCard key={c.id} {...c} />
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
