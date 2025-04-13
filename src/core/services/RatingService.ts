import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
  getDoc,
  increment,
} from "firebase/firestore";
import { Rating } from "../../types/Ratings";
import { db } from "../config/Firebase";

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
