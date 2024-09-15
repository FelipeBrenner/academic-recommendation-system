export interface IUser {
	id: string;
	avatar?: string;
	email: string;
	name: string;

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	[key: string]: any;
}

export interface IRecommendation {
	titulo: string;
	descricao: string;
	sugestoes: string[];
}

interface IRecommendations {
	metodo_pomodoro: IRecommendation;
	matriz_de_eisenhower: IRecommendation;
	tecnica_de_time_blocking: IRecommendation;
	estabelecimento_de_metas: IRecommendation;
	regra_dos_dois_minutos: IRecommendation;
	mapas_mentais: IRecommendation;
	autoquestionamento: IRecommendation;
	tecnica_sq3r: IRecommendation;
	diarios_de_aprendizagem: IRecommendation;
	organizadores_graficos: IRecommendation;
}

export interface IGptResponse {
	recommendations: IRecommendations;
}
