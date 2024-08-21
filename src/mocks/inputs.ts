export const joaoSilva = {
	historicoAcademico: {
		cadeirasRealizadas: [
			{
				nome: "Matemática",
				dataConclusao: "2022-06-15",
				descricao: "Estudo de funções, limites e derivadas.",
				conteudosPrevistos: ["Funções", "Limites", "Derivadas"],
				notas: {
					GA: 8.0,
					GB: 7.5,
					final: 7.8,
					detalhesNotas: [
						{
							grau: "GA",
							tipoAvaliacao: "Prova",
							descricao: "Prova sobre funções",
							nota: 8.0,
						},
						{
							grau: "GB",
							tipoAvaliacao: "Trabalho",
							descricao: "Trabalho sobre limites",
							nota: 7.5,
						},
					],
				},
				faltas: 4,
			},
			{
				nome: "Programação I",
				dataConclusao: "2022-12-20",
				descricao: "Introdução à programação com foco em lógica e algoritmos.",
				conteudosPrevistos: [
					"Lógica de Programação",
					"Algoritmos",
					"Estruturas de Controle",
				],
				notas: {
					GA: 9.0,
					GB: 8.5,
					final: 8.8,
					detalhesNotas: [
						{
							grau: "GA",
							tipoAvaliacao: "Prova",
							descricao: "Prova sobre lógica de programação",
							nota: 9.0,
						},
						{
							grau: "GB",
							tipoAvaliacao: "Projeto",
							descricao: "Projeto de desenvolvimento de um algoritmo",
							nota: 8.5,
						},
					],
				},
				faltas: 2,
			},
		],
		atividadesComplementares: [
			{
				modalidade: "Cursos, minicursos e similares",
				descricao: "Bootcamp de ReactJS",
				horasRealizadas: 100,
				horasAproveitadas: 90,
				dataInicio: "2023-01-10",
				dataFim: "2023-01-10",
			},
		],
		horasComplementaresConcluidas: 220,
		horasComplementaresACursar: 30,
		cadeirasMatriculadas: [
			{
				nome: "Física",
				descricao: "Estudo dos princípios da física clássica.",
				conteudosPrevistos: ["Mecânica", "Termodinâmica"],
				remota: false,
				diaSemana: "Segunda",
				hora: "19:30-22:22",
			},
			{
				nome: "Cálculo I",
				descricao: "Fundamentos do cálculo diferencial e integral.",
				conteudosPrevistos: ["Derivadas", "Integrais"],
				remota: false,
				diaSemana: "Quarta",
				hora: "18:00-20:00",
			},
		],
		cadeirasFaltantes: ["Química", "Biologia"],
	},
	informacoesDisciplinasRequisitos: [
		{
			disciplina: "Matemática",
			disciplinasCorrequisitos: ["Algoritmos"],
			disciplinasPreRequisitos: ["Física", "Estatística"],
		},
	],
	perfilAluno: {
		nome: "João Silva",
		curso: "Engenharia",
		idade: 21,
		turno: "Noturno",
		habitosEstudo: ["Estuda à noite", "Prefere estudar sozinho"],
		preferenciasAprendizagem: ["Visual", "Prático"],
		objetivosAcademicos:
			"Concluir o curso com média alta e conseguir um estágio em engenharia.",
	},
	relatorioMoodle: {
		participacaoForuns: [
			{
				forum: "Discussão sobre algoritmos",
				mensagens: [
					"Qual a melhor abordagem para resolver problemas de busca binária?",
					"Alguém pode explicar a diferença entre algoritmos de ordenação por seleção e inserção?",
				],
			},
			{
				forum: "Discussão sobre física",
				mensagens: [
					"Como aplicar a segunda lei de Newton em problemas de dinâmica?",
					"Quais são as principais diferenças entre energia cinética e potencial?",
				],
			},
		],
		feedbacksProfessores: [
			{
				atividade: "Projeto de Física",
				feedback:
					"Bom trabalho, mas precisa melhorar na apresentação dos resultados.",
			},
			{
				atividade: "Prova de Cálculo I",
				feedback: "Ótima compreensão dos conceitos, continue assim.",
			},
		],
	},
	avaliacaoAutoeficacia: {
		escalaAutoeficacia: 7,
		comentarios: "Sinto que posso melhorar em organização e apresentação.",
	},
};

