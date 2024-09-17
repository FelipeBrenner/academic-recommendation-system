import { useGetGpt } from "@api";
import { Pomodoro, RecommendationCard } from "@components";
import { localStorageKeys } from "@constants";
import { useAuth } from "@contexts";
import { recommendationsDatabase } from "@database";
import type { IRecommendations } from "@interfaces";
import { LoadingButton } from "@mui/lab";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useLocalStorage } from "usehooks-ts";
import * as Styles from "./Home.styles";

const tooltipRecommendations: Array<keyof IRecommendations> = [
	"metodo_pomodoro",
	"estabelecimento_de_metas",
];

export const Home = () => {
	const { user } = useAuth();
	const { isFetching, refetch } = useGetGpt();
	const [recommendations, setRecommendations] =
		useLocalStorage<IRecommendations | null>(
			localStorageKeys.recommendations,
			null,
		);

	useEffect(() => {
		const loadRecommendations = async () => {
			const recommendations = await recommendationsDatabase.getRecommentations(
				user!.id,
			);
			if (recommendations) {
				setRecommendations(recommendations);
			}
		};

		loadRecommendations();
	}, [user]);

	const handleClick = () => {
		refetch()
			.then((response) => {
				const recommendations = response.data?.recommendations;

				if (recommendations) {
					toast.success("Recomendações geradas com sucesso!");
					setRecommendations(recommendations);
					recommendationsDatabase.updateRecommentations({
						userId: user!.id,
						recommendations,
					});
				}
			})
			.catch(() => {
				toast.error("Erro ao gerar recomendações!");
			});
	};

	return (
		<Styles.Container maxWidth="xl">
			<Grid container spacing={3}>
				<Grid item sm={12} md>
					<LoadingButton
						loading={isFetching}
						color="inherit"
						onClick={handleClick}
					>
						Clique aqui para gerar suas recomendações
					</LoadingButton>
				</Grid>
				<Grid item sm={12} md="auto">
					<Pomodoro recommendation={recommendations?.metodo_pomodoro} />
				</Grid>
			</Grid>
			{recommendations && (
				<Grid container spacing={3}>
					{(Object.keys(recommendations) as Array<keyof IRecommendations>)
						.sort()
						.map((key) => {
							if (tooltipRecommendations.includes(key)) {
								return null;
							}

							return (
								<Grid
									key={recommendations[key].titulo}
									item
									xs={12}
									sm={6}
									md={4}
									xl={3}
								>
									<RecommendationCard recommendation={recommendations[key]} />
								</Grid>
							);
						})}
				</Grid>
			)}
		</Styles.Container>
	);
};
