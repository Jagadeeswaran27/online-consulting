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
  orderBy,
  addDoc,
  setDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { auth, db, storage } from "../config/Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Consultant, ConsultantUser, User } from "../../types/Users";
import { Services } from "../../types/Services";
import { Rating, RatingsWithUserName } from "../../types/Ratings";
import {
  ApplicationFormWithMetaData,
  NewConsultantForm,
} from "../../types/Consultant";
import {
  CONSULTANTS_PER_PAGE,
  RATINGS_PER_PAGE,
} from "../../constants/LazyLoadingLimits";
import { getUserName } from "./UserService";
// import { Rating, RatingsWithUserName } from "../../types/Ratings";

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

export const getTopConsultants = async (
  serviceId: string
): Promise<ConsultantUser[]> => {
  try {
    const consultantsRef = collection(db, "consultants");
    const q = query(
      consultantsRef,
      where("services", "array-contains", serviceId),
      orderBy("avgRating", "desc"),
      orderBy("reviewCount", "desc"),
      limit(3)
    );

    const snapshot = await getDocs(q);
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
    console.error("Error fetching top consultants:", error);
    return [];
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

export const getPaginatedConsultantsForService = async (
  serviceId: string,
  lastDoc: QueryDocumentSnapshot<DocumentData> | null = null
): Promise<{
  consultants: ConsultantUser[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
}> => {
  try {
    const topConsultants = await getTopConsultants(serviceId);
    const topConsultantIds = topConsultants.map((c) => c.cid);

    let q = query(
      collection(db, "consultants"),
      where("services", "array-contains", serviceId),
      where("cid", "not-in", topConsultantIds),
      orderBy("avgRating", "desc"),
      orderBy("reviewCount", "desc"),
      limit(CONSULTANTS_PER_PAGE)
    );

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

export const getPaginatedConsultantRatings = async (
  consultantId: string,
  lastDoc: QueryDocumentSnapshot<DocumentData> | null = null
): Promise<{
  ratings: RatingsWithUserName[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
}> => {
  try {
    const reviewsRef = collection(db, `consultants/${consultantId}/reviews`);
    let q = query(reviewsRef, limit(RATINGS_PER_PAGE));

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return { ratings: [], lastDoc: null };
    }

    const ratingsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Rating),
    }));

    const ratingsWithUserNames = await Promise.all(
      ratingsData.map(async (rating) => {
        const userName = await getUserName(rating.uid);
        return {
          ...rating,
          userName,
        } as RatingsWithUserName;
      })
    );

    const newLastDoc = snapshot.docs[snapshot.docs.length - 1];

    return { ratings: ratingsWithUserNames, lastDoc: newLastDoc };
  } catch (error) {
    console.error("Error fetching consultant ratings:", error);
    return { ratings: [], lastDoc: null };
  }
};

export const getConsultantRatings = async (
  consultantId: string
): Promise<RatingsWithUserName[]> => {
  try {
    const reviewsRef = collection(db, `consultants/${consultantId}/reviews`);

    const snapshot = await getDocs(reviewsRef);

    if (snapshot.empty) {
      return [];
    }

    const ratingsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Rating),
    }));

    const ratingsWithUserNames = await Promise.all(
      ratingsData.map(async (rating) => {
        const userName = await getUserName(rating.uid);
        return {
          ...rating,
          userName,
        } as RatingsWithUserName;
      })
    );

    return ratingsWithUserNames;
  } catch (error) {
    console.error("Error fetching consultant ratings:", error);
    return [];
  }
};

export const getAllTopConsultants = async (): Promise<ConsultantUser[]> => {
  try {
    const consultantsRef = collection(db, "consultants");
    const q = query(
      consultantsRef,
      orderBy("avgRating", "desc"),
      orderBy("reviewCount", "desc"),
      limit(3)
    );

    const snapshot = await getDocs(q);
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
    console.error("Error fetching top consultants:", error);
    return [];
  }
};

export const getAllPaginatedConsultants = async (
  lastDoc: QueryDocumentSnapshot<DocumentData> | null = null
): Promise<{
  consultants: ConsultantUser[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
}> => {
  try {
    const topConsultants = await getAllTopConsultants();
    const topConsultantIds = topConsultants.map((c) => c.cid);

    let q = query(
      collection(db, "consultants"),
      where("cid", "not-in", topConsultantIds),
      orderBy("avgRating", "desc"),
      orderBy("reviewCount", "desc"),
      limit(CONSULTANTS_PER_PAGE)
    );

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

export const submitApplication = async (
  bio: string,
  experience: string,
  selectedServices: string[],
  resume: File
): Promise<boolean> => {
  const user = auth.currentUser;
  if (!user) return false;
  const uid = user.uid;
  try {
    const fileExtension = resume.name.split(".").pop();
    const fileName = `resume-${Date.now()}.${fileExtension}`;
    const storageRef = ref(storage, `applications/${uid}/${fileName}`);

    const uploadResult = await uploadBytes(storageRef, resume);

    const downloadURL = await getDownloadURL(uploadResult.ref);

    const applicationRef = await addDoc(collection(db, "applications"), {
      bio,
      experience,
      services: selectedServices,
      resume: downloadURL,
      uid,
      status: "pending",
    });

    const applicationData: NewConsultantForm = {
      bio,
      experience,
      services: selectedServices,
      resume: downloadURL,
      uid,
      status: "pending",
      aid: applicationRef.id,
      timestamp: serverTimestamp(),
    };

    await setDoc(applicationRef, applicationData, { merge: true });

    return true;
  } catch (error) {
    console.error("Error submitting application:", error);
    return false;
  }
};

export const canApplyConsultant = async (): Promise<{
  days: number;
  hours: number;
  minutes: number;
} | null> => {
  const user = auth.currentUser;
  if (!user) return null;
  const uid = user.uid;
  try {
    const applicationsRef = query(
      collection(db, "applications"),
      where("uid", "==", uid)
    );
    const snapshot = await getDocs(applicationsRef);
    if (snapshot.empty) {
      return null;
    }
    const doc = snapshot.docs[0];
    const docData = doc.data() as ApplicationFormWithMetaData;
    const timestamp = (docData.timestamp as Timestamp).toDate();
    const currentDate = new Date();

    const twoDaysLater = new Date(
      timestamp.getTime() + 2 * 24 * 60 * 60 * 1000
    );

    if (currentDate < twoDaysLater) {
      const differenceInMilliseconds =
        twoDaysLater.getTime() - currentDate.getTime();
      const differenceInDays = Math.floor(
        differenceInMilliseconds / (1000 * 3600 * 24)
      );
      const differenceInHours = Math.floor(
        (differenceInMilliseconds % (1000 * 3600 * 24)) / (1000 * 3600)
      );
      const differenceInMinutes = Math.floor(
        (differenceInMilliseconds % (1000 * 3600)) / (1000 * 60)
      );
      return {
        days: differenceInDays,
        hours: differenceInHours,
        minutes: differenceInMinutes,
      };
    }
    return null;
  } catch (e) {
    console.error("Error checking if user can apply as consultant:", e);
    return null;
  }
};
