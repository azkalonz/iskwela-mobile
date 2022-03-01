import { IonAvatar, IonIcon, IonText } from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import MUIRichTextEditor from "mui-rte";
import { CommentModel } from "./PostInterfaces";

export const Comment: React.FC<CommentModel> = (props: CommentModel) => {
  return (
    <div className="comment">
      <IonAvatar className="avatar" style={{ height: 45, width: 45 }}>
        <IonIcon
          src={personCircleOutline}
          style={{ width: "100%", height: "100%", background: "#fff" }}
        />
      </IonAvatar>
      <div className="comment-content">
        <IonText className="comment-author">
          {props.added_by.first_name}
        </IonText>
        <MUIRichTextEditor defaultValue={props.body} controls={[]} />
      </div>
    </div>
  );
};
