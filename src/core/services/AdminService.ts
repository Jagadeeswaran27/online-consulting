import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/Firebase";
import {
  ApplicationFormWithMetaData,
  NewConsultantForm,
} from "../../types/Consultant";
import { getContact, getUserName } from "./ConsultantService";
import { ConsultantUser, User } from "../../types/Users";

export const fetchPendingApplications = async (): Promise<
  ApplicationFormWithMetaData[]
> => {
  try {
    const applicationsRef = collection(db, "applications");
    const pendingQuery = query(
      applicationsRef,
      where("status", "==", "pending")
    );
    const querySnapshot = await getDocs(pendingQuery);

    const applications: (NewConsultantForm & { id: string })[] =
      querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as NewConsultantForm),
      }));

    const applicationsWithUsernames = await Promise.all(
      applications.map(async (application) => {
        const username = await getUserName(application.uid);
        const contact = await getContact(application.uid);
        return {
          ...application,
          username,
          contact,
        } as ApplicationFormWithMetaData;
      })
    );

    return applicationsWithUsernames;
  } catch (error) {
    console.error("Error fetching pending applications:", error);
    return [];
  }
};

export const subscribeToPendingApplications = (
  callback: (applications: ApplicationFormWithMetaData[]) => void
) => {
  const applicationsRef = collection(db, "applications");
  const pendingQuery = query(applicationsRef, where("status", "==", "pending"));

  const unsubscribe = onSnapshot(
    pendingQuery,
    async (querySnapshot) => {
      const applications: (NewConsultantForm & { id: string })[] =
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as NewConsultantForm),
        }));

      const applicationsWithUsernames = await Promise.all(
        applications.map(async (application) => {
          const username = await getUserName(application.uid);
          const contact = await getContact(application.uid);
          return {
            ...application,
            username,
            contact,
          } as ApplicationFormWithMetaData;
        })
      );

      callback(applicationsWithUsernames);
    },
    (error) => {
      console.error("Error listening to pending applications:", error);
      callback([]);
    }
  );

  return unsubscribe;
};

export const acceptApplication = async (
  application: ApplicationFormWithMetaData
): Promise<boolean> => {
  try {
    const applicationsRef = doc(db, "applications", application.aid);
    await updateDoc(applicationsRef, {
      status: "approved",
    } as NewConsultantForm);

    const userRef = doc(db, "users", application.uid);
    await updateDoc(userRef, {
      type: "consultant",
    } as User);

    const consultantsRef = doc(db, "consultants", application.uid);
    await setDoc(consultantsRef, {
      avgRating: 0,
      bio: application.bio,
      cid: application.uid,
      experience: application.experience,
      reviewCount: 0,
      services: application.services,
    } as ConsultantUser);

    return true;
  } catch (error) {
    console.error("Error accepting application:", error);
    return false;
  }
};

export const rejectApplication = async (
  application: ApplicationFormWithMetaData
): Promise<boolean> => {
  try {
    const applicationsRef = doc(db, "applications", application.aid);
    await updateDoc(applicationsRef, {
      status: "rejected",
    } as NewConsultantForm);

    return true;
  } catch (error) {
    console.error("Error rejecting application:", error);
    return false;
  }
};
