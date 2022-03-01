import { RefresherEventDetail } from "@ionic/core";
import {
  IonRefresher,
  IonRefresherContent,
  useIonAlert,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useRef, useState } from "react";
import useSkeletonLoading from "../../hooks/useSkeletonLoading";
import { ClassRouteProps } from "../../pages/Class";
import iskwelaApi from "../../utils/iskwelaApi";
import { CreatePost } from "./CreatePost";
import { Post } from "./Post";
import { PostsModel } from "./PostInterfaces";
import "./Posts.css";

const Posts: React.FC<ClassRouteProps> = (props: ClassRouteProps) => {
  const [present] = useIonAlert();
  const [posts, setPosts] = useState<PostsModel>();
  const skeletonRef = useRef<HTMLDivElement>(null);
  const skeletonize = useSkeletonLoading(skeletonRef, [
    ".content",
    ".avatar",
    ".author",
    ".comment-input",
  ]);
  const { class_id } = props.match.params;

  const onPostsRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    iskwelaApi.get({
      endpoint: `post/class/${class_id}?include=comments&page=1`,
      success: (posts) => {
        setPosts(posts);
        event.detail.complete();
      },
      fail: (error) => {
        present(`Cannot fetch classes [${error.response?.status}]`);
      },
    });
  };

  useIonViewWillEnter(() => {
    iskwelaApi.get({
      endpoint: `post/class/${class_id}?include=comments&page=1`,
      success: (posts) => {
        setPosts(posts);
      },
    });
  });

  return (
    <>
      <IonRefresher onIonRefresh={onPostsRefresh} slot="fixed">
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      <CreatePost
        props={{
          classProps: props,
          onRefreshPosts: () => {
            // Refresh posts
          },
        }}
      />
      {!posts && (
        <div ref={skeletonRef}>
          <Post
            added_by={{
              first_name: "iSkwela",
              last_name: "",
              id: -1,
              profile_picture: null,
            }}
            body="Consectetur sint enim ullamco pariatur aliqua esse non consectetur aliquip enim mollit nulla. Cillum anim consequat dolor ad commodo consequat aute voluptate ex veniam adipisicing et id labore."
            comments={[]}
            created_at=""
            id={-1}
            updated_at=""
          />
        </div>
      )}
      {posts && (
        <>
          {posts.posts.map((post, index) => (
            <Post {...post} key={post.id} />
          ))}
        </>
      )}
    </>
  );
};

export default Posts;
