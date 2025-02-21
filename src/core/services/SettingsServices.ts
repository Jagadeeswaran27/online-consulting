import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../config/Firebase";
import { ContactPreference, GeneralSettings } from "../../types/Settings";

export const updateUserName = async (newName: string): Promise<boolean> => {
  if (!auth.currentUser) return false;
  try {
    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, {
      userName: newName,
    });

    return true;
  } catch (error) {
    console.error("Error updating username:", error);
    return false;
  }
};

export const uploadProfileImage = async (imageFile: File): Promise<string> => {
  if (!auth.currentUser) return "";
  const uid = auth.currentUser.uid;
  try {
    const storageRef = ref(storage, `users/${uid}/profile/${imageFile.name}`);

    const snapshot = await uploadBytes(storageRef, imageFile);

    const downloadURL = await getDownloadURL(snapshot.ref);

    const userRef = doc(db, "users", uid);

    await updateDoc(userRef, {
      photoURL: downloadURL,
    });

    return downloadURL;
  } catch (error) {
    console.error("Error uploading profile image:", error);
    return "";
  }
};

export const fetchUserGeneralSettings =
  async (): Promise<GeneralSettings | null> => {
    try {
      if (!auth.currentUser) return null;
      const generalSettingsRef = doc(
        db,
        "users",
        auth.currentUser.uid,
        "settings",
        "general"
      );
      const docSnap = await getDoc(generalSettingsRef);

      if (docSnap.exists()) {
        return docSnap.data() as GeneralSettings;
      }
      return null;
    } catch (error) {
      console.error("Error fetching user general settings:", error);
      return null;
    }
  };

export const changeCountry = async (countryCode: string): Promise<boolean> => {
  if (!auth.currentUser) return false;
  try {
    const generalSettingsRef = doc(
      db,
      "users",
      auth.currentUser.uid,
      "settings",
      "general"
    );
    await setDoc(
      generalSettingsRef,
      {
        country: countryCode,
      },
      { merge: true }
    );

    return true;
  } catch (error) {
    console.error("Error changing country:", error);
    return false;
  }
};

export const changeContactPreference = async (
  contactPreference: ContactPreference
): Promise<boolean> => {
  if (!auth.currentUser) return false;
  try {
    const generalSettingsRef = doc(
      db,
      "users",
      auth.currentUser.uid,
      "settings",
      "general"
    );
    await setDoc(
      generalSettingsRef,
      {
        contactPreference,
      },
      { merge: true }
    );

    return true;
  } catch (error) {
    console.error("Error changing contact preference:", error);
    return false;
  }
};
