import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  where,
  onSnapshot,
  QuerySnapshot,
  getDoc,
  arrayUnion,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { auth, db } from "../config/Firebase";
import { Booking } from "../../types/Booking";
import { getUserName } from "./UserService";

export async function checkBookingSlot(
  cid: string,
  scheduledAt: Timestamp
): Promise<boolean> {
  try {
    const bookingsRef = collection(db, "bookings");
    const q = query(
      bookingsRef,
      where("cid", "==", cid),
      where("scheduledAt", "==", scheduledAt)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return true; // Slot is available
    }
    return false;
  } catch (error) {
    console.error("Error checking booking slot: ", error);
    return false;
  }
}

export async function fetchConsultantBookings(
  cid: string
): Promise<Booking[] | null> {
  try {
    const bookingsRef = collection(db, "bookings");
    const q = query(bookingsRef, where("cid", "==", cid));
    const querySnapshot = await getDocs(q);
    const bookings: Booking[] = [];
    querySnapshot.forEach((doc) => {
      bookings.push({ ...doc.data() } as Booking);
    });
    return bookings;
  } catch (error) {
    console.error("Error fetching bookings: ", error);
    return null;
  }
}

export async function fetchUserBookings(
  uid: string
): Promise<Booking[] | null> {
  try {
    const bookingsRef = collection(db, "bookings");
    const q = query(bookingsRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    const bookings: Booking[] = [];
    querySnapshot.forEach((doc) => {
      bookings.push({ ...doc.data() } as Booking);
    });
    return bookings;
  } catch (error) {
    console.error("Error fetching bookings: ", error);
    return null;
  }
}

export async function addBooking(booking: Booking): Promise<boolean> {
  try {
    const bookingsRef = collection(db, "bookings");
    const newDocRef = doc(bookingsRef);
    const bid = newDocRef.id;

    const bookingWithId = { ...booking, bid };

    await setDoc(newDocRef, bookingWithId);

    return true;
  } catch (error) {
    console.error("Error adding booking: ", error);
    return false;
  }
}

export async function addUserIdInBookingCall(bid: string): Promise<boolean> {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("User not authenticated");
      return false;
    }

    const uid = user.uid;
    const bookingDocRef = doc(db, "bookings", bid);
    const bookingDoc = await getDoc(bookingDocRef);

    if (!bookingDoc.exists()) {
      console.error("Booking not found");
      return false;
    }

    await updateDoc(bookingDocRef, {
      inCall: arrayUnion(uid),
    });

    return true;
  } catch (error) {
    console.error("Error adding user in booking call: ", error);
    return false;
  }
}

export async function removeUserIdInBookingCall(bid: string): Promise<boolean> {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error("User not authenticated");
      return false;
    }

    const uid = user.uid;
    const bookingDocRef = doc(db, "bookings", bid);
    const bookingDoc = await getDoc(bookingDocRef);

    if (!bookingDoc.exists()) {
      console.error("Booking not found");
      return false;
    }

    await updateDoc(bookingDocRef, {
      inCall: arrayRemove(uid),
    });

    return true;
  } catch (error) {
    console.error("Error adding user in booking call: ", error);
    return false;
  }
}

export async function fetchBookingsByDate(
  cid: string,
  date: Date
): Promise<Booking[]> {
  try {
    // Create date range to cover the entire day
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const startTimestamp = Timestamp.fromDate(startOfDay);
    const endTimestamp = Timestamp.fromDate(endOfDay);

    const bookingsRef = collection(db, "bookings");
    const q = query(
      bookingsRef,
      where("cid", "==", cid),
      where("scheduledAt", ">=", startTimestamp),
      where("scheduledAt", "<=", endTimestamp)
    );

    const querySnapshot = await getDocs(q);
    const bookings: Booking[] = [];

    querySnapshot.forEach((doc) => {
      bookings.push({ ...doc.data() } as Booking);
    });

    return bookings;
  } catch (error) {
    console.error("Error fetching bookings by date: ", error);
    return [];
  }
}

export function subscribeToBookingsByDate(
  cid: string,
  date: Date,
  callback: (bookings: Booking[]) => void
): () => void {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const startTimestamp = Timestamp.fromDate(startOfDay);
  const endTimestamp = Timestamp.fromDate(endOfDay);

  const bookingsRef = collection(db, "bookings");
  const q = query(
    bookingsRef,
    where("cid", "==", cid),
    where("scheduledAt", ">=", startTimestamp),
    where("scheduledAt", "<=", endTimestamp)
  );

  const unsubscribe = onSnapshot(
    q,
    (querySnapshot: QuerySnapshot) => {
      const bookings: Booking[] = [];
      querySnapshot.forEach((doc) => {
        bookings.push({ ...doc.data() } as Booking);
      });
      callback(bookings);
    },
    (error) => {
      console.error("Error listening to bookings: ", error);
    }
  );

  return unsubscribe;
}

export function subscribeToBookingInCall(
  bid: string,
  callback: (userNames: string[]) => void
): () => void {
  const bookingDocRef = doc(db, "bookings", bid);

  const unsubscribe = onSnapshot(
    bookingDocRef,
    async (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const inCall = data.inCall || [];

        const userNames = await Promise.all(
          inCall.map(async (uid: string) => {
            return await getUserName(uid);
          })
        );

        callback(userNames);
      } else {
        console.error("Booking document does not exist");
        callback([]);
      }
    },
    (error) => {
      console.error("Error listening to booking inCall array: ", error);
    }
  );

  return unsubscribe;
}
