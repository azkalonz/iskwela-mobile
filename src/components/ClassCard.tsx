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
import { ClassModel } from "../redux/model";

const ClassCard: React.FC<ClassModel> = (props) => {
  const {
    name,
    description,
    time_from,
    bg_image,
    time_to,
    date_from,
    teacher,
  } = props;
  const history = useHistory();

  return (
    <IonCard
      className="class"
      onClick={() => {
        history.push({
          pathname: "/class",
          state: props,
        });
      }}
    >
      <IonCardHeader
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.26), rgba(0, 0, 0, 0)),url("${
            bg_image || "/class/default.svg"
          }")`,
        }}
      >
        <IonCardTitle>{name}</IonCardTitle>
        <IonCardSubtitle>{description}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <div className="class-details">
          <IonText>
            {time_from} - {time_to}
          </IonText>
          <br />
          <IonText>{date_from}</IonText>
        </div>
        <IonAvatar>
          {teacher?.profile_picture ? (
            <img src={`${teacher?.profile_picture}`} />
          ) : (
            <IonIcon
              src={personCircleOutline}
              style={{ width: "100%", height: "100%", background: "#fff" }}
            />
          )}
        </IonAvatar>
        <div className="class-teacher">
          <IonText>{teacher?.first_name + " " + teacher?.last_name}</IonText>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default ClassCard;
