import { Timestamp } from "firebase/firestore";
import { ContactPreference } from "./Settings";

export type Booking = {
  bid: string;
  cid: string;
  uid: string;
  sid: string;
  scheduledAt: Timestamp;
  mode: ContactPreference;
  callId: string;
};
