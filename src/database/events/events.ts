import type { ICalendarEvent } from "@interfaces";
import { db } from "@services";
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	setDoc,
	updateDoc,
	where,
} from "firebase/firestore";

const eventsCollection = collection(db, "events");

export const getEvents = async (userId: string) => {
	const q = query(eventsCollection, where("userId", "==", userId));
	const data = await getDocs(q);
	return data.docs.map((doc) => doc.data()) ?? [];
};

export const setEvent = async (event: ICalendarEvent) => {
	await setDoc(doc(db, "events", event.id), event);
};

export const updateEvent = async (id: string, event: Record<string, any>) => {
	await updateDoc(doc(db, "events", id), event);
};

export const deleteEvent = async (id: string) => {
	await deleteDoc(doc(db, "events", id));
};

export const eventsDatabase = {
	getEvents,
	setEvent,
	updateEvent,
	deleteEvent,
};
