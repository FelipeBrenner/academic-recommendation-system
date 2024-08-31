export interface IUser {
	id: string;
	avatar?: string;
	email: string;
	name: string;

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	[key: string]: any;
}

export interface ICardInformation {
	type: string;
	message: string;
}
