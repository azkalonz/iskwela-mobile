import { IonCard, IonIcon, IonAvatar, IonButton, IonText, IonItemDivider, IonInput, IonTextarea } from "@ionic/react";
import { personCircleOutline, ellipsisVertical } from "ionicons/icons";
import React, { useState } from "react";
import { Box } from "@material-ui/core";
import MUIRichTextEditor from "mui-rte";

import "./Posts.css"


const CreatePost: React.FC = () => {
    const [postBox, setPostBox] = useState(false);

    const togglePostBox = () => {
        setPostBox(!postBox);
    }

    return (
        <IonCard className="post-box">
            { !postBox ? (
             <div className="avatar-txtbox-section" onClick={togglePostBox}>
                <IonAvatar className="avatar" style={{ height: 45, width: 45 }}>
                    <IonIcon
                    src={personCircleOutline}
                    style={{ width: "100%", height: "100%", background: "#fff" }}
                    />
                </IonAvatar>
                <div className="start-discussion-box">
                    Start a discussion
                </div>               
            </div>
            ) : (
                <MUIRichTextEditor label="Start a discussion" />
            )}
            <div className="post-btn-section">
                <IonButton className="post-btn" color="secondary">
                    Post
                </IonButton>
            </div>
        </IonCard>
    );
};

const Post: React.FC = () => {
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
                    <IonText className="author">Author Name</IonText>
                    <IonText>1 minutes ago</IonText>
                </div>
                <IonAvatar className="ellipsis" style={{ height: 45, width: 45 }}>
                    <IonIcon
                    src={ellipsisVertical}
                    style={{ width: "100%", height: "100%", color: "#7539ff" }}
                    />
                </IonAvatar>
            </div>
            <div className="post-content-section">
                <IonText className="content">Discussion Content</IonText>
            </div>
            <div className="post-comment-counter-section">
                <IonText>2 comments</IonText>
            </div>
            <div className="post-comment-section">
                <Comment />
                <Comment />
            </div>
            <div className="post-add-comment-section">
                <IonAvatar className="avatar" style={{ height: 45, width: 45 }}>
                    <IonIcon
                    src={personCircleOutline}
                    style={{ width: "100%", height: "100%", background: "#fff" }}
                    />
                </IonAvatar>
                <div className="comment-input">
                    <IonTextarea autoGrow={true} placeholder="Write a comment"></IonTextarea>
                </div>
            </div>
        </IonCard>
    );
};

const Comment: React.FC = () => {
    return (
        <div className="comment">
            <IonAvatar className="avatar" style={{ height: 45, width: 45 }}>
                <IonIcon
                src={personCircleOutline}
                style={{ width: "100%", height: "100%", background: "#fff" }}
                />
            </IonAvatar>
            <div className="comment-content">
                <IonText className="comment-author">Comment Author</IonText>
                <IonText>Comment Content</IonText>
            </div>
        </div>
    );
};


export { CreatePost, Post };