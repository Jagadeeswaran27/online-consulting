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
import { Consultant, ConsultantUser } from "../../types/Auth";
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
  cid: string
): Promise<Services[]> => {
  try {
    const q = query(
      collection(db, "service_consultants"),
      where("cid", "==", cid)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return [];
    }

    const servicesPromises = snapshot.docs.map(async (doccument) => {
      const serviceDocRef = doc(db, "services", doccument.data().sid);
      const serviceDoc = await getDoc(serviceDocRef);
      return serviceDoc.exists()
        ? ({ id: serviceDoc.id, ...serviceDoc.data() } as Services)
        : null;
    });

    const services = await Promise.all(servicesPromises);
    return services.filter((service): service is Services => service !== null);
  } catch (error) {
    console.error("Error fetching consultant services:", error);
    return [];
  }
};
