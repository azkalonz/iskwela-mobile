import { IonButton } from "@ionic/react";
import MUIRichTextEditor from "mui-rte";

export const Editor: React.FC<{ onDismiss: () => void }> = ({ onDismiss }) => {
  return (
    <div className="modal">
      <MUIRichTextEditor
        label="Start a discussion"
        classes={{
          editorContainer: "mui-rte-text-container",
        }}
      />
      <div className="editor-btn-row">
        <IonButton onClick={onDismiss}>Cancel</IonButton>
        <IonButton>Post</IonButton>
      </div>
    </div>
  );
};
