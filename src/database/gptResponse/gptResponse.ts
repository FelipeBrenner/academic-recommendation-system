import type { IGptResponse } from "@interfaces";
import { db } from "@services";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const gptResponseCollection = collection(db, "gptResponse");

export const getGptResponse = async (userId: string) => {
  const q = query(gptResponseCollection, where("userId", "==", userId));
  const data = await getDocs(q);
  return data.docs.map((doc) => doc.data())[0]?.gptResponse as IGptResponse;
};

export const updateGptResponse = async (data: {
  userId: string;
  gptResponse: IGptResponse;
}) => {
  await setDoc(doc(db, "gptResponse", data.userId), data);
};

export const gptResponseDatabase = {
  getGptResponse,
  updateGptResponse,
};
