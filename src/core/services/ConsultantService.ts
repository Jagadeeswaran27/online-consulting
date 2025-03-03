import {
  collection,
  query,
  limit,
  getDocs,
  startAfter,
  doc,
  getDoc,
  QueryDocumentSnapshot,
  DocumentData,
  where,
} from "firebase/firestore";
import { db } from "../config/Firebase";
import { Consultant, ConsultantUser, User } from "../../types/Users";
import { Services } from "../../types/Services";

const CONSULTANTS_PER_PAGE = 5;

export const fetchConsultants = async (
  lastDoc: QueryDocumentSnapshot<DocumentData> | null = null
): Promise<{
  consultants: ConsultantUser[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
}> => {
  try {
    let q = query(collection(db, "consultants"), limit(CONSULTANTS_PER_PAGE));

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return { consultants: [], lastDoc: null };
    }

    const consultantsData: Consultant[] = snapshot.docs.map(
      (doc) =>
        ({
          cid: doc.id,
          ...doc.data(),
        } as Consultant)
    );

    const consultantsWithUserData: ConsultantUser[] = await Promise.all(
      consultantsData.map(async (consultant) => {
        const userDocRef = doc(db, "users", consultant.cid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          return { ...userDocSnap.data(), ...consultant } as ConsultantUser;
        } else {
          return consultant as ConsultantUser;
        }
      })
    );

    const newLastDoc = snapshot.docs[snapshot.docs.length - 1];

    return { consultants: consultantsWithUserData, lastDoc: newLastDoc };
  } catch (error) {
    console.error("Error fetching consultants:", error);
    return { consultants: [], lastDoc: null };
  }
};

export const fetchConsultantById = async (
  consultantId: string
): Promise<ConsultantUser | null> => {
  try {
    const userDocRef = doc(db, "users", consultantId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const consultantDocRef = doc(db, "consultants", consultantId);
      const consultantDocSnap = await getDoc(consultantDocRef);

      if (consultantDocSnap.exists()) {
        return {
          ...userDocSnap.data(),
          ...consultantDocSnap.data(),
        } as ConsultantUser;
      } else {
        return userDocSnap.data() as ConsultantUser;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching consultant by id:", error);
    return null;
  }
};

export const fetchConsultantServices = async (
  sid: string[]
): Promise<Services[]> => {
  try {
    const services = await Promise.all(
      sid.map(async (id) => {
        const serviceRef = doc(db, "services", id);
        const docSnap = await getDoc(serviceRef);
        if (docSnap.exists()) {
          return {
            id: docSnap.id,
            ...docSnap.data(),
          } as Services;
        }
        return undefined;
      })
    );

    return services.filter(
      (service): service is Services => service !== undefined
    );
  } catch (error) {
    console.error("Error fetching consultant services:", error);
    return [];
  }
};

export const fetchConsultantsByService = async (
  serviceId: string
): Promise<ConsultantUser[]> => {
  try {
    const q = query(
      collection(db, "consultants"),
      where("services", "array-contains", serviceId)
    );
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return [];
    }
    const consultants = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const consultantData = docSnap.data() as Consultant;
        const userRef = doc(db, "users", consultantData.cid);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          console.warn(
            `User data not found for consultant ID: ${consultantData.cid}`
          );
          return null;
        }
        const userData = userSnap.data() as User;
        return { ...userData, ...consultantData } as ConsultantUser;
      })
    );
    return consultants.filter((c): c is ConsultantUser => c !== null);
  } catch (error) {
    console.error("Error fetching consultants by service:", error);
    return [];
  }
};
