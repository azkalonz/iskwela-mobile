import { IonButton } from "@ionic/react";
import { convertToRaw, EditorState } from "draft-js";
import MUIRichTextEditor, { TMUIRichTextEditorRef } from "mui-rte";
import { useRef, useState } from "react";

type EditorProps = {
  onDismiss: () => void;
  onPost: {
    (body: string): void;
  };
};

export const Editor: React.FC<EditorProps> = ({ onDismiss, onPost }) => {
  const [editorValue, setEditorValue] = useState<string>("");

  const onEditorChange = (event: EditorState) => {
    const plainText = event.getCurrentContent().getPlainText(); // for plain text
    const rteContent = convertToRaw(event.getCurrentContent()); // for rte content with text formating
    rteContent && setEditorValue(JSON.stringify(rteContent)); // store your rteContent to state
  };

  return (
    <div className="modal">
      <MUIRichTextEditor
        label="Start a discussion"
        classes={{
          editorContainer: "mui-rte-text-container",
        }}
        onChange={onEditorChange}
      />
      <div className="editor-btn-row">
        <IonButton onClick={onDismiss}>Cancel</IonButton>
        <IonButton
          onClick={() => {
            onPost(editorValue);
          }}
        >
          Post
        </IonButton>
      </div>
    </div>
  );
};
