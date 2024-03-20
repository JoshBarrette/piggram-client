export type PiggramComment = {
  _id: string;
  content: string;
  commenter: {
    _id: string;
    firstName: string;
    lastName?: string;
    picture: string;
  };
  post: string;
  createdAt: string;
  updatedAt: string;
};
