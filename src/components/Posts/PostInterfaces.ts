export type PostModel = {
  author: string;
  created: string;
  content: string;
  comment: CommentModel[];
};

export type CommentModel = {
  author: string;
  content: string;
};
