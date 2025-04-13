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
} from "firebase/firestore";
import { db } from "../config/Firebase";
import { Booking } from "../../types/Booking";

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
