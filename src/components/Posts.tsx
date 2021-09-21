import { IonCard, IonIcon, IonAvatar, IonButton, IonText, IonTextarea, useIonModal } from "@ionic/react";
import { personCircleOutline, ellipsisVertical } from "ionicons/icons";
import React, { useState } from "react";
import { Box } from "@material-ui/core";
import MUIRichTextEditor from "mui-rte";

import { PostModel, CommentModel } from "../redux/model";

import "./Posts.css"




const tempData = [
    {
        author : "Teacher Tanquis",
        created : "Yesterday",
        content: "Ohayo Gozaimasu",
        comments: [
            {
                author: "Student Kimberly",
                content: "Hello"
            },
            {
                author: "Student Mark Joseph",
                content: "Hello Miss"
            }
        ]
    },
    {
        author : "Teacher Tanquis",
        created : "Today",
        content: "Minasan",
        comments: [
            {
                author: "Student Raymond",
                content: "Hello World"
            },
            {
                author: "Student Kimberly",
                content: "Hello"
            }
        ]
    }
];

const Posts: React.FC = () => {
    return (
        <>           
            <CreatePost />
            { tempData.map((post, index) => (
                <Post author={post.author} created={post.created} content={post.content} comment={post.comments} />
            ))}
            
        </>
    );
};

const CreatePost: React.FC = () => {
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
                <div className="start-discussion-box" onClick={()=>{
                    present({ cssClass: 'editorModal' });
                }}>
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

const Editor: React.FC<{onDismiss: () => void}> = ({ onDismiss }) => {

    return (
        <div className="modal">
            <MUIRichTextEditor label="Start a discussion" />
            <div className="editor-btn-row">
                <IonButton onClick={ onDismiss }>Cancel</IonButton>
                <IonButton>Post</IonButton>
            </div>
        </div>
    );
};

const Post: React.FC<PostModel> = (props) => {
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
                    <IonText className="author">{props.author}</IonText>
                    <IonText>{props.created}</IonText>
                </div>
                <IonAvatar className="ellipsis" style={{ height: 45, width: 45 }}>
                    <IonIcon
                    src={ellipsisVertical}
                    style={{ width: "100%", height: "100%", color: "#7539ff" }}
                    />
                </IonAvatar>
            </div>
            <div className="post-content-section">
                <IonText className="content">{props.content}</IonText>
            </div>
            <div className="post-comment-counter-section">
                <IonText>{props.comment.length} comments</IonText>
            </div>
            <div className="post-comment-section">
                { props.comment.map((comment, index) => (
                    <Comment author={comment.author} content={comment.content}/>
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
                    <IonTextarea autoGrow={true} placeholder="Write a comment"></IonTextarea>
                </div>
            </div>
        </IonCard>
    );
};

const Comment: React.FC<CommentModel> = (props) => {
    return (
        <div className="comment">
            <IonAvatar className="avatar" style={{ height: 45, width: 45 }}>
                <IonIcon
                src={personCircleOutline}
                style={{ width: "100%", height: "100%", background: "#fff" }}
                />
            </IonAvatar>
            <div className="comment-content">
                <IonText className="comment-author">{props.author}</IonText>
                <IonText>{props.content}</IonText>
            </div>
        </div>
    );
};


export default Posts;