export const mariaOliveira = {
	historicoAcademico: {
		cadeirasRealizadas: [
			{
				nome: "Química",
				dataConclusao: "2022-12-10",
				descricao: "Estudo das reações químicas e suas aplicações.",
				conteudosPrevistos: ["Reações", "Termoquímica", "Eletroquímica"],
				notas: {
					GA: 6.5,
					GB: 7.0,
					final: 6.8,
					detalhesNotas: [
						{
							grau: "GA",
							tipoAvaliacao: "Prova",
							descricao: "Prova sobre reações químicas",
							nota: 6.5,
						},
						{
							grau: "GB",
							tipoAvaliacao: "Trabalho",
							descricao: "Trabalho sobre termoquímica",
							nota: 7.0,
						},
					],
				},
				faltas: 2,
			},
			{
				nome: "Biologia Celular",
				dataConclusao: "2022-06-20",
				descricao: "Estudo das estruturas e funções das células.",
				conteudosPrevistos: [
					"Membrana Celular",
					"Organelas",
					"Divisão Celular",
				],
				notas: {
					GA: 8.0,
					GB: 7.5,
					final: 7.8,
					detalhesNotas: [
						{
							grau: "GA",
							tipoAvaliacao: "Prova",
							descricao: "Prova sobre membrana celular",
							nota: 8.0,
						},
						{
							grau: "GB",
							tipoAvaliacao: "Trabalho",
							descricao: "Trabalho sobre organelas",
							nota: 7.5,
						},
					],
				},
				faltas: 1,
			},
		],
		atividadesComplementares: [
			{
				modalidade: "Iniciação Científica",
				descricao: "Projeto de pesquisa em química orgânica",
				horasRealizadas: 150,
				horasAproveitadas: 150,
				dataInicio: "2022-01-15",
				dataFim: "2022-12-15",
			},
		],
		horasComplementaresConcluidas: 300,
		horasComplementaresACursar: 0,
		cadeirasMatriculadas: [
			{
				nome: "Biologia",
				descricao: "Estudo da biologia celular e molecular.",
				conteudosPrevistos: ["Células", "Genética"],
				remota: true,
				diaSemana: "Quarta",
				hora: "14:00-16:00",
			},
			{
				nome: "Genética",
				descricao: "Fundamentos da genética e hereditariedade.",
				conteudosPrevistos: ["DNA", "Mutação", "Hereditariedade"],
				remota: false,
				diaSemana: "Sexta",
				hora: "10:00-12:00",
			},
		],
		cadeirasFaltantes: ["Física", "Matemática"],
	},
	informacoesDisciplinasRequisitos: [
		{
			disciplina: "Química",
			disciplinasCorrequisitos: ["Biologia"],
			disciplinasPreRequisitos: ["Matemática"],
		},
	],
	perfilAluno: {
		nome: "Maria Oliveira",
		curso: "Ciências Biológicas",
		idade: 23,
		turno: "Diurno",
		habitosEstudo: ["Estuda pela manhã", "Prefere estudar em grupo"],
		preferenciasAprendizagem: ["Auditivo", "Leitura/Escrita"],
		objetivosAcademicos:
			"Publicar um artigo científico e seguir carreira acadêmica.",
	},
	relatorioMoodle: {
		participacaoForuns: [
			{
				forum: "Discussão sobre biologia celular",
				mensagens: [
					"Quais são as principais funções das mitocôndrias?",
					"Como a membrana celular regula a entrada e saída de substâncias?",
				],
			},
			{
				forum: "Discussão sobre genética",
				mensagens: [
					"Alguém pode explicar o conceito de mutação genética?",
					"Como as características hereditárias são transmitidas?",
				],
			},
		],
		feedbacksProfessores: [
			{
				atividade: "Trabalho de Biologia",
				feedback: "Bom trabalho, continue assim.",
			},
			{
				atividade: "Prova de Genética",
				feedback:
					"Boa compreensão dos conceitos, mas precisa melhorar na aplicação prática.",
			},
		],
	},
	avaliacaoAutoeficacia: {
		escalaAutoeficacia: 8,
		comentarios: "Confio nas minhas habilidades, mas sempre busco melhorar.",
	},
};

