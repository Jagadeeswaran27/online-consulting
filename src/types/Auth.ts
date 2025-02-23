export type User = {
  userName: string;
  email: string;
  uid: string;
  type: UserType;
  photoURL?: string;
};

export type UserType = "admin" | "user" | "consultant";

export type Consultant = {
  cid: string;
  bio: string;
  experience: string;
};

export type ConsultantUser = User & Consultant;
