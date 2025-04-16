import {
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../config/Firebase";

export const updateKudosForConsultant = async (
  cid: string,
  uid: string
): Promise<boolean> => {
  try {
    const consultantRef = doc(db, "consultants", cid);

    const consultantSnap = await getDoc(consultantRef);

    const consultantData = consultantSnap.data();
    if (consultantData?.kudos && consultantData.kudos.includes(uid)) {
      await updateDoc(consultantRef, {
        kudos: arrayRemove(uid),
      });
      return true;
    }

    await updateDoc(consultantRef, {
      kudos: arrayUnion(uid),
    });

    return true;
  } catch (error) {
    console.error("Error updating kudos:", error);
    return false;
  }
};

export const getUserName = async (uid: string): Promise<string> => {
  const userDocRef = doc(db, "users", uid);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    return userDoc.data()?.userName;
  }
  return "";
};

export const getContact = async (uid: string): Promise<string> => {
  const userDocRef = doc(db, "users", uid);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    return userDoc.data()?.contact;
  }
  return "";
};

export const getPhotoUrl = async (uid: string): Promise<string> => {
  const userDocRef = doc(db, "users", uid);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    return userDoc.data()?.photoURL;
  }
  return "";
};
