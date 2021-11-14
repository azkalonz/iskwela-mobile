import {
  IonAvatar,
  IonButton,
  IonCard,
  IonIcon,
  useIonModal,
} from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import { Editor } from "./Editor";

export const CreatePost: React.FC = () => {
  const handleDismiss = () => {
    dismiss();
  };

  const [present, dismiss] = useIonModal(Editor, { onDismiss: handleDismiss });

  return (
    <IonCard className="post-box">
      <div className="avatar-txtbox-section">
        <IonAvatar className="avatar" style={{ height: 45, width: 45 }}>
          <IonIcon
            src={personCircleOutline}
            style={{ width: "100%", height: "100%", background: "#fff" }}
          />
        </IonAvatar>
        <div
          className="start-discussion-box"
          onClick={() => {
            present({ cssClass: "editorModal" });
          }}
        >
          Start a discussion
        </div>
      </div>
      <div className="post-btn-section">
        <IonButton className="post-btn" color="secondary">
          Post
        </IonButton>
      </div>
    </IonCard>
  );
};
