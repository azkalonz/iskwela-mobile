export type CommentModel = {
  id: number;
  added_by: {
    id: number;
    first_name: string;
    last_name: string;
    profile_picture: string | null;
  };
  body: string;
  updated_at: string;
  created_at: string;
};

export interface PostModel {
  id: number;
  added_by: {
    id: number;
    first_name: string;
    last_name: string;
    profile_picture: string | null;
  };
  body: string;
  comments: CommentModel[];
  updated_at: string;
  created_at: string;
}

export type PostsModel = {
  posts: PostModel[];
  total_count: number;
};