export const carlosPereira = {
	historicoAcademico: {
		cadeirasRealizadas: [
			{
				nome: "Estatística",
				dataConclusao: "2022-11-20",
				descricao: "Estudo de métodos estatísticos e suas aplicações.",
				conteudosPrevistos: ["Probabilidade", "Inferência Estatística"],
				notas: {
					GA: 9.0,
					GB: 8.5,
					final: 8.8,
					detalhesNotas: [
						{
							grau: "GA",
							tipoAvaliacao: "Prova",
							descricao: "Prova sobre probabilidade",
							nota: 9.0,
						},
						{
							grau: "GB",
							tipoAvaliacao: "Trabalho",
							descricao: "Trabalho sobre inferência estatística",
							nota: 8.5,
						},
					],
				},
				faltas: 1,
			},
			{
				nome: "Algoritmos e Estruturas de Dados",
				dataConclusao: "2022-06-10",
				descricao: "Estudo de algoritmos e estruturas de dados.",
				conteudosPrevistos: ["Algoritmos de busca", "Listas, Pilhas e Filas"],
				notas: {
					GA: 8.5,
					GB: 9.0,
					final: 8.7,
					detalhesNotas: [
						{
							grau: "GA",
							tipoAvaliacao: "Prova",
							descricao: "Prova sobre algoritmos de busca",
							nota: 8.5,
						},
						{
							grau: "GB",
							tipoAvaliacao: "Projeto",
							descricao: "Projeto de implementação de uma estrutura de dados",
							nota: 9.0,
						},
					],
				},
				faltas: 0,
			},
		],
		atividadesComplementares: [
			{
				modalidade: "Monitoria",
				descricao: "Monitor de estatística",
				horasRealizadas: 200,
				horasAproveitadas: 200,
				dataInicio: "2021-08-01",
				dataFim: "2022-07-31",
			},
		],
		horasComplementaresConcluidas: 400,
		horasComplementaresACursar: 0,
		cadeirasMatriculadas: [
			{
				nome: "Algoritmos",
				descricao: "Estudo de algoritmos e estruturas de dados.",
				conteudosPrevistos: ["Algoritmos de busca", "Estruturas de dados"],
				remota: false,
				diaSemana: "Terça",
				hora: "18:00-20:00",
			},
			{
				nome: "Banco de Dados",
				descricao:
					"Introdução aos sistemas de gerenciamento de banco de dados.",
				conteudosPrevistos: ["Modelagem de Dados", "SQL"],
				remota: false,
				diaSemana: "Quinta",
				hora: "19:00-21:00",
			},
		],
		cadeirasFaltantes: ["Física", "Química"],
	},
	informacoesDisciplinasRequisitos: [
		{
			disciplina: "Estatística",
			disciplinasCorrequisitos: ["Matemática"],
			disciplinasPreRequisitos: ["Física"],
		},
	],
	perfilAluno: {
		nome: "Carlos Pereira",
		curso: "Ciência da Computação",
		idade: 25,
		turno: "Noturno",
		habitosEstudo: ["Estuda à tarde", "Prefere estudar com música"],
		preferenciasAprendizagem: ["Cinestésico", "Prático"],
		objetivosAcademicos:
			"Desenvolver um projeto de software e trabalhar em uma grande empresa de tecnologia.",
	},
	relatorioMoodle: {
		participacaoForuns: [
			{
				forum: "Discussão sobre algoritmos",
				mensagens: [
					"Qual é a complexidade de tempo do algoritmo QuickSort?",
					"Como implementar uma árvore binária de busca?",
				],
			},
			{
				forum: "Discussão sobre banco de dados",
				mensagens: [
					"Qual é a diferença entre chave primária e chave estrangeira?",
					"Como normalizar um banco de dados relacional?",
				],
			},
		],
		feedbacksProfessores: [
			{
				atividade: "Projeto de Algoritmos",
				feedback: "Excelente trabalho, continue assim.",
			},
			{
				atividade: "Prova de Estatística",
				feedback: "Ótima compreensão dos conceitos estatísticos, parabéns!",
			},
		],
	},
	avaliacaoAutoeficacia: {
		escalaAutoeficacia: 9,
		comentarios:
			"Tenho confiança nas minhas habilidades e estou sempre buscando novos desafios.",
	},
};
