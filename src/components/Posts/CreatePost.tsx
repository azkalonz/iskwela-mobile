import {
  IonAvatar,
  IonButton,
  IonCard,
  IonIcon,
  useIonModal,
} from "@ionic/react";
import { personCircleOutline } from "ionicons/icons";
import { useCallback } from "react";
import { ClassRouteProps } from "../../pages/Class";
import { useStoreState } from "../../redux/store";
import iskwelaApi from "../../utils/iskwelaApi";
import { Editor } from "./Editor";

type CreatePostType = {
  props: {
    classProps: ClassRouteProps;
    onRefreshPosts: () => void;
  };
};

export const CreatePost: React.FC<CreatePostType> = ({
  props: { classProps, onRefreshPosts },
}) => {
  const { info } = useStoreState((states) => states.userStorage);
  const { class_id } = classProps.match.params;
  const avatar = info?.preferences?.profile_picture || (
    <IonIcon
      src={personCircleOutline}
      style={{ width: "100%", height: "100%", background: "#fff" }}
    />
  );
  const handleDismiss = () => {
    dismiss();
  };

  const onPost = useCallback((body: string) => {
    iskwelaApi.post({
      endpoint: "post/save",
      requestConfig: {
        body,
        itemable_id: parseInt(class_id),
        itemable_type: "class",
      },
      success: () => {
        onRefreshPosts();
        handleDismiss();
      },
    });
  }, []);

  const [present, dismiss] = useIonModal(
    <Editor onDismiss={handleDismiss} onPost={onPost} />
  );

  return (
    <IonCard className="post-box">
      <div className="avatar-txtbox-section">
        <IonAvatar className="avatar" style={{ height: 45, width: 45 }}>
          {typeof avatar == "string" ? <img src={avatar} /> : avatar}
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
    </IonCard>
  );
};
