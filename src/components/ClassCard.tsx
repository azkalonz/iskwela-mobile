import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonText,
} from "@ionic/react";
import React from "react";

interface ClassDetails {
  title: String;
  description?: String;
  coverImg?: String;
  timeStart: String;
  timeEnd: String;
  date: String;
  teacherName: String;
  teacherImg?: String;
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
  return (
    <IonCard className="classes">
      <IonCardHeader
        style={{
          backgroundImage: `url("${coverImg}")`,
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
          <img src={`${teacherImg}`} />
        </IonAvatar>
        <div className="class-teacher">
          <IonText>{teacherName}</IonText>
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default ClassCard;
