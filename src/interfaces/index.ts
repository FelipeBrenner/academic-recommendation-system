export interface IUser {
  id: string;
  avatar?: string;
  email: string;
  name: string;
  generations:  number
  [key: string]: any;
}

export interface IRecommendation {
  titulo: string;
  descricao: string;
  subject?: string;
}

export interface IRecommendations {
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

export interface ISubject {
  name: string;
  grade: number | string;
  semester: string;
}

export interface IAcademicInfo {
  title: string;
  info: string;
}

export interface IGptResponse {
  recommendations: IRecommendations;
  academic_history: Array<ISubject>;
  academic_info: Array<IAcademicInfo>;
  lastUpdated?: string;
}

export interface ICalendarEvent {
  id: string;
  color?: string;
  description: string;
  end: number;
  start: number;
  title: string;
  userId: string;
}

export interface IEventColor {
  userId: string;
  color: string;
}
