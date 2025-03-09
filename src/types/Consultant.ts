import { FieldValue, Timestamp } from "firebase/firestore";

export type NewConsultantForm = {
  bio: string;
  experience: string;
  services: string[];
  resume: string;
  uid: string;
  status: ApplicationStatus;
  aid: string;
  timestamp: Timestamp | FieldValue;
};

export type ApplicationFormWithMetaData = NewConsultantForm & {
  username: string;
  contact: string;
};

export type ApplicationStatus = "pending" | "approved" | "rejected";
