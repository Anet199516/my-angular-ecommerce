export type UserReviewModel = {
  id: string;
  productId: string;
  userName: string;
  userImageUrl: string;
  rating: number;
  title: string;
  comment: string;
  reviewDate: Date;
};

export type AddReviewParams = Pick<UserReviewModel, 'title' | 'comment' | 'rating'>;
