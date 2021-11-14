import React from "react";
import { CreatePost } from "./CreatePost";
import { Post } from "./Post";
import "./Posts.css";

const tempData = [
  {
    author: "Teacher Tanquis",
    created: "Yesterday",
    content: "Ohayo Gozaimasu",
    comments: [
      {
        author: "Student Kimberly",
        content: "Hello",
      },
      {
        author: "Student Mark Joseph",
        content: "Hello Miss",
      },
    ],
  },
  {
    author: "Teacher Tanquis",
    created: "Today",
    content: "Minasan",
    comments: [
      {
        author: "Student Raymond",
        content: "Hello World",
      },
      {
        author: "Student Kimberly",
        content: "Hello",
      },
    ],
  },
];

const Posts: React.FC = () => {
  return (
    <>
      <CreatePost />
      {tempData.map((post, index) => (
        <Post
          author={post.author}
          created={post.created}
          content={post.content}
          comment={post.comments}
        />
      ))}
    </>
  );
};

export default Posts;
