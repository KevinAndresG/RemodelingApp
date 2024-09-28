export interface Comment {
  comment: string;
  rating: number;
}

export interface CommentNew extends Comment {
  id: number;
  userId: number;
}
