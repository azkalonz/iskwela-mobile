import {
  IonAvatar,
  IonCard,
  IonIcon,
  IonText,
  IonTextarea,
} from "@ionic/react";
import { ellipsisVertical, personCircleOutline } from "ionicons/icons";
import { KeyboardEvent } from "react";
import { Comment } from "./Comment";
import { PostModel } from "./PostInterfaces";

export const Post: React.FC<PostModel> = (props: PostModel) => {
  const handleWriteComment = (event: KeyboardEvent<HTMLIonTextareaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      // TODO: submit comment
    }
  };

  return (
    <IonCard className="post-box">
      <div className="post-header-section">
        <IonAvatar className="avatar" style={{ height: 45, width: 45 }}>
          <IonIcon
            src={personCircleOutline}
            style={{ width: "100%", height: "100%", background: "#fff" }}
          />
        </IonAvatar>
        <div className="name-time-section">
          <IonText className="author">{props.added_by.first_name}</IonText>
          <IonText>{props.created_at}</IonText>
        </div>
        <IonAvatar className="ellipsis" style={{ height: 45, width: 45 }}>
          <IonIcon
            src={ellipsisVertical}
            style={{ width: "100%", height: "100%", color: "#7539ff" }}
          />
        </IonAvatar>
      </div>
      <div className="post-content-section">
        <IonText className="content">{props.body}</IonText>
      </div>
      <div className="post-comment-counter-section">
        <IonText>{props.comments.length} comments</IonText>
      </div>
      <div className="post-comment-section">
        {props.comments.map((comment, index) => (
          <Comment {...comment} key={comment.id} />
        ))}
      </div>
      <div className="post-add-comment-section">
        <IonAvatar className="avatar" style={{ height: 45, width: 45 }}>
          <IonIcon
            src={personCircleOutline}
            style={{ width: "100%", height: "100%", background: "#fff" }}
          />
        </IonAvatar>
        <div className="comment-input">
          <IonTextarea
            autoGrow={true}
            placeholder="Write a comment"
            rows={1}
            onKeyDown={handleWriteComment}
          ></IonTextarea>
        </div>
      </div>
    </IonCard>
  );
};
