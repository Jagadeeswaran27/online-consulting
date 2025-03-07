import { Timestamp } from "firebase/firestore";

export type Rating = {
  uid: string;
  rid: string;
  comment: string;
  rating: number;
  timestamp: Timestamp;
};

export type RatingsWithUserName = Rating & {
  userName: string;
};
