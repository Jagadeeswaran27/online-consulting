import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/Firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  UserCredential,
} from "firebase/auth";
import { User } from "../../types/Auth";
export const signup = async (
  email: string,
  password: string,
  userName: string
): Promise<boolean> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await sendEmailVerification(userCredential.user);
    if (userCredential.user) {
      await setDoc(doc(db, "users", userCredential.user.uid), {
        userName,
        email,
        uid: userCredential.user.uid,
        type: "user",
      } as User);
      return true;
    }
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const login = async (
  email: string,
  password: string
): Promise<UserCredential | null> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (userCredential.user) {
      return userCredential;
    }
    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const logout = async () => {
  await signOut(auth);
};

export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  if (userCredential.user) {
    const userDocRef = doc(db, "users", userCredential.user.uid);
    const userDoc = await getDoc(userDocRef);

    let userType = "user";
    if (userDoc.exists()) {
      const userData = userDoc.data() as User;
      userType = userData.type;
    }

    await setDoc(
      userDocRef,
      {
        userName: userCredential.user.displayName,
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        type: userType,
      } as User,
      { merge: true }
    );

    return true;
  }
  return false;
};

export const getUser = async (): Promise<User | null> => {
  const user = auth.currentUser;
  if (user) {
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      return userDoc.data() as User;
    }
  }
  return null;
};
