import { Services } from "../../types/Services";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../config/Firebase";

export const fetchServices = async (): Promise<Services[]> => {
  try {
    const servicesRef = collection(db, "services");
    const querySnapshot = await getDocs(servicesRef);
    const services: Services[] = [];

    querySnapshot.forEach((doc) => {
      services.push({
        id: doc.id,
        ...doc.data(),
      } as Services);
    });

    return services;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
};

export const addService = async (service: Services): Promise<boolean> => {
  try {
    const serviceRef = doc(db, "services", service.name);
    await setDoc(serviceRef, service);
    return true;
  } catch (error) {
    console.error("Error adding service:", error);
    return false;
  }
};

export const deleteService = async (serviceId: string): Promise<boolean> => {
  try {
    const serviceRef = doc(db, "services", serviceId);
    await deleteDoc(serviceRef);
    return true;
  } catch (error) {
    console.error("Error deleting service:", error);
    return false;
  }
};

export const deleteServiceImage = async (
  imageUrl: string | undefined | null
): Promise<boolean> => {
  try {
    if (!imageUrl) {
      return false;
    }

    const storagePath = decodeURIComponent(
      imageUrl.split("/o/")[1]?.split("?")[0]
    );

    if (!storagePath) {
      return false;
    }

    const imageRef = ref(storage, storagePath);
    await deleteObject(imageRef);
    return true;
  } catch (error) {
    console.error("Error deleting image:", error);
    return false;
  }
};

export const modifyService = async (service: Services): Promise<boolean> => {
  try {
    const serviceRef = doc(db, "services", service.id);
    await setDoc(serviceRef, service);
    return true;
  } catch (error) {
    console.error("Error modifying service:", error);
    return false;
  }
};

export const uploadServiceImage = async (
  file: File | undefined | null
): Promise<string> => {
  try {
    if (!file) {
      throw new Error("No file provided");
    }

    const storageRef = ref(storage, `services/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
