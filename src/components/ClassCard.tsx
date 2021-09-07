import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonText,
} from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import React from "react";
import { useHistory } from "react-router";

interface ClassDetails {
  title: string;
  description?: string;
  coverImg?: any;
  timeStart: string;
  timeEnd: string;
  date: string;
  teacherName: string;
  teacherImg?: string;
  ref?: React.MutableRefObject<any>;
}

const ClassCard: React.FC<ClassDetails> = ({
  title,
  description,
  timeStart,
  coverImg,
  timeEnd,
  date,
  teacherImg,
  teacherName,
}) => {
  const history = useHistory();

  return (
    <IonCard
      className="class"
      onClick={() => {
        history.push("/class");
      }}
    >
      <IonCardHeader
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.26), rgba(0, 0, 0, 0)),url("${
            coverImg || "/class/default.svg"
          }")`,
        }}
      >
        <IonCardTitle>{title}</IonCardTitle>
        <IonCardSubtitle>{description}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <div className="class-details">
          <IonText>
            {timeStart} - {timeEnd}
          </IonText>
          <br />
          <IonText>{date}</IonText>
        </div>
        <IonAvatar>
          {teacherImg ? (
            <img src={`${teacherImg}`} />
          ) : (
            <IonIcon
              src={personCircleOutline}
              style={{ width: "100%", height: "100%", background: "#fff" }}
            />
          )}
        </IonAvatar>
        <div className="class-teacher">
          <IonText>{teacherName}</IonText>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default ClassCard;
