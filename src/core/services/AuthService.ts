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
import { User } from "../../types/Users";
export const signup = async (
  email: string,
  password: string,
  userName: string,
  contact: string
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
        contact,
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

export const googleLogin = async (): Promise<User | null> => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  if (userCredential.user) {
    const userDocRef = doc(db, "users", userCredential.user.uid);
    const userDoc = await getDoc(userDocRef);

    let user: User;

    if (userDoc.exists()) {
      user = userDoc.data() as User;
    } else {
      user = {
        email: userCredential.user.email || "",
        userName: userCredential.user.displayName || "",
        uid: userCredential.user.uid,
        type: "user",
        photoURL: userCredential.user.photoURL || "",
        contact: userCredential.user.phoneNumber || "",
      };
    }

    await setDoc(userDocRef, user as User, { merge: true });

    return user;
  }
  return null;
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
