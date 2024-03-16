export type PiggramPost = {
  _id: string;
  poster: {
    _id: string;
    firstName: string;
    lastName?: string;
    picture: string;
  };
  caption?: string;
  imageUrls: string[];
  likes: number;
  comments: number;
  createdAt: string;
  updatedAt: string;
};
