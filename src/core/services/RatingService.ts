import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
  getDoc,
  increment,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Rating, RatingsMapping } from "../../types/Ratings";
import { auth, db } from "../config/Firebase";

export const addRating = async (
  cid: string,
  rating: Omit<Rating, "timestamp" | "rid">
): Promise<string> => {
  try {
    const ratingWithTimestamp = {
      ...rating,
      timestamp: serverTimestamp(),
    };

    const reviewsCollectionRef = collection(db, `consultants/${cid}/reviews`);
    const docRef = await addDoc(reviewsCollectionRef, ratingWithTimestamp);

    await updateDoc(docRef, { rid: docRef.id });
    const reviewMappingDoc = {
      cid: cid,
      uid: rating.uid,
      rid: docRef.id,
    } as RatingsMapping;
    const reviewMappingRef = collection(db, "review-mapping");
    await addDoc(reviewMappingRef, reviewMappingDoc);
    const consultantDocRef = doc(db, "consultants", cid);
    const consultantDoc = await getDoc(consultantDocRef);

    if (consultantDoc.exists()) {
      const consultantData = consultantDoc.data();
      const currentReviewCount = consultantData.reviewCount || 0;
      const currentAvgRating = consultantData.avgRating || 0;

      const newAvgRating =
        (currentAvgRating * currentReviewCount + rating.rating) /
        (currentReviewCount + 1);

      await updateDoc(consultantDocRef, {
        reviewCount: increment(1),
        avgRating: newAvgRating,
      });
    }

    return docRef.id;
  } catch (error) {
    console.error("Error adding rating:", error);
    throw error;
  }
};

export const fetchUserRatings = async (): Promise<RatingsMapping[]> => {
  if (!auth.currentUser) return [];
  const uid = auth.currentUser.uid;
  try {
    const reviewMappingRef = collection(db, "review-mapping");
    const reviewMappingQuery = query(reviewMappingRef, where("uid", "==", uid));
    const reviewMappingSnapshot = await getDocs(reviewMappingQuery);

    const userRatings: RatingsMapping[] = [];

    const fetchPromises = reviewMappingSnapshot.docs.map(async (mappingDoc) => {
      const mappingData = mappingDoc.data() as RatingsMapping;
      const { cid, rid } = mappingData;

      const reviewDocRef = doc(db, `consultants/${cid}/reviews/${rid}`);
      const reviewDoc = await getDoc(reviewDocRef);

      if (reviewDoc.exists()) {
        const reviewData = reviewDoc.data() as RatingsMapping;
        userRatings.push({ ...reviewData, cid }); // Include cid and rid in the userRatings array
      }
    });

    await Promise.all(fetchPromises);

    return userRatings;
  } catch (error) {
    console.error("Error fetching user ratings:", error);
    throw error;
  }
};
