import type { IRecommendations } from "@interfaces";
import { db } from "@services";
import {
	collection,
	doc,
	getDocs,
	query,
	setDoc,
	where,
} from "firebase/firestore";

const recommendationsCollection = collection(db, "recommendations");

export const getRecommentations = async (userId: string) => {
	const q = query(recommendationsCollection, where("userId", "==", userId));
	const data = await getDocs(q);
	return data.docs.map((doc) => doc.data())[0]
		?.recommendations as IRecommendations;
};

export const updateRecommentations = async (data: {
	userId: string;
	recommendations: IRecommendations;
}) => {
	await setDoc(doc(db, "recommendations", data.userId), data);
};

export const recommendationsDatabase = {
	getRecommentations,
	updateRecommentations,
};
