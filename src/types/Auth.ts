export type User = {
  userName: string;
  email: string;
  uid: string;
  type: UserType;
};

export type UserType = "admin" | "user" | "consultant";
