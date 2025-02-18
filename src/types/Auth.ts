export type User = {
  userName: string;
  email: string;
  uid: string;
  type: UserType;
  photoURL?: string;
};

export type UserType = "admin" | "user" | "consultant";